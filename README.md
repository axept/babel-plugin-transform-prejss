# babel-plugin-transform-prejss

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

### Options

+ `removeImport: <Boolean|String>` - by default is `prejss`. You can configure it to `false` if you wouldn't like to remove imports for "prejss" automatically. But think twice! By disabling this option you may include server code and a lot of unnecessary dependencies into your bundle.

+ `silent: <Boolean>` - by default is `false`. This option is configuring if the plugin should or not to log about each removed prejss import.

+ `namespace: <String>` - by default is `preJSS`


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
