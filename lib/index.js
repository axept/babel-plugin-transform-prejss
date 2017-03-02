'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prejssPostcssParser = require('prejss-postcss-parser');

var _prejssPostcssParser2 = _interopRequireDefault(_prejssPostcssParser);

var _extractExpressions2 = require('./extract-expressions');

var _extractExpressions3 = _interopRequireDefault(_extractExpressions2);

var _restoreExpressions = require('./restore-expressions');

var _restoreExpressions2 = _interopRequireDefault(_restoreExpressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      TaggedTemplateExpression: function TaggedTemplateExpression(p, _ref2) {
        var opts = _ref2.opts;

        var namespace = opts.namespace || 'prejss';
        var tag = p.node.tag;


        if (tag.name !== namespace) {
          return;
        }

        var _extractExpressions = (0, _extractExpressions3.default)(p.node.quasi),
            rawStyle = _extractExpressions.rawStyle,
            variables = _extractExpressions.variables;

        var parsed = (0, _prejssPostcssParser2.default)(rawStyle);
        var restored = (0, _restoreExpressions2.default)(parsed, variables);
        p.replaceWith(restored);
      }
    }
  };
};