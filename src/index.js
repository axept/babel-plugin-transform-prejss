import extractExpressions from './extract-expressions'
import restoreExpressions from './restore-expressions'

let parser

export default ({ types: t }) => {
  return {
    visitor: {
      ImportDefaultSpecifier(p, { opts, file }) {
        const removeImports =
          (typeof opts['removeImports'] !== 'undefined') ?
            opts['removeImports'] :
            'prejss'
        if (removeImports === false) {
          return
        }
        
        const importRef = p.parentPath.node.source.value
        if (importRef === removeImports) {
          
          if (opts['silent'] !== true) {
            console.log(
              `babel-plugin-transform-prejss: remove import construction for "${importRef}"` +
              ` from "${file.opts.filename}"`
            )
          }
          
          p.parentPath.remove()
        }
      },

      TaggedTemplateExpression(p, { opts }) {
        const namespace = opts['namespace'] || 'preJSS'
        
        if (!parser) {
          const parserName = opts['parser'] || 'prejss-postcss-parser'
          parser = require(parserName)
          if (typeof parser !== 'function') {
            parser = parser.default
          }
        }
        
        const { tag } = p.node
        if (tag.name.toLowerCase() !== namespace.toLowerCase()) {
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
