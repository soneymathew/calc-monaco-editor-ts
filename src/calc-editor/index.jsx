import * as React from 'react';
import { monaco as mEditor } from "@monaco-editor/react";
import * as CalcTokensProvider from '../utils/CalcTokensProvider';
import * as ParserFacade from '../utils/ParserFacade';

export default class MonacoEditor extends React.Component {
  componentDidMount() {
    mEditor.init().then(monaco => {
    monaco.languages.register({ id: 'calc' });
    monaco.languages.setTokensProvider('calc', new CalcTokensProvider.CalcTokensProvider());

		let literalFg = '3b8737';
		let idFg = '344482';
		let symbolsFg = '000000';
		let keywordFg = '7132a8';
		let errorFg = 'ff0000';

		monaco.editor.defineTheme('myCoolTheme', {
			base: 'vs',
			inherit: false,
			rules: [
				{ token: 'number_lit.calc',   foreground: literalFg },

				{ token: 'id.calc',           foreground: idFg,       fontStyle: 'italic' },

				{ token: 'lparen.calc',       foreground: symbolsFg },
				{ token: 'rparen.calc',       foreground: symbolsFg },

				{ token: 'equal.calc',        foreground: symbolsFg },
				{ token: 'minus.calc',        foreground: symbolsFg },
				{ token: 'plus.calc',         foreground: symbolsFg },
				{ token: 'div.calc',          foreground: symbolsFg },
				{ token: 'mul.calc',          foreground: symbolsFg },

				{ token: 'input_kw.calc',     foreground: keywordFg,  fontStyle: 'bold' },
				{ token: 'output_kw.calc',    foreground: keywordFg,  fontStyle: 'bold' },

				{ token: 'unrecognized.calc', foreground: errorFg }
			]
		});
  
    this._editor = monaco.editor.create(this._node, {
			value: [
				'input salary',
				'input nEmployees',
				'input revenues',
				'input otherExpenses',
				'input taxRate',
				'',
				'totalExpenses = salary * nEmployees + otherExpenses',
				'grossProfit = revenues - totalExpenses',
				'totalTaxes = grossProfit * (taxRate / 100)',
				'profit = profit - totalTaxes',
				'',
				'output totalTaxes',
				'output profit',
				''
			].join('\n'),
			language: 'calc',
			theme: 'myCoolTheme'
    });
    const myEditor = this._editor;
    this._subscription = this._editor.onDidChangeModelContent(function (e) {
			let code = myEditor.getValue()
			let syntaxErrors = ParserFacade.validate(code);
			let monacoErrors = [];
			for (let e of syntaxErrors) {
				monacoErrors.push({
					startLineNumber: e.startLine,
					startColumn: e.startCol,
					endLineNumber: e.endLine,
					endColumn: e.endCol,
					message: e.message,
					severity: monaco.MarkerSeverity.Error
				});
			};
			window.syntaxErrors = syntaxErrors;
			let model = monaco.editor.getModels()[0];
			monaco.editor.setModelMarkers(model, "owner", monacoErrors);
    });
  });
  }

  componentWillUnmount() {
    this._editor && this._editor.dispose();
    this._subscription && this._subscription.dispose();
  }

  render() {
    return <div ref={c => this._node = c} style={{"width":"800px","height":"600px","border":"1px solid grey"}} />
  }
}