// Generated from CalcParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CalcParser extends Parser {
	public static readonly WS = 1;
	public static readonly NL = 2;
	public static readonly INPUT_KW = 3;
	public static readonly OUTPUT_KW = 4;
	public static readonly NUMBER_LIT = 5;
	public static readonly ID = 6;
	public static readonly LPAREN = 7;
	public static readonly RPAREN = 8;
	public static readonly EQUAL = 9;
	public static readonly MINUS = 10;
	public static readonly PLUS = 11;
	public static readonly MUL = 12;
	public static readonly DIV = 13;
	public static readonly UNRECOGNIZED = 14;
	public static readonly RULE_compilationUnit = 0;
	public static readonly RULE_eol = 1;
	public static readonly RULE_input = 2;
	public static readonly RULE_output = 3;
	public static readonly RULE_calc = 4;
	public static readonly RULE_expression = 5;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"compilationUnit", "eol", "input", "output", "calc", "expression",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'input'", "'output'", undefined, undefined, 
		"'('", "')'", "'='", "'-'", "'+'", "'*'", "'/'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", "ID", "LPAREN", 
		"RPAREN", "EQUAL", "MINUS", "PLUS", "MUL", "DIV", "UNRECOGNIZED",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalcParser._LITERAL_NAMES, CalcParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalcParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "CalcParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalcParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalcParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(CalcParser._ATN, this);
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, CalcParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 15;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.INPUT_KW) {
				{
				{
				this.state = 12;
				_localctx._input = this.input();
				_localctx._inputs.push(_localctx._input);
				}
				}
				this.state = 17;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.ID) {
				{
				{
				this.state = 18;
				_localctx._calc = this.calc();
				_localctx._calcs.push(_localctx._calc);
				}
				}
				this.state = 23;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.OUTPUT_KW) {
				{
				{
				this.state = 24;
				_localctx._output = this.output();
				_localctx._outputs.push(_localctx._output);
				}
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 30;
			this.match(CalcParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eol(): EolContext {
		let _localctx: EolContext = new EolContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, CalcParser.RULE_eol);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 32;
			this.match(CalcParser.NL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public input(): InputContext {
		let _localctx: InputContext = new InputContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, CalcParser.RULE_input);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 34;
			this.match(CalcParser.INPUT_KW);
			this.state = 35;
			this.match(CalcParser.ID);
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.NL) {
				{
				{
				this.state = 36;
				this.eol();
				}
				}
				this.state = 41;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public output(): OutputContext {
		let _localctx: OutputContext = new OutputContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, CalcParser.RULE_output);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 42;
			this.match(CalcParser.OUTPUT_KW);
			this.state = 43;
			this.match(CalcParser.ID);
			this.state = 47;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.NL) {
				{
				{
				this.state = 44;
				this.eol();
				}
				}
				this.state = 49;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public calc(): CalcContext {
		let _localctx: CalcContext = new CalcContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, CalcParser.RULE_calc);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 50;
			_localctx._target = this.match(CalcParser.ID);
			this.state = 51;
			this.match(CalcParser.EQUAL);
			this.state = 52;
			_localctx._value = this.expression(0);
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === CalcParser.NL) {
				{
				{
				this.state = 53;
				this.eol();
				}
				}
				this.state = 58;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 10;
		this.enterRecursionRule(_localctx, 10, CalcParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 68;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case CalcParser.NUMBER_LIT:
				{
				this.state = 60;
				this.match(CalcParser.NUMBER_LIT);
				}
				break;
			case CalcParser.ID:
				{
				this.state = 61;
				this.match(CalcParser.ID);
				}
				break;
			case CalcParser.LPAREN:
				{
				this.state = 62;
				this.match(CalcParser.LPAREN);
				this.state = 63;
				this.expression(0);
				this.state = 64;
				this.match(CalcParser.RPAREN);
				}
				break;
			case CalcParser.MINUS:
				{
				this.state = 66;
				this.match(CalcParser.MINUS);
				this.state = 67;
				this.expression(1);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 78;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 76;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expression);
						this.state = 70;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 71;
						_localctx._operator = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === CalcParser.MUL || _la === CalcParser.DIV)) {
							_localctx._operator = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 72;
						this.expression(4);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expression);
						this.state = 73;
						if (!(this.precpred(this._ctx, 2))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						}
						this.state = 74;
						_localctx._operator = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === CalcParser.MINUS || _la === CalcParser.PLUS)) {
							_localctx._operator = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 75;
						this.expression(3);
						}
						break;
					}
					}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 5:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);

		case 1:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x10T\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x03\x02\x07\x02\x10\n\x02\f\x02\x0E\x02\x13\v\x02\x03\x02\x07\x02" +
		"\x16\n\x02\f\x02\x0E\x02\x19\v\x02\x03\x02\x07\x02\x1C\n\x02\f\x02\x0E" +
		"\x02\x1F\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04" +
		"\x07\x04(\n\x04\f\x04\x0E\x04+\v\x04\x03\x05\x03\x05\x03\x05\x07\x050" +
		"\n\x05\f\x05\x0E\x053\v\x05\x03\x06\x03\x06\x03\x06\x03\x06\x07\x069\n" +
		"\x06\f\x06\x0E\x06<\v\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x05\x07G\n\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x07\x07O\n\x07\f\x07\x0E\x07R\v\x07\x03\x07\x02\x02" +
		"\x03\f\b\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x02\x04\x03\x02\x0E" +
		"\x0F\x03\x02\f\r\x02X\x02\x11\x03\x02\x02\x02\x04\"\x03\x02\x02\x02\x06" +
		"$\x03\x02\x02\x02\b,\x03\x02\x02\x02\n4\x03\x02\x02\x02\fF\x03\x02\x02" +
		"\x02\x0E\x10\x05\x06\x04\x02\x0F\x0E\x03\x02\x02\x02\x10\x13\x03\x02\x02" +
		"\x02\x11\x0F\x03\x02\x02\x02\x11\x12\x03\x02\x02\x02\x12\x17\x03\x02\x02" +
		"\x02\x13\x11\x03\x02\x02\x02\x14\x16\x05\n\x06\x02\x15\x14\x03\x02\x02" +
		"\x02\x16\x19\x03\x02\x02\x02\x17\x15\x03\x02\x02\x02\x17\x18\x03\x02\x02" +
		"\x02\x18\x1D\x03\x02\x02\x02\x19\x17\x03\x02\x02\x02\x1A\x1C\x05\b\x05" +
		"\x02\x1B\x1A\x03\x02\x02\x02\x1C\x1F\x03\x02\x02\x02\x1D\x1B\x03\x02\x02" +
		"\x02\x1D\x1E\x03\x02\x02\x02\x1E \x03\x02\x02\x02\x1F\x1D\x03\x02\x02" +
		"\x02 !\x07\x02\x02\x03!\x03\x03\x02\x02\x02\"#\x07\x04\x02\x02#\x05\x03" +
		"\x02\x02\x02$%\x07\x05\x02\x02%)\x07\b\x02\x02&(\x05\x04\x03\x02\'&\x03" +
		"\x02\x02\x02(+\x03\x02\x02\x02)\'\x03\x02\x02\x02)*\x03\x02\x02\x02*\x07" +
		"\x03\x02\x02\x02+)\x03\x02\x02\x02,-\x07\x06\x02\x02-1\x07\b\x02\x02." +
		"0\x05\x04\x03\x02/.\x03\x02\x02\x0203\x03\x02\x02\x021/\x03\x02\x02\x02" +
		"12\x03\x02\x02\x022\t\x03\x02\x02\x0231\x03\x02\x02\x0245\x07\b\x02\x02" +
		"56\x07\v\x02\x026:\x05\f\x07\x0279\x05\x04\x03\x0287\x03\x02\x02\x029" +
		"<\x03\x02\x02\x02:8\x03\x02\x02\x02:;\x03\x02\x02\x02;\v\x03\x02\x02\x02" +
		"<:\x03\x02\x02\x02=>\b\x07\x01\x02>G\x07\x07\x02\x02?G\x07\b\x02\x02@" +
		"A\x07\t\x02\x02AB\x05\f\x07\x02BC\x07\n\x02\x02CG\x03\x02\x02\x02DE\x07" +
		"\f\x02\x02EG\x05\f\x07\x03F=\x03\x02\x02\x02F?\x03\x02\x02\x02F@\x03\x02" +
		"\x02\x02FD\x03\x02\x02\x02GP\x03\x02\x02\x02HI\f\x05\x02\x02IJ\t\x02\x02" +
		"\x02JO\x05\f\x07\x06KL\f\x04\x02\x02LM\t\x03\x02\x02MO\x05\f\x07\x05N" +
		"H\x03\x02\x02\x02NK\x03\x02\x02\x02OR\x03\x02\x02\x02PN\x03\x02\x02\x02" +
		"PQ\x03\x02\x02\x02Q\r\x03\x02\x02\x02RP\x03\x02\x02\x02\v\x11\x17\x1D" +
		")1:FNP";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalcParser.__ATN) {
			CalcParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalcParser._serializedATN));
		}

		return CalcParser.__ATN;
	}

}

export class CompilationUnitContext extends ParserRuleContext {
	// @ts-ignore
	public _input: InputContext;
	public _inputs: InputContext[] = [];
	// @ts-ignore
	public _calc: CalcContext;
	// @ts-ignore
	public _calcs: CalcContext[] = [];
	// @ts-ignore
	public _output: OutputContext;
	public _outputs: OutputContext[] = [];
	public EOF(): TerminalNode { return this.getToken(CalcParser.EOF, 0); }
	public input(): InputContext[];
	public input(i: number): InputContext;
	public input(i?: number): InputContext | InputContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InputContext);
		} else {
			return this.getRuleContext(i, InputContext);
		}
	}
	public calc(): CalcContext[];
	public calc(i: number): CalcContext;
	public calc(i?: number): CalcContext | CalcContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CalcContext);
		} else {
			return this.getRuleContext(i, CalcContext);
		}
	}
	public output(): OutputContext[];
	public output(i: number): OutputContext;
	public output(i?: number): OutputContext | OutputContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OutputContext);
		} else {
			return this.getRuleContext(i, OutputContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_compilationUnit; }
}


export class EolContext extends ParserRuleContext {
	public NL(): TerminalNode { return this.getToken(CalcParser.NL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_eol; }
}


export class InputContext extends ParserRuleContext {
	public INPUT_KW(): TerminalNode { return this.getToken(CalcParser.INPUT_KW, 0); }
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public eol(): EolContext[];
	public eol(i: number): EolContext;
	public eol(i?: number): EolContext | EolContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EolContext);
		} else {
			return this.getRuleContext(i, EolContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_input; }
}


export class OutputContext extends ParserRuleContext {
	public OUTPUT_KW(): TerminalNode { return this.getToken(CalcParser.OUTPUT_KW, 0); }
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public eol(): EolContext[];
	public eol(i: number): EolContext;
	public eol(i?: number): EolContext | EolContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EolContext);
		} else {
			return this.getRuleContext(i, EolContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_output; }
}


export class CalcContext extends ParserRuleContext {
	// @ts-ignore
	public _target: Token;
	// @ts-ignore
	public _value: ExpressionContext;
	public EQUAL(): TerminalNode { return this.getToken(CalcParser.EQUAL, 0); }
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public eol(): EolContext[];
	public eol(i: number): EolContext;
	public eol(i?: number): EolContext | EolContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EolContext);
		} else {
			return this.getRuleContext(i, EolContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_calc; }
}


export class ExpressionContext extends ParserRuleContext {
	// @ts-ignore
	public _operator: Token;
	public NUMBER_LIT(): TerminalNode | undefined { return this.tryGetToken(CalcParser.NUMBER_LIT, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(CalcParser.ID, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(CalcParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(CalcParser.RPAREN, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(CalcParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(CalcParser.DIV, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(CalcParser.MINUS, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(CalcParser.PLUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_expression; }
}


