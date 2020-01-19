// adapted from https://github.com/oranoran/antlr4-autosuggest-js
import * as constants from "./constants";
import { Transition } from "antlr4ts/atn/Transition";
import { ATNState } from "antlr4ts/atn/ATNState";
import { IntervalSet } from "antlr4ts/misc/IntervalSet";

const debug = console.log;

interface LexerWrapper {
  findStateByRuleNumber: (nextTokenRuleNumber: number) => ATNState;
}

export class TokenSuggester {
  _origPartialToken: string;
  _lexerWrapper: LexerWrapper;
  _suggestions: string[];
  _visitedLexerStates: number[];
  _casePreference: constants.CasePreference;

  constructor(
    origPartialToken: string,
    lexerWrapper: LexerWrapper,
    casePreference: constants.CasePreference = "BOTH"
  ) {
    this._origPartialToken = origPartialToken;
    this._lexerWrapper = lexerWrapper;
    this._suggestions = [];
    this._visitedLexerStates = [];
    this._casePreference = casePreference;
    return this;
  }

  suggest(nextParserTransitionLabels: Set<IntervalSet>) {
    debug(
      "Suggesting tokens for rule numbers: " +
        Array.from(nextParserTransitionLabels).join(", ")
    );
    // @ts-ignore FIX
    for (let nextParserTransitionLabel of nextParserTransitionLabels) {
      const nextTokenRuleNumber = nextParserTransitionLabel - 1; // Count from 0 not from 1
      const lexerState = this._lexerWrapper.findStateByRuleNumber(
        nextTokenRuleNumber
      );
      this._suggest("", lexerState, this._origPartialToken);
    }
    return this._suggestions;
  }

  _suggest(tokenSoFar: string, lexerState: ATNState, remainingText: string) {
    debug(
      "SUGGEST: tokenSoFar=" +
        tokenSoFar +
        " remainingText=" +
        remainingText +
        " lexerState=" +
        lexerState
    );
    if (lexerState === undefined || this._visitedLexerStates.includes(lexerState.stateNumber)) {
      return; // avoid infinite loop and stack overflow
    }
    this._visitedLexerStates.push(lexerState.stateNumber);
    try {
      const tokenNotEmpty = tokenSoFar.length > 0;
      const allTransitions = lexerState.getTransitions();
      const noMoreCharactersInToken = allTransitions.length === 0;
      if (tokenNotEmpty && noMoreCharactersInToken) {
        this._addSuggestedToken(tokenSoFar);
      }
      for (let trans of allTransitions) {
        this._suggestViaLexerTransition(tokenSoFar, remainingText, trans);
      }
    } finally {
      this._visitedLexerStates.pop();
    }
  }

  _calcAllLabelChars(label: IntervalSet) {
    const allLabelChars = [];
    for (let interval of label.intervals) {
      for (
          // @ts-ignore FIX
        let codePoint = interval.start;
        // @ts-ignore FIX
        codePoint < interval.stop;
        ++codePoint
      ) {
        allLabelChars.push(String.fromCharCode(codePoint));
      }
    }
    return allLabelChars;
  }

  _suggestViaLexerTransition(
    tokenSoFar: string,
    remainingText: string,
    trans: Transition
  ) {
    if (trans.isEpsilon) {
      this._suggest(tokenSoFar, trans.target, remainingText);
    } else if (trans.serializationType === constants.ATOM_TRANSITION) {
      const newTokenChar = this._getAddedTextFor(trans);
      if (remainingText === "" || remainingText.startsWith(newTokenChar)) {
        debug("LEXER TOKEN: " + newTokenChar + " remaining=" + remainingText);
        this._suggestViaNonEpsilonLexerTransition(
          tokenSoFar,
          remainingText,
          newTokenChar,
          trans.target
        );
      } else {
        debug(
          "NONMATCHING LEXER TOKEN: " +
            newTokenChar +
            " remaining=" +
            remainingText
        );
      }
    } else if (trans.serializationType === constants.SET_TRANSITION) {
      if (trans.label) {
        const allLabelChars = this._calcAllLabelChars(trans.label);
        for (let interval of trans.label.intervals) {
          for (
              // @ts-ignore FIX
            let codePoint = interval.start;
            // @ts-ignore FIX
            codePoint < interval.stop;
            ++codePoint
          ) {
            const ch = String.fromCodePoint(codePoint);
            const shouldIgnoreCase = this._shouldIgnoreThisCase(
              ch,
              allLabelChars
            );
            const newTokenChar = String.fromCodePoint(codePoint);
            if (
              !shouldIgnoreCase &&
              (remainingText === "" || remainingText.startsWith(newTokenChar))
            ) {
              this._suggestViaNonEpsilonLexerTransition(
                tokenSoFar,
                remainingText,
                newTokenChar,
                trans.target
              );
            }
          }
        }
      }
    }
  }

  _suggestViaNonEpsilonLexerTransition(
    tokenSoFar: string,
    remainingText: string,
    newTokenChar: string,
    targetState: ATNState
  ) {
    const newRemainingText =
      remainingText.length > 0 ? remainingText.substr(1) : "";
    this._suggest(tokenSoFar + newTokenChar, targetState, newRemainingText);
  }

  _addSuggestedToken(tokenToAdd: string) {
    const justTheCompletionPart = this._chopOffCommonStart(
      tokenToAdd,
      this._origPartialToken
    );
    if (!this._suggestions.includes(justTheCompletionPart)) {
      debug("SUGGESTING: " + justTheCompletionPart);
      this._suggestions.push(justTheCompletionPart);
    }
  }

  _chopOffCommonStart(a: string, b: string) {
    const charsToChopOff = Math.min(a.length, b.length);
    return a.substr(charsToChopOff, a.length - charsToChopOff);
  }

  _getAddedTextFor(transition: Transition) {
      // @ts-ignore FIX
    return String.fromCodePoint(transition.label);
  }

  _shouldIgnoreThisCase(transChar: string, allTransChars: string[]) {
    if (this._casePreference == null || this._casePreference === "BOTH") {
      return false;
    }
    const upper = transChar.toUpperCase();
    const lower = transChar.toLowerCase();
    switch (this._casePreference) {
      case "LOWER":
        return transChar === upper && allTransChars.includes(lower);
      case "UPPER":
        return transChar === lower && allTransChars.includes(upper);
      default:
        return false;
    }
  }
}
