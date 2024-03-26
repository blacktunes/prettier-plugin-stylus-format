import StylusSupremacy from 'stylus-supremacy'
import { Plugin } from 'prettier'

const defaultStyle = {
  insertColons: false,
  insertSemicolons: false,
  insertBraces: false,
  preserveNewLinesBetweenPropertyValues: true,
  insertSpaceAfterComment: false,
  selectorSeparator: '\n',
  tabStopChar: '  ',
  sortProperties: 'grouped',
  alwaysUseImport: true,
  reduceMarginAndPaddingValues: true
}

const AST_FORMAT = 'stylus-ast'

const stylusFormat: Plugin = {
  languages: [
    {
      name: 'stylus',
      parsers: ['stylus'],
      extensions: ['.styl'],
      vscodeLanguageIds: ['stylus']
    }
  ],
  parsers: {
    stylus: {
      locStart: () => {
        throw new Error()
      },
      locEnd: () => {
        throw new Error()
      },
      parse: (text: string) => ({ text }),
      astFormat: AST_FORMAT
    }
  },
  printers: {
    [AST_FORMAT]: {
      print: (path, options) => {
        const ast = path.getValue()
        const stylusCode = StylusSupremacy.format(ast.text, defaultStyle)
        if (ast.text.startsWith('\n')) {
          return stylusCode.substring(1)
        }
        return stylusCode
      }
    }
  }
}

module.exports = {
  languages: stylusFormat.languages,
  parsers: stylusFormat.parsers,
  printers: stylusFormat.printers
}
