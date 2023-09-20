// THIS FILE IS GENERATED AUTOMATICALLY BY https://github.com/vanjs-org/vanjs-org.github.io/tree/master/codegen/gen-code.ts
// DO NOT MODIFY THIS FILE MANUALLY

import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {code, div, em, li, ol, p, pre, strong, ul}} = van.vanWithDoc(doc)
  const {H1, H2, H3, Link, Symbol} = common(doc)
  return div({id: "content"},
    H1(
      "HTML and MD to VanJS Code Converter",
    ),
    p(
      "This is a library that can convert any MD or HTML snippet into valid ",
      strong(
        "VanJS",
      ),
      " code. The UI version of the code converter is ",
      Link(
        "here",
        "https://vanjs.org/convert",
      ),
      ".",
    ),
    H2(
      "Installation",
    ),
    p(
      "The library is published as NPM package ",
      Link(
        "vanjs-converter",
        "https://www.npmjs.com/package/vanjs-converter",
      ),
      ".",
    ),
    p(
      "Run the following command to install the package:",
    ),
    pre(
      code({class: "language-shell"},
        "npm install vanjs-converter\n",
      ),
    ),
    p(
      "To use the NPM package, add this line to your script:",
    ),
    pre(
      code({class: "language-js"},
        "import { htmlToVanCode, mdToVanCode } from \"vanjs-converter\"\n",
      ),
    ),
    H2(
      Symbol(
        "htmlToVanCode",
      ),
      ": Convert HTML snippet to VanJS Code",
    ),
    H3(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "htmlToVanCode(<HTML string>, <options>) => {code: <code>, tags: <tags>, components: <components>}\n",
      ),
    ),
    H3(
      "Example",
    ),
    pre(
      code({class: "language-js"},
        "htmlToVanCode('<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href=\"https://vanjs.org/\">🍦VanJS</a></li></ul></div>', {indent: 4})\n/*\nThe following result will be returned:\n{\n  code: [\n    'div(',\n    '    p(',\n    '        \"👋Hello\",',\n    '    ),',\n    '    ul(',\n    '        li(',\n    '            \"🗺️World\",',\n    '        ),',\n    '        li(',\n    '            a({href: \"https://vanjs.org/\"},',\n    '                \"🍦VanJS\",',\n    '            ),',\n    '        ),',\n    '    ),',\n    ')',\n  ],\n  tags: [\"a\", \"div\", \"li\", \"p\", \"ul\"],\n  components: [],\n}\n*/\n",
      ),
    ),
    H3(
      "Using VanJS Components",
    ),
    p(
      em(
        "This is only supported in the converter library, not in the UI. The ",
        Link(
          "root cause",
          "https://github.com/remarkablemark/html-react-parser/issues/168#issuecomment-699536994",
        ),
        " is ",
        Link(
          "html-dom-parser",
          "https://www.npmjs.com/package/html-dom-parser",
        ),
        " doesn't support case-sensitive parsing on the client side.",
      ),
    ),
    p(
      "The input HTML string can be a mix of HTML elements and custom UI components built with ",
      strong(
        "VanJS",
      ),
      ". To use custom UI components, just specify the component similar to regular HTML tags. For instance, assume we have custom UI components similar to the ones shown in ",
      Link(
        "https://vanjs.org/",
        "https://vanjs.org/",
      ),
      " home page:",
    ),
    pre(
      code({class: "language-js"},
        "const Hello = text => div(\n  p(\"👋Hello\"),\n  ul(\n    li(text),\n    li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n  ),\n)\n\nconst Counter = ({initValue}) => {\n  const counter = van.state(initValue)\n  return button({onclick: () => ++counter.val}, counter)\n}\n",
      ),
    ),
    p(
      "You can simply specify the input HTML string like this:",
    ),
    pre(
      code({class: "language-html"},
        "<h2>Hello</h2>\n<Hello>🗺️World</Hello>\n<h2>Counter</h2>\n<Counter initValue=\"1\"></Counter>\n<Counter initValue=\"2\"></Counter>\n",
      ),
    ),
    p(
      "which will be converted into the following ",
      strong(
        "VanJS",
      ),
      " code:",
    ),
    pre(
      code({class: "language-js"},
        "h2(\n  \"Hello\",\n),\nHello(\n  \"🗺️World\",\n),\nh2(\n  \"Counter\",\n),\nCounter({initValue: \"1\"}),\nCounter({initValue: \"2\"}),\n",
      ),
    ),
    H3(
      "Options",
    ),
    ul(
      li(
        p(
          Symbol(
            "indent",
          ),
          ": Type ",
          Symbol(
            "number",
          ),
          ". Default ",
          Symbol(
            "2",
          ),
          ". Optional. The indent level of the generated ",
          strong(
            "VanJS code",
          ),
          ".",
        ),
      ),
      li(
        p(
          Symbol(
            "spacing",
          ),
          ": Type ",
          Symbol(
            "boolean",
          ),
          ". Default ",
          Symbol(
            "false",
          ),
          ". Optional. The style of the property object in the generated ",
          strong(
            "VanJS",
          ),
          " code. If ",
          Symbol(
            "true",
          ),
          ", the property object will look like ",
          Symbol(
            "{href: \"https://vanjs.org/\"}",
          ),
          "; Otherwise, the property object will look like ",
          Symbol(
            "{ href: \"https://vanjs.org/\" }",
          ),
          ".",
        ),
      ),
      li(
        p(
          Symbol(
            "skipEmptyText",
          ),
          ": Type ",
          Symbol(
            "boolean",
          ),
          ". Default ",
          Symbol(
            "false",
          ),
          ". Optional. Whether to skip empty text nodes in the generated ",
          strong(
            "VanJS code",
          ),
          ". For instance, the HTML snippet:",
        ),
        pre(
          code({class: "language-html"},
            "<div>\n  <p>👋Hello</p>\n  <ul>\n    <li>🗺️World</li>\n    <li><a href=\"https://vanjs.org/\">🍦VanJS</a></li>\n  </ul>\n</div>\n",
          ),
        ),
        p(
          "will be converted to:",
        ),
        pre(
          code({class: "language-js"},
            "div(\n  p(\n    \"👋Hello\",\n  ),\n  ul(\n    li(\n      \"🗺️World\",\n    ),\n    li(\n      a({href: \"https://vanjs.org/\"},\n        \"🍦VanJS\",\n      ),\n    ),\n  ),\n)\n",
          ),
        ),
        p(
          "if ",
          Symbol(
            "skipEmptyText",
          ),
          " is ",
          Symbol(
            "true",
          ),
          ". But it will be converted to:",
        ),
        pre(
          code({class: "language-js"},
            "div(\n  \"\\n  \",\n  p(\n    \"👋Hello\",\n  ),\n  \"\\n  \",\n  ul(\n    \"\\n    \",\n    li(\n      \"🗺️World\",\n    ),\n    \"\\n    \",\n    li(\n      a({href: \"https://vanjs.org/\"},\n        \"🍦VanJS\",\n      ),\n    ),\n    \"\\n  \",\n  ),\n  \"\\n\",\n)\n",
          ),
        ),
        p(
          "if ",
          Symbol(
            "skipEmptyText",
          ),
          " is ",
          Symbol(
            "false",
          ),
          ".",
        ),
      ),
      li(
        p(
          Symbol(
            "htmlTagPred",
          ),
          ": Type ",
          Symbol(
            "(name: string) => boolean",
          ),
          ". Default ",
          Symbol(
            "s => s.toLowerCase() === s",
          ),
          ". Optional. A predicate function to check whether a specific tag snippet such as ",
          Symbol(
            "<Counter>",
          ),
          " should be treated as a native HTML element or a custom UI component built with ",
          strong(
            "VanJS",
          ),
          ". By default, it will be treated as a native HTML element if the letters in the ",
          Symbol(
            "name",
          ),
          " are all lowercase.",
        ),
      ),
    ),
    H3(
      "Return Value",
    ),
    p(
      "A plain object with the following fields:",
    ),
    ul(
      li(
        Symbol(
          "code",
        ),
        ": A ",
        Symbol(
          "string[]",
        ),
        " for all lines of the generated ",
        strong(
          "VanJS",
        ),
        " code.",
      ),
      li(
        Symbol(
          "tags",
        ),
        ": A ",
        Symbol(
          "string[]",
        ),
        " for all HTML tag names used in the generated ",
        strong(
          "VanJS",
        ),
        " code, which can be used in the importing line of tag functions such as:",
        pre(
          code({class: "language-js"},
            "const {<tags needs to import>} = van.tags\n",
          ),
        ),
      ),
      li(
        Symbol(
          "components",
        ),
        ": A ",
        Symbol(
          "string[]",
        ),
        " for all custom ",
        strong(
          "VanJS",
        ),
        " components used in the generated ",
        strong(
          "VanJS",
        ),
        " code, which can be used in the importing line such as:",
        pre(
          code({class: "language-js"},
            "import {<components needs to import>} from \"./my-component-lib.js\"\n",
          ),
        ),
      ),
    ),
    H3(
      Symbol(
        "DUMMY",
      ),
    ),
    p(
      em(
        "This is only supported in the converter library, not in the UI.",
      ),
    ),
    p(
      "There are 2 special cases while specifying custom ",
      strong(
        "VanJS",
      ),
      " components in the input HTML string. The first special case is that, sometimes, a custom component needs properties being specified in its first argument, even for empty properties ",
      Symbol(
        "{}",
      ),
      " (e.g.: the ",
      Symbol(
        "Counter",
      ),
      " component defined in the ",
      Link(
        "section",
        "#using-vanjs-components",
      ),
      " above). In this case, you can specify the special ",
      Symbol(
        "DUMMY",
      ),
      " property as a placeholder. For instance:",
    ),
    pre(
      code({class: "language-html"},
        "<CustomElement DUMMY>content</CustomElement>\n",
      ),
    ),
    p(
      "will be converted to:",
    ),
    pre(
      code({class: "language-js"},
        "CustomElement({},\n  \"content\",\n)\n",
      ),
    ),
    p(
      "whereas",
    ),
    pre(
      code({class: "language-html"},
        "<CustomElement>content</CustomElement>\n",
      ),
    ),
    p(
      "will be converted to:",
    ),
    pre(
      code({class: "language-js"},
        "CustomElement(\n  \"content\",\n)\n",
      ),
    ),
    p(
      "The second special case is that, sometimes, a custom ",
      strong(
        "VanJS",
      ),
      " component needs consecutive string arguments. You can achieve that by inserting ",
      Symbol(
        "<DUMMY>",
      ),
      " element between text pieces. For instance:",
    ),
    pre(
      code({class: "language-html"},
        "<Link>🍦VanJS<DUMMY></DUMMY>https://vanjs.org/</Link>\n",
      ),
    ),
    p(
      "will be converted to:",
    ),
    pre(
      code({class: "language-js"},
        "Link(\n  \"🍦VanJS\",\n  \"https://vanjs.org/\",\n)\n",
      ),
    ),
    H2(
      Symbol(
        "mdToVanCode",
      ),
      ": Convert MD snippet to VanJS Code",
    ),
    H3(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "mdToVanCode(<MD string>, <options>) => {code: <code>, tags: <tags>, components: <components>}\n",
      ),
    ),
    p(
      "Under the hood, there are 2 steps for converting an MD snippet to ",
      strong(
        "VanJS",
      ),
      " code:",
    ),
    ol(
      li(
        "Convert the MD string into an HTML string with ",
        Link(
          "Marked",
          "https://marked.js.org/",
        ),
        " library.",
      ),
      li(
        "Convert the HTML string into ",
        strong(
          "VanJS",
        ),
        " code with ",
        Symbol(
          "htmlToVanCode",
        ),
        ".",
      ),
    ),
    H3(
      "Example",
    ),
    pre(
      code({class: "language-js"},
        "mdToVanCode(`👋Hello\n* 🗺️World\n* [🍦VanJS](https://vanjs.org/)\n`)\n/*\nThe following result will be returned:\n{\n  code: [\n    'p(',\n    '  \"👋Hello\",',\n    '),',\n    'ul(',\n    '  li(',\n    '    \"🗺️World\",',\n    '  ),',\n    '  li(',\n    '    a({href: \"https://vanjs.org/\"},',\n    '      \"🍦VanJS\",',\n    '    ),',\n    '  ),',\n    '),',\n  ],\n  tags: [\"a\", \"li\", \"p\", \"ul\"],\n  components: [],\n}\n*/\n",
      ),
    ),
    p(
      "Note that, you can insert custom HTML snippets, or even ",
      Link(
        "custom ",
        strong(
          "VanJS",
        ),
        " components",
        "#using-vanjs-components",
      ),
      " in the input MD string.",
    ),
    H3(
      "Options",
    ),
    ul(
      li(
        p(
          Symbol(
            "indent",
          ),
          ": Type ",
          Symbol(
            "number",
          ),
          ". Default ",
          Symbol(
            "2",
          ),
          ". Optional. The indent level of the generated ",
          strong(
            "VanJS code",
          ),
          ".",
        ),
      ),
      li(
        p(
          Symbol(
            "spacing",
          ),
          ": Type ",
          Symbol(
            "boolean",
          ),
          ". Default ",
          Symbol(
            "false",
          ),
          ". Optional. The style of the property object in the generated ",
          strong(
            "VanJS",
          ),
          " code. If ",
          Symbol(
            "true",
          ),
          ", the property object will look like ",
          Symbol(
            "{href: \"https://vanjs.org/\"}",
          ),
          "; Otherwise, the property object will look like ",
          Symbol(
            "{ href: \"https://vanjs.org/\" }",
          ),
          ".",
        ),
      ),
      li(
        p(
          Symbol(
            "htmlTagPred",
          ),
          ": Type ",
          Symbol(
            "(name: string) => boolean",
          ),
          ". Default ",
          Symbol(
            "s => s.toLowerCase() === s",
          ),
          ". Optional. A predicate function to check whether a specific tag snippet such as ",
          Symbol(
            "<Counter>",
          ),
          " represents a native HTML element or a custom UI component built with ",
          strong(
            "VanJS",
          ),
          ". By default, it will be considered a native HTML element if the letters in the ",
          Symbol(
            "name",
          ),
          " are all lowercase.",
        ),
      ),
      li(
        p(
          Symbol(
            "renderer",
          ),
          ": Optional. ",
          em(
            "Custom renderer is only supported in the converter library, not in the UI.",
          ),
          " A custom object used to override how tokens in the MD string are being rendered. The specification of the ",
          Symbol(
            "renderer",
          ),
          " object can be found in Marked ",
          Link(
            "doc",
            "https://marked.js.org/using_pro#renderer",
          ),
          ". For instance, the ",
          Symbol(
            "renderer",
          ),
          " object:",
        ),
        pre(
          code({class: "language-js"},
            "{\n  codespan: s => `<Symbol>${s}</Symbol>`,\n  link: (href, _unused_title, text) => `<Link>${text}<DUMMY></DUMMY>${href}</Link>`,\n}\n",
          ),
        ),
        p(
          "will convert ",
          Symbol(
            "`text`",
          ),
          " in MD string into ",
          Symbol(
            "Symbol(\"text\")",
          ),
          " (here ",
          Symbol(
            "Symbol",
          ),
          " is a custom ",
          strong(
            "VanJS",
          ),
          " component) instead of ",
          Symbol(
            "code(\"text\")",
          ),
          ", and will convert ",
          Symbol(
            "[text](link)",
          ),
          " in MD string into ",
          Symbol(
            "Link(\"text\", \"link\")",
          ),
          " instead of ",
          Symbol(
            "a({href: \"link\"}, \"text\")",
          ),
          ".",
        ),
      ),
    ),
    H3(
      "Return Value",
    ),
    p(
      "The same as the ",
      Link(
        "return value",
        "#return-value",
      ),
      " of ",
      Symbol(
        "htmlToVanCode",
      ),
      ".",
    ),
    H2(
      "Showroom",
    ),
    p(
      "The ",
      Link(
        "https://vanjs.org/",
        "https://vanjs.org/",
      ),
      " website is using this library to keep ",
      Symbol(
        "README.md",
      ),
      " files in sync with their corresponding web pages (",
      Link(
        "source code",
        "https://github.com/vanjs-org/vanjs-org.github.io/tree/master/codegen",
      ),
      " of the code generation):",
    ),
    ul(
      li(
        "The ",
        Link(
          "VanUI",
          "https://vanjs.org/vanui",
        ),
        " page is kept in sync with the ",
        Link(
          Symbol(
            "README.md",
          ),
          "https://github.com/vanjs-org/van/tree/main/components#readme",
        ),
        " file in GitHub with the help of this library.",
      ),
      li(
        "This ",
        Link(
          Symbol(
            "README.md",
          ),
          "https://github.com/vanjs-org/converter#readme",
        ),
        " file is kept in sync with this ",
        Link(
          "page",
          "https://vanjs.org/converter-lib",
        ),
        " in ",
        Link(
          "https://vanjs.org/",
          "https://vanjs.org/",
        ),
        " website.",
      ),
    ),
  )
}
