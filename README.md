# TypeScript Boilerplate

## Getting Started

Follow the below instructions to use the boilerplate for a new project.

### Installation

1. Create a new React Native Project using the TypeScript template

```
npx react-native init MyApp --template react-native-template-typescript
```

2. Install the following configs and plugins in devDependencies:
   - eslint-config-airbnb-base
   - eslint-config-prettier
   - eslint-plugin-import
   - eslint-plugin-react
   - eslint-plugin-react-hooks
   - eslint-plugin-react-native

```
yarn add -D eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native
```

3. Create src folder and transfer App.tsx inside
4. Create types folder
5. Copy and replace tsconfig.json from boilerplate to the new project
6. Copy and replace .prettierrc.js from boilerplate to the new project
7. Copy jest.config.js from boilerplate to the new project
8. Delete .eslintrc.js from the new project
9. Copy .eslintrc.json from the boilerplate to the new project
10. Go to package.json and change the lint script to use the new .eslintrc.json

```
"lint": "eslint . --config ./.eslintrc.json --ext .js,.jsx,.ts,.tsx"
```

## VSCode Extensions

### To have the same VSCode settings across all developers, it is recommended to have the following extensions:

1. Better Comments
2. Bracket Pair Colorizer
3. Code Spell Checker
4. ES7 React/Redux/GraphQL/React-Native snippets
5. ESLint
6. GitLens — Git supercharged
7. JavaScript (ES6) code snippets
8. Node.js Modules Intellisense
9. Path Autocomplete
10. Path Intellisense
11. Prettier - Code formatter
12. React Native Snippet
13. React-Native/React/Redux snippets for es6/es7
14. Simple React Snippets
15. TODO Highlight
16. TSLint
17. TypeScript Hero
