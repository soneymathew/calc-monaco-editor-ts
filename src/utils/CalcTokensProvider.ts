import {createLexer} from './ParserFacade'
import { ANTLRErrorListener }   from 'antlr4ts';
import monaco from 'monaco-editor';

export class CalcState implements monaco.languages.IState {
    clone(): monaco.languages.IState {
        return new CalcState();
    }

    equals(other: monaco.languages.IState): boolean {
        return true;
    }

}

export class CalcTokensProvider implements monaco.languages.TokensProvider {
    getInitialState(): monaco.languages.IState {
        return new CalcState();
    }

    tokenize(line: string, state: monaco.languages.IState): monaco.languages.ILineTokens {
        // So far we ignore the state, which is not great for performance reasons
        return tokensForLine(line);
    }

}

const EOF = -1;

class CalcToken implements monaco.languages.IToken {
    scopes: string;
    startIndex: number;

    constructor(ruleName: String, startIndex: number) {
        this.scopes = ruleName.toLowerCase() + ".calc";
        this.startIndex = startIndex;
    }
}

class CalcLineTokens implements monaco.languages.ILineTokens {
    endState: monaco.languages.IState;
    tokens: monaco.languages.IToken[];

    constructor(tokens: monaco.languages.IToken[]) {
        this.endState = new CalcState();
        this.tokens = tokens;
    }
}

export function tokensForLine(input: string): monaco.languages.ILineTokens {
    let errorStartingPoints: number[] = [];

    class ErrorCollectorListener implements ANTLRErrorListener<CalcToken> {
        // @ts-ignore TS7006
        syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
            console.log('Error found at', column);
            errorStartingPoints.push(column)
        }
    }

    const lexer = createLexer(input);
    lexer.removeErrorListeners();
    let errorListener = new ErrorCollectorListener();
    lexer.addErrorListener(errorListener);
    let done = false;
    let myTokens: monaco.languages.IToken[] = [];
    do {
        let token = lexer.nextToken();
        if (token == null) {
            done = true
        } else {
            // We exclude EOF
            if (token.type == EOF) {
                done = true;
            } else {
                let tokenTypeName = lexer.vocabulary.getSymbolicName(token.type);
                if(tokenTypeName) {
                    let myToken = new CalcToken(tokenTypeName, token.startIndex);
                    myTokens.push(myToken);
                }
            }
        }
    } while (!done);

    // Add all errors
    for (let e of errorStartingPoints) {
        myTokens.push(new CalcToken("error.calc", e));
    }
    myTokens.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1)
    return new CalcLineTokens(myTokens);
}
