# Initial setup via create react-app

```
yarn create react-app calc-monaco-editor-ts2 --template typescript
```

```
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

# Antlr4TS

```
yarn add antlr4ts
yarn add -D antlr4ts-cli
```

Update scripts in package.json

```
  "scripts": {
    ...
    "antlr4ts": "cd src/grammar/ && antlr4ts CalcLexer.g4 -o ../generated && antlr4ts -no-listener -no-visitor CalcParser.g4 -o ../generated",
    ...
  },
```