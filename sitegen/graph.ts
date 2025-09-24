// THIS FILE IS GENERATED AUTOMATICALLY BY https://github.com/vanjs-org/vanjs-org.github.io/tree/master/codegen/gen-code.ts
// DO NOT MODIFY THIS FILE MANUALLY

import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {code, div, li, p, pre, strong, ul}} = van.vanWithDoc(doc)
  const {H1, H2, H3, Link, Symbol} = common(doc)
  return div({id: "content"},
    H1(
      strong(
        "VanGraph",
      ),
      ": Visualize Dependencies in Your App",
    ),
    p(
      strong(
        "VanGraph",
      ),
      " is a library that helps you visualize dependency graph among states and DOM nodes with the help of ",
      Link(
        "Graphviz",
        "https://graphviz.org/",
      ),
      ". Here is the sample usage:",
    ),
    pre(
      code({class: "language-js"},
        "const firstName = van.state(\"Tao\"), lastName = van.state(\"Xin\")\nconst fullName = van.derive(() => `${firstName.val} ${lastName.val}`)\n\n// Build the DOM tree...\n\n// To visualize the dependency graph among `firstName`, `lastName`, `fullName`, and all the\n// derived states and DOM nodes from them.\nvanGraph.show({firstName, lastName, fullName})\n",
      ),
    ),
    p(
      "Checkout a demo in ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/devbox/github/vanjs-org/van/tree/main/graph/examples/basic?file=%2Fsrc%2Fmain.ts",
      ),
      ".",
    ),
    H2(
      "Installation",
    ),
    H3(
      "Via NPM",
    ),
    p(
      "The library is published as NPM package ",
      Link(
        "vanjs-graph",
        "https://www.npmjs.com/package/vanjs-graph",
      ),
      ". Run the following command to install the package:",
    ),
    pre(
      code({class: "language-shell"},
        "npm install vanjs-graph\n",
      ),
    ),
    p(
      "To use the NPM package, add this line to your script:",
    ),
    pre(
      code({class: "language-js"},
        "import * as vanGraph from \"vanjs-graph\"\n",
      ),
    ),
    H3(
      "Via a Script Tag",
    ),
    p(
      "Alternatively, you can import ",
      strong(
        "VanGraph",
      ),
      " from CDN via a ",
      Symbol(
        "<script type=\"text/javascript\">",
      ),
      " tag:",
    ),
    pre(
      code({class: "language-html"},
        "<script type=\"text/javascript\" src=\"https://cdn.jsdelivr.net/npm/vanjs-graph@0.1.0/dist/van-graph.nomodule.min.js\"></script>\n",
      ),
    ),
    p(
      Symbol(
        "https://cdn.jsdelivr.net/npm/vanjs-graph@0.1.0/dist/van-graph.nomodule.js",
      ),
      " can be used for the non-minified version.",
    ),
    p(
      "Note that: you need to import ",
      strong(
        "VanJS",
      ),
      " and ",
      Symbol(
        "@viz-js/viz",
      ),
      " before ",
      strong(
        "VanGraph",
      ),
      " for it to be used properly:",
    ),
    pre(
      code({class: "language-html"},
        "<script type=\"text/javascript\" src=\"https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.6.0.nomodule.min.js\"></script>\n<script type=\"text/javascript\" src=\"https://cdn.jsdelivr.net/npm/@viz-js/viz@3.8.0/lib/viz-standalone.js\"></script>\n",
      ),
    ),
    p(
      Link(
        "Try on jsfiddle",
        "https://jsfiddle.net/zo49cqys/1/",
      ),
    ),
    H2(
      "Documentation",
    ),
    pre(
      code({class: "language-js"},
        "vanGraph.show(states[, options]) => Promise<SVGSVGElement>\n",
      ),
    ),
    p(
      "The parameter ",
      Symbol(
        "states",
      ),
      " represents a collection of ",
      Symbol(
        "State",
      ),
      " objects whose dependency graph we want to visualize. All the ",
      Symbol(
        "State",
      ),
      " objects and their dependents will be rendered in the dependency graph. ",
      Symbol(
        "states",
      ),
      " can either be specified as a plain object, e.g.: ",
      Symbol(
        "{firstName, lastName, fullName}",
      ),
      ", or as an array, e.g.: ",
      Symbol(
        "[firstName, lastName, fullName]",
      ),
      ". If ",
      Symbol(
        "states",
      ),
      " is specified as an array, the variable names won't be shown in the rendered graph.",
    ),
    p(
      Symbol(
        "options",
      ),
      " is a plain object with the following properties:",
    ),
    ul(
      li(
        Symbol(
          "rankdir",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"LR\"",
        ),
        ". Optional. Corresponding to the graph attribute ",
        Symbol(
          "rankdir",
        ),
        " in Graphviz.",
      ),
    ),
    p(
      "The function returns a ",
      Symbol(
        "Promise<SVGSVGElement>",
      ),
      " so that you can await the result and then attach ",
      Symbol(
        "SVGSVGElement",
      ),
      " to the main DOM tree.",
    ),
  )
}
