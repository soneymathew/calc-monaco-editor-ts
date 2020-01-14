// Generated from CalcLexer.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CalcLexer extends Lexer {
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
	public static readonly WS_CHANNEL = 2;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN", "WS_CHANNEL",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", "ID", "LPAREN", "RPAREN", 
		"EQUAL", "MINUS", "PLUS", "MUL", "DIV", "UNRECOGNIZED",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'input'", "'output'", undefined, undefined, 
		"'('", "')'", "'='", "'-'", "'+'", "'*'", "'/'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", "ID", "LPAREN", 
		"RPAREN", "EQUAL", "MINUS", "PLUS", "MUL", "DIV", "UNRECOGNIZED",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalcLexer._LITERAL_NAMES, CalcLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalcLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(CalcLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "CalcLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalcLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalcLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return CalcLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return CalcLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x10a\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x06\x02!\n\x02\r\x02\x0E\x02\"\x03" +
		"\x02\x03\x02\x03\x03\x03\x03\x03\x03\x05\x03*\n\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x06\x03\x06\x03\x06\x07\x06<\n\x06\f\x06\x0E\x06?\v\x06" +
		"\x05\x06A\n\x06\x03\x06\x03\x06\x06\x06E\n\x06\r\x06\x0E\x06F\x05\x06" +
		"I\n\x06\x03\x07\x03\x07\x07\x07M\n\x07\f\x07\x0E\x07P\v\x07\x03\b\x03" +
		"\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x03\x0F\x03\x0F\x02\x02\x02\x10\x03\x02\x03\x05\x02\x04\x07\x02" +
		"\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02" +
		"\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x03\x02\b\x04\x02\v\v" +
		"\"\"\x04\x02\f\f\x0F\x0F\x03\x023;\x03\x022;\x04\x02C\\c|\x06\x022;C\\" +
		"aac|\x02g\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03" +
		"\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02" +
		"\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02" +
		"\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02" +
		"\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x03 \x03\x02" +
		"\x02\x02\x05)\x03\x02\x02\x02\x07+\x03\x02\x02\x02\t1\x03\x02\x02\x02" +
		"\v@\x03\x02\x02\x02\rJ\x03\x02\x02\x02\x0FQ\x03\x02\x02\x02\x11S\x03\x02" +
		"\x02\x02\x13U\x03\x02\x02\x02\x15W\x03\x02\x02\x02\x17Y\x03\x02\x02\x02" +
		"\x19[\x03\x02\x02\x02\x1B]\x03\x02\x02\x02\x1D_\x03\x02\x02\x02\x1F!\t" +
		"\x02\x02\x02 \x1F\x03\x02\x02\x02!\"\x03\x02\x02\x02\" \x03\x02\x02\x02" +
		"\"#\x03\x02\x02\x02#$\x03\x02\x02\x02$%\b\x02\x02\x02%\x04\x03\x02\x02" +
		"\x02&\'\x07\x0F\x02\x02\'*\x07\f\x02\x02(*\t\x03\x02\x02)&\x03\x02\x02" +
		"\x02)(\x03\x02\x02\x02*\x06\x03\x02\x02\x02+,\x07k\x02\x02,-\x07p\x02" +
		"\x02-.\x07r\x02\x02./\x07w\x02\x02/0\x07v\x02\x020\b\x03\x02\x02\x021" +
		"2\x07q\x02\x0223\x07w\x02\x0234\x07v\x02\x0245\x07r\x02\x0256\x07w\x02" +
		"\x0267\x07v\x02\x027\n\x03\x02\x02\x028A\x072\x02\x029=\t\x04\x02\x02" +
		":<\t\x05\x02\x02;:\x03\x02\x02\x02<?\x03\x02\x02\x02=;\x03\x02\x02\x02" +
		"=>\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02@8\x03\x02\x02\x02" +
		"@9\x03\x02\x02\x02AH\x03\x02\x02\x02BD\x070\x02\x02CE\t\x05\x02\x02DC" +
		"\x03\x02\x02\x02EF\x03\x02\x02\x02FD\x03\x02\x02\x02FG\x03\x02\x02\x02" +
		"GI\x03\x02\x02\x02HB\x03\x02\x02\x02HI\x03\x02\x02\x02I\f\x03\x02\x02" +
		"\x02JN\t\x06\x02\x02KM\t\x07\x02\x02LK\x03\x02\x02\x02MP\x03\x02\x02\x02" +
		"NL\x03\x02\x02\x02NO\x03\x02\x02\x02O\x0E\x03\x02\x02\x02PN\x03\x02\x02" +
		"\x02QR\x07*\x02\x02R\x10\x03\x02\x02\x02ST\x07+\x02\x02T\x12\x03\x02\x02" +
		"\x02UV\x07?\x02\x02V\x14\x03\x02\x02\x02WX\x07/\x02\x02X\x16\x03\x02\x02" +
		"\x02YZ\x07-\x02\x02Z\x18\x03\x02\x02\x02[\\\x07,\x02\x02\\\x1A\x03\x02" +
		"\x02\x02]^\x071\x02\x02^\x1C\x03\x02\x02\x02_`\v\x02\x02\x02`\x1E\x03" +
		"\x02\x02\x02\n\x02\")=@FHN\x03\x02\x04\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalcLexer.__ATN) {
			CalcLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalcLexer._serializedATN));
		}

		return CalcLexer.__ATN;
	}

}

