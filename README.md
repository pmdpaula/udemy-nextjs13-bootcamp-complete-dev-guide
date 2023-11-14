# Curso Udemy - The Next.js 13 Bootcamp - The Complete Developer Guide

https://trt1br.udemy.com/course/the-nextjs-13-bootcamp-the-complete-developer-guide

[Github Project](https://github.com/harblaith7/Next13-Udemy-Course/tree/main)

[My Github Project](https://github.com/pmdpaula/udemy-nextjs13-bootcamp-complete-dev-guide)

## Lint

[Lint](https://medium.com/weekly-webtips/how-to-sort-imports-like-a-pro-in-typescript-4ee8afd7258a)

```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-react eslint-config-next
```

#### Arquivo `.eslintrc.js`

- rules

```javascript
'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
'import/order': [
         'error',
         {
           groups: [
             'builtin', // Built-in imports (come from NodeJS native) go first
             'external', // <- External imports
             'internal', // <- Absolute imports
             ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
             'index', // <- index imports
             'unknown', // <- unknown
           ],
           'newlines-between': 'always',
           alphabetize: {
             /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
             order: 'asc',
             /* ignore case. Options: [true, false] */
             caseInsensitive: true,
           },
         },
       ],
```

- extends

```javascript
...
  'plugin:import/recommended',
  'plugin:import/typescript',
  'plugin:@next/next/recommended',
```

- settings

```javascript
settings: {
  'import/resolver': {
    typescript: {
      project: './tsconfig.json',
    },
  },
},
```

#### Arquivo `.prettierrc.js`

```javascript
module.exports = {
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 90,
  arrowParens: 'always',
  endOfLine: 'lf',
  editorconfig: true,
  singleAttributePerLine: true,
  // "importOrder": [
  //   "^react$",
  //   "^react-native$",
  //   "^@react-navigation$",
  //   "^@storage/(.*)$",
  //   "^@screens/(.*)$",
  //   "^@components/(.*)$",
  //   "^@assets/(.*)$",
  //   "^[./]"
  // ],
  // "importOrderSeparation": true,
  // "importOrderSortSpecifiers": true
};
```

## Design

- [Tailwind CSS com Next.Js](https://tailwindcss.com/docs/guides/nextjs)

```bash
npm install -D tailwindcss@3.2.4 postcss@8.4.20 autoprefixer@10.4.13
```

```bash
npx tailwindcss init -p
```

configuração do arquivos `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- [Material UI](https://material-ui.com/pt/getting-started/installation/)

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Aplicação

- [Validação de básica de inputs](https://www.npmjs.com/package/validator)

```bash
npm i validator
npm i -D @types/validator
```

[Encriptação de senha - bcrypt](https://www.npmjs.com/package/bcrypt)

```bash
npm i bcrypt
npm i -D @types/bcrypt
```

[jose](https://www.npmjs.com/package/jose)

```bash
npm i jose
```

[JWT Coder - jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```bash
npm i jsonwebtoken
npm i -D @types/jsonwebtoken
```

[Axios](https://www.npmjs.com/package/axios)

```bash
npm i axios
```

[Cookies - cookies-next](https://www.npmjs.com/package/cookies-next)

```bash
npm i cookies-next
```

[Seleção de datas - react-datepicker](https://www.npmjs.com/package/react-datepicker)

```bash
npm i react-datepicker
npm i -D @types/react-datepicker
```

## Back-end

- [ORM - prisma](https://www.prisma.io/docs/getting-started/quickstart)

```bash
npm i prisma

npx prisma init
```
