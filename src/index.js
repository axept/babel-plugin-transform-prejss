import extractExpressions from './extract-expressions'
import restoreExpressions from './restore-expressions'

let parser

export default ({ types: t }) => {
  return {
    visitor: {
      ImportDefaultSpecifier(p, { opts, file }) {
        const removeImport = opts['removeImport'] || 'prejss'
        if (removeImport === false) {
          return
        }
        
        const importRef = p.parentPath.node.source.value
        if (importRef === removeImport) {
          console.log(
            `babel-plugin-transform-prejss: remove an import construction for ${importRef}` +
            ` from ${file.opts.filename}"`
          )
          p.parentPath.remove()
        }
      },

      TaggedTemplateExpression(p, { opts }) {
        const namespace = opts['namespace'] || 'prejss'
        
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
