'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var restoreExpressions = function restoreExpressions(objectCSS, expressions) {
  return t.objectExpression(Object.entries(objectCSS).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var finalKey = expressions[key] ? expressions[key] : t.stringLiteral(key);
    var finalValue = void 0;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      finalValue = restoreExpressions(value, expressions);
    } else if (expressions[value]) {
      finalValue = expressions[value];
    } else {
      finalValue = t.stringLiteral(value);
    }
    return t.objectProperty(finalKey, finalValue, !t.isStringLiteral(finalKey));
  }));
};

exports.default = function (objectCss, variables) {
  return restoreExpressions(objectCss, variables);
};