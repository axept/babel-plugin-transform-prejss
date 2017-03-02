babel-plugin-transform-prejss
====

[![Travis branch](https://img.shields.io/travis/axept/babel-plugin-transform-prejss/master.svg?style=flat-square)](https://travis-ci.org/axept/babel-plugin-transform-prejss)
[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-prejss.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-prejss)
[![npm downloads](https://img.shields.io/npm/dt/babel-plugin-transform-prejss.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-prejss)
[![npm license](https://img.shields.io/npm/l/babel-plugin-transform-prejss.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-prejss)

[Babel](https://github.com/babel/babel) plugin which turns PreJSS constructions into JSS objects.

## Example

**In**

```js
const button = ({selector}) => preJSS`
  button {
    color: ${props => props.disabled ? 'grey' : 'red'};
    width: 200px;
    height: 70px;
    &:hover {
      text-decoration: underline;
    }
  }
`
```

**Out**

```js
var button = function button(_ref) {
  var selector = _ref.selector;
  return {
    'button': {
      'color': function color(props) {
        return props.disabled ? 'grey' : 'red';
      },
      'width': '200px',
      'height': '70px',
      '&:hover': {
        'textDecoration': 'underline'
      }
    }
  };
};
```

See more details here: https://github.com/axept/prejss

## Installation

```bash
npm install babel-plugin-transform-prejss --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-prejss"]
}
```

### Via CLI

```sh
babel --plugins transform-prejss script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-prejss"]
});
```
