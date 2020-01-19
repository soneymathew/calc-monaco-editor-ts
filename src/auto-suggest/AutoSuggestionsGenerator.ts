// adapted from https://github.com/oranoran/antlr4-autosuggest-js

import { TokenSuggester } from "./TokenSuggester";
import { LexerWrapper } from "./LexerWrapper";
import { Token } from "antlr4ts";
import * as constants from "./constants";
import { createParser } from "../utils/ParserFacade";
import { Transition } from "antlr4ts/atn/Transition";
import { ATNState } from "antlr4ts/atn/ATNState";
import { IntervalSet } from "antlr4ts/misc/IntervalSet";

const debug = console.log;
export class AutoSuggestionsGenerator {
  _lexerWrapper: LexerWrapper;
  _input: string;
  _inputTokens: Token[];
  _untokenizedText: string;
  _parserAtn: any;
  _parserRuleNames: string[];
  _indent: string;
  _collectedSuggestions: string[];
  _casePreference: constants.CasePreference;
  _parserStateToTokenListIndexWhereLastVisited: Map<ATNState, number>;

  constructor(input: string) {
    this._lexerWrapper = new LexerWrapper();
    this._input = input;
    this._inputTokens = [];
    this._untokenizedText = "";
    this._parserAtn = null;
    this._parserRuleNames = [];
    this._indent = "";
    this._collectedSuggestions = [];
    this._casePreference = "BOTH";
    this._parserStateToTokenListIndexWhereLastVisited = new Map();
  }

  transToStr = (trans: Transition) => {
    return "" + trans.constructor.name + "->" + trans.target;
  };

  suggest = () => {
    this._tokenizeInput();
    this._storeParserAtnAndRuleNames();
    this._runParserAtnAndCollectSuggestions();
    return this._collectedSuggestions;
  };

  setCasePreference = (casePreference: constants.CasePreference) => {
    this._casePreference = casePreference;
  };

  _tokenizeInput = () => {
    const tokenizationResult = this._lexerWrapper.tokenizeNonDefaultChannel(
      this._input
    );
    this._inputTokens = tokenizationResult.tokens;
    this._untokenizedText = tokenizationResult.untokenizedText;
    debug("TOKENS FOUND IN FIRST PASS:");
    for (let token of this._inputTokens) {
      debug("" + token);
    }
    debug("UNTOKENIZED: " + this._untokenizedText);
  };

  _filterOutNonDefaultChannels = (tokens: Token[]) => {
    return tokens.filter(token => token.channel === 0);
  };

  _storeParserAtnAndRuleNames = () => {
    const tokenStream = this._lexerWrapper.getEmptyTokenStream();
    const parser = createParser("");
    debug("Parser rule names: " + parser.ruleNames.join(", "));
    this._parserAtn = parser.atn;
    this._parserRuleNames = parser.ruleNames;
  };

  _runParserAtnAndCollectSuggestions = () => {
    const initialState = this._parserAtn.states[0];
    this._parseAndCollectTokenSuggestions(initialState, 0);
  };

  _parseAndCollectTokenSuggestions = (
    parserState: ATNState,
    tokenListIndex: number
  ) => {
    const prevIndent = this._indent;
    this._indent += "  ";
    if (
      this._didVisitParserStateOnThisTokenIndex(parserState, tokenListIndex)
    ) {
      debug(
        this._indent +
          "State " +
          parserState +
          " had already been visited while processing token " +
          tokenListIndex +
          ", backtracking to avoid infinite loop."
      );
      return;
    }
    const previousTokenListIndexForThisState = this._setParserStateLastVisitedOnThisTokenIndex(
      parserState,
      tokenListIndex
    );
    try {
      debug(
        this._indent +
          "State: " +
          parserState +
          " (type: " +
          parserState.constructor.name +
          ")"
      );
      // debug(indent + 'State available transitions: ' + transitionsStr(parserState));

      if (!this._haveMoreTokens(tokenListIndex)) {
        // stop condition for recursion
        this._suggestNextTokensForParserState(parserState);
        return;
      }
      for (let trans of parserState.getTransitions()) {
        if (trans.isEpsilon) {
          this._handleEpsilonTransition(trans, tokenListIndex);
        } else if (trans.serializationType === constants.ATOM_TRANSITION) {
          this._handleAtomicTransition(trans, tokenListIndex);
        } else {
          this._handleSetTransition(trans, tokenListIndex);
        }
      }
    } finally {
      this._indent = prevIndent;
      this._setParserStateLastVisitedOnThisTokenIndex(
        parserState,
        previousTokenListIndexForThisState
      );
    }
  };

  _didVisitParserStateOnThisTokenIndex = (
    parserState: ATNState,
    currentTokenListIndex: number
  ) => {
    const lastVisitedThisStateAtTokenListIndex = this._parserStateToTokenListIndexWhereLastVisited.get(
      parserState
    );
    return currentTokenListIndex === lastVisitedThisStateAtTokenListIndex;
  };

  _setParserStateLastVisitedOnThisTokenIndex = (
    parserState: ATNState,
    tokenListIndex: number | undefined
  ) => {
    const previous = this._parserStateToTokenListIndexWhereLastVisited.get(
      parserState
    );
    if (typeof tokenListIndex === "undefined") {
      this._parserStateToTokenListIndexWhereLastVisited.delete(parserState);
    } else {
      this._parserStateToTokenListIndexWhereLastVisited.set(
        parserState,
        tokenListIndex
      );
    }
    return previous;
  };

  _haveMoreTokens = (index: number) => {
    return index < this._inputTokens.length;
  };

  _handleEpsilonTransition = (trans: Transition, tokenListIndex: number) => {
    this._parseAndCollectTokenSuggestions(trans.target, tokenListIndex);
  };

  _handleAtomicTransition = (trans: Transition, tokenListIndex: number) => {
    const nextToken = this._inputTokens.slice(
      tokenListIndex,
      tokenListIndex + 1
    )[0];
    const nextTokenType = nextToken.type;
    const nextTokenMatchesTransition = trans.label
      ? trans.label.contains(nextTokenType)
      : undefined;
    if (nextTokenMatchesTransition) {
      this._parseAndCollectTokenSuggestions(trans.target, tokenListIndex + 1);
    }
  };

  _handleSetTransition = (trans: Transition, tokenListIndex: number) => {
    const nextToken = this._inputTokens.slice(
      tokenListIndex,
      tokenListIndex + 1
    )[0];
    const nextTokenType = nextToken.type;
    if (trans.label) {
      for (let interval of trans.label.intervals) {
        for (
          // @ts-ignore FIX
          let transitionTokenType = interval.start;
          // @ts-ignore FIX
          transitionTokenType <= interval.stop;
          ++transitionTokenType
        ) {
          const nextTokenMatchesTransition =
            transitionTokenType === nextTokenType;
          if (nextTokenMatchesTransition) {
            debug(
              this._indent +
                "Token " +
                nextToken +
                " following transition: " +
                this.transToStr(trans) +
                " to " +
                transitionTokenType
            );
            this._parseAndCollectTokenSuggestions(
              trans.target,
              tokenListIndex + 1
            );
          } else {
            debug(
              this._indent +
                "Token " +
                nextToken +
                " NOT following transition: " +
                this.transToStr(trans) +
                " to " +
                transitionTokenType
            );
          }
        }
      }
    }
  };

  _suggestNextTokensForParserState = (parserState: ATNState) => {
    const transitionLabels = new Set<IntervalSet>();
    this._fillParserTransitionLabels(parserState, transitionLabels, new Set());
    const tokenSuggester = new TokenSuggester(
      this._untokenizedText,
      this._lexerWrapper,
      this._casePreference
    );
    const suggestions = tokenSuggester.suggest(transitionLabels);
    this._parseSuggestionsAndAddValidOnes(parserState, suggestions);
    // logger.debug(indent + 'WILL SUGGEST TOKENS FOR STATE: ' + parserState);
  };

  toTransKey = (src: ATNState, trans: Transition) => {
    return (
      "" +
      src.stateNumber +
      "->(" +
      trans.serializationType +
      ") " +
      trans.target.stateNumber
    );
  };

  _fillParserTransitionLabels = (
    parserState: ATNState,
    result: Set<IntervalSet>,
    visitedTransitions: Set<string>
  ) => {
    for (let trans of parserState.getTransitions()) {
      const transKey = this.toTransKey(parserState, trans);
      if (visitedTransitions.has(transKey)) {
        debug(this._indent + "Not following visited " + transKey);
        return;
      }
      if (trans.isEpsilon) {
        visitedTransitions.add(transKey);
        try {
          this._fillParserTransitionLabels(
            trans.target,
            result,
            visitedTransitions
          );
        } finally {
          visitedTransitions.delete(transKey);
        }
      } else if (trans.serializationType === constants.ATOM_TRANSITION) {
        if (trans.label) result.add(trans.label);
      } else if (trans.serializationType === constants.SET_TRANSITION) {
        if (trans.label) {
          for (let interval of trans.label.intervals) {
            // @ts-ignore FIX
            for (let i = interval.start; i < interval.stop; ++i) {
              result.add(i);
            }
          }
        }
      }
    }
  };

  _parseSuggestionsAndAddValidOnes = (
    parserState: ATNState,
    suggestions: string[]
  ) => {
    for (let suggestion of suggestions) {
      const addedToken = this._getAddedToken(suggestion);
      if (this._isParseableWithAddedToken(parserState, addedToken, new Set())) {
        if (!this._collectedSuggestions.includes(suggestion)) {
          this._collectedSuggestions.push(suggestion);
        }
      } else {
        debug("DROPPING non-parseable suggestion: " + suggestion);
      }
    }
  };

  _getAddedToken = (suggestedCompletion: string) => {
    const completedText = this._input + suggestedCompletion;
    const completedTextTokens = this._lexerWrapper.tokenizeNonDefaultChannel(
      completedText
    ).tokens;
    if (completedTextTokens.length <= this._inputTokens.length) {
      return null; // Completion didn't yield whole token, could be just a token fragment
    }
    const newToken = completedTextTokens[completedTextTokens.length - 1];
    return newToken;
  };

  _isParseableWithAddedToken = (
    parserState: ATNState,
    newToken: Token | null,
    visitedTransitions: Set<string>
  ) => {
    if (newToken == null) {
      return false;
    }
    let parseable = false;
    for (let parserTransition of parserState.getTransitions()) {
      if (parserTransition.isEpsilon) {
        // Recurse through any epsilon transitions
        const transKey = this.toTransKey(parserState, parserTransition);
        if (visitedTransitions.has(transKey)) {
          debug(this._indent + "Not following visited " + transKey);
          return;
        }
        visitedTransitions.add(transKey);
        try {
          if (
            this._isParseableWithAddedToken(
              parserTransition.target,
              newToken,
              visitedTransitions
            )
          ) {
            parseable = true;
          }
        } finally {
          visitedTransitions.delete(transKey);
        }
      } else if (
        parserTransition.serializationType === constants.ATOM_TRANSITION
      ) {
        const transitionTokenType = parserTransition.label;
        if (
          transitionTokenType !== undefined && newToken.type !== undefined &&
          transitionTokenType.contains(newToken.type)
          // TODO check if this above line is the right algorithm
        ) {
          console.log('Letting it thru as parseable', transitionTokenType, newToken.type);
          parseable = true;
        }
      } else if (
        parserTransition.serializationType === constants.SET_TRANSITION
      ) {
        if (parserTransition.label) {
          for (let interval of parserTransition.label.intervals) {
            for (
                // @ts-ignore FIX
              let transitionTokenType = interval.start;
              // @ts-ignore FIX
              transitionTokenType <= interval.stop;
              ++transitionTokenType
            ) {
              if (transitionTokenType === newToken.type) {
                parseable = true;
              }
            }
          }
        }
      } else {
        throw new Error("Unexpected: " + this.transToStr(parserTransition));
      }
    }
    return parseable;
  };
}
