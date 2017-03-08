import extractExpressions from './extract-expressions'
import restoreExpressions from './restore-expressions'

let parser

export default ({ types: t }) => {
  return {
    visitor: {
      TaggedTemplateExpression(p, { opts }) {
        const namespace = opts.namespace || 'prejss'
        if (!parser) {
          parser = require(opts.parser || 'prejss-postcss-parser')
          if (typeof parser !== 'function') {
            parser = parser.default
          }
        }
        const { tag } = p.node

        if (tag.name !== namespace) {
          return
        }

        const { rawStyle, variables } = extractExpressions(p.node.quasi)
        const parsed = parser(rawStyle, { config: opts.config })
        const restored = restoreExpressions(parsed, variables)
        p.replaceWith(restored)
      },
    },
  }
}
