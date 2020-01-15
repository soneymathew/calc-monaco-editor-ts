let assert = require('assert');
import * as parserFacade from '../utils/ParserFacade';
import {CalcLexer} from '../generated/CalcLexer';

function checkToken(tokens, index, typeName, column, text) {
    it('should have ' + typeName + ' in position ' + index, function () {
        assert.equal(tokens[index].type, CalcLexer[typeName]);
        assert.equal(tokens[index].startIndex, column);
        assert.equal(tokens[index].text, text);
    });
}

describe('Basic lexing without spaces', function () {
    let tokens = parserFacade.getTokens("a=5");
    it('should return 3 tokens', function() {
      assert.equal(tokens.length, 3);
    });
    checkToken(tokens, 0, 'ID', 0, "a");
    checkToken(tokens, 1, 'EQUAL', 1, "=");
    checkToken(tokens, 2, 'NUMBER_LIT', 2, "5");
});

describe('Basic lexing with spaces', function () {
    let tokens = parserFacade.getTokens("a = 5");
    it('should return 5 tokens', function() {
        assert.equal(tokens.length, 5);
    });
    checkToken(tokens, 0, 'ID', 0, "a");
    checkToken(tokens, 1, 'WS', 1, " ");
    checkToken(tokens, 2, 'EQUAL', 2, "=");
    checkToken(tokens, 3, 'WS', 3, " ");
    checkToken(tokens, 4, 'NUMBER_LIT', 4, "5");
});
