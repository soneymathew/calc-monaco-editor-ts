// adapted from https://github.com/oranoran/antlr4-autosuggest-js
import * as antlr4 from "antlr4ts";
import { createLexer } from "../utils/ParserFacade";
import { ANTLRErrorListener }   from 'antlr4ts';

// @ts-ignore VALID
class CustomErrorListener implements ANTLRErrorListener {
    _input: string;
    untokenizedText: string;
    constructor(input: string) {
        this._input = input;
        this.untokenizedText = '';
    }
    // @ts-ignore VALID unused vars
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.untokenizedText = this._input.substring(column);
    }

    getUntokenizedText() {
        return this.untokenizedText;
    }
}

export class LexerWrapper {
  _cachedLexer: any;
  constructor() {
    this._cachedLexer = null;
  }

  tokenizeNonDefaultChannel(input: string) {
    const result = this._tokenize(input);
    result.tokens = result.tokens.filter(token => token.channel === 0);
    return result;
  }

  getEmptyTokenStream() {
    return new antlr4.CommonTokenStream(this._getCachedLexer());
  }

  _tokenize(input: string) {
    const lexer = this._createLexer(input);
    lexer.removeErrorListeners();
    const newErrorListener = new CustomErrorListener(input);
    lexer.addErrorListener(newErrorListener);
    const tokens = lexer.getAllTokens();
    return {
      untokenizedText: newErrorListener.getUntokenizedText(),
      tokens
    };
  }

  findStateByRuleNumber(ruleNumber: number) {
    return this._getCachedLexer().atn.ruleToStartState.slice(
      ruleNumber,
      ruleNumber + 1
    )[0];
  }

  _getCachedLexer() {
    if (this._cachedLexer === null) {
      this._cachedLexer = this._createEmptyLexer();
    }
    return this._cachedLexer;
  }

  _createEmptyLexer() {
    return this._createLexer("");
  }

  _createLexer(lexerInput: string) {
    return createLexer(lexerInput);
  }
}
