'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _guid = require('./utils/guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var quasis = _ref.quasis,
      expressions = _ref.expressions;

  var chunks = quasis.map(function (quasi) {
    return quasi.value.cooked;
  });
  var variables = {};

  var rawStyle = chunks.reduce(function (result, chunk, index) {
    var variable = expressions[index];
    if (variable) {
      var key = '$^var__' + (0, _guid2.default)();
      variables[key] = variable;
      return result + chunk + key;
    } else {
      return result + chunk;
    }
  }, '');

  return { rawStyle: rawStyle, variables: variables };
};