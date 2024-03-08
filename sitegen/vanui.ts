// THIS FILE IS GENERATED AUTOMATICALLY BY https://github.com/vanjs-org/vanjs-org.github.io/tree/master/codegen/gen-code.ts
// DO NOT MODIFY THIS FILE MANUALLY

import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {code, div, em, li, p, pre, span, strong, ul}} = van.vanWithDoc(doc)
  const {H1, H2, H3, H4, Link, Symbol} = common(doc)
  return div({id: "content"},
    H1(
      strong(
        "VanUI",
      ),
      ": A Collection of Grab 'n Go Reusable Utility and UI Components for VanJS",
    ),
    p(
      "🙏 Feedback and contribution are welcome and greatly appreciated! (",
      Link(
        "source code",
        "https://github.com/vanjs-org/van/tree/main/components",
      ),
      ")",
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
        "vanjs-ui",
        "https://www.npmjs.com/package/vanjs-ui",
      ),
      ". Run the following command to install the package:",
    ),
    pre(
      code({class: "language-shell"},
        "npm install vanjs-ui\n",
      ),
    ),
    p(
      "To use the NPM package, add this line to your script:",
    ),
    pre(
      code({class: "language-js"},
        "import { <components you want to import> } from \"vanjs-ui\"\n",
      ),
    ),
    H3(
      "Via a Script Tag",
    ),
    p(
      "Alternatively, you can import ",
      strong(
        "VanUI",
      ),
      " from CDN via a ",
      Symbol(
        "<script type=\"text/javascript\">",
      ),
      " tag:",
    ),
    pre(
      code({class: "language-html"},
        "<script type=\"text/javascript\" src=\"https://cdn.jsdelivr.net/npm/vanjs-ui@0.10.0/dist/van-ui.nomodule.min.js\"></script>\n",
      ),
    ),
    p(
      Symbol(
        "https://cdn.jsdelivr.net/npm/vanjs-ui@0.10.0/dist/van-ui.nomodule.js",
      ),
      " can be used for the non-minified version.",
    ),
    p(
      "Note that: ",
      strong(
        "VanJS",
      ),
      " needs to be imported via a ",
      Symbol(
        "<script type=\"text/javascript\">",
      ),
      " tag for ",
      strong(
        "VanUI",
      ),
      " to work properly.",
    ),
    p(
      "Try on jsfiddle: ",
      Link(
        "Modal",
        "https://jsfiddle.net/k61m70vz/",
      ),
      ", ",
      Link(
        "MessageBoard",
        "https://jsfiddle.net/2kp3mu6b/1/",
      ),
      ".",
    ),
    H3(
      "TypeScript Support for Script Tag Integration",
    ),
    p(
      "To get TypeScript support for ",
      Symbol(
        "<script>",
      ),
      " tag integration, download ",
      Link(
        Symbol(
          "van-ui.d.ts",
        ),
        "https://vanjs.org/autodownload?file=van-ui.d.ts",
      ),
      " and add the code like following at the top of your ",
      Symbol(
        ".ts",
      ),
      " file:",
    ),
    pre(
      code({class: "language-ts"},
        "import type { Modal as ModalType } from \"./van-ui.d.ts\"\n\ndeclare const Modal: typeof ModalType\n",
      ),
    ),
    H2(
      "Documentation",
    ),
    p(
      "The following components have been implemented so far:",
    ),
    ul(
      li(
        "Utility components:",
        ul(
          li(
            Link(
              "Await",
              "#await",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/await?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
        ),
      ),
      li(
        "UI components:",
        ul(
          li(
            Link(
              "Modal",
              "#modal",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/modal?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
          li(
            Link(
              "Tabs",
              "#tabs",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tabs?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
          li(
            Link(
              "MessageBoard",
              "#message",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/message?file=/src/main.ts",
            ),
            ")",
          ),
          li(
            Link(
              "Tooltip",
              "#tooltip",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tooltip?file=/src/main.ts:1,1",
            ),
            ")",
          ),
          li(
            Link(
              "Toggle",
              "#toggle",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/toggle?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
          li(
            Link(
              "OptionGroup",
              "#optiongroup",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/option-group?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
          li(
            Link(
              "Banner",
              "#banner",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/banner?file=/src/main.ts:1,1",
            ),
            ")",
          ),
          li(
            span({style: "color:red; padding-right: 0.3rem;"},
              strong(
                "New!",
              ),
            ),
            Link(
              "FloatingWindow",
              "#floatingwindow",
            ),
            " (",
            Link(
              "preview",
              "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/window?file=%2Fsrc%2Fmain.ts%3A1%2C1",
            ),
            ")",
          ),
        ),
      ),
    ),
    H3(
      "Await",
    ),
    p(
      em(
        "Author: ",
        Link(
          "@Hunter-Gu",
          "https://github.com/Hunter-Gu",
        ),
      ),
    ),
    p(
      Symbol(
        "Await",
      ),
      " is a utility component that helps you build UI components based on asynchronous data (i.e.: a JavaScript ",
      Link(
        Symbol(
          "Promise",
        ),
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
      ),
      " object).",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Await({\n  value,  // A `Promise` object for asynchronous data\n  container,  // The container of the result. Default `div`\n  Loading,  // What to render when the data is being loaded\n  Error,  // What to render when error occurs\n}, children) => <The created UI element>\n",
      ),
    ),
    p(
      "The ",
      Symbol(
        "children",
      ),
      " parameter (type: ",
      Symbol(
        "(data: T) => ValidChildDomValue",
      ),
      ") is a function that takes the resolved data as input and returns a valid child DOM value (",
      Symbol(
        "Node",
      ),
      ", primitives, ",
      Symbol(
        "null",
      ),
      " or ",
      Symbol(
        "undefined",
      ),
      "), used to indicate what to render after the data is loaded.",
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/await?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    p(
      "Example 1 (fetching the number of GitHub stars):",
    ),
    pre(
      code({class: "language-ts"},
        "const Example1 = () => {\n  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))\n\n  const fetchWithDelay = (url: string, waitMs: number) =>\n    sleep(waitMs).then(() => fetch(url)).then(r => r.json())\n\n  const fetchStar = () =>\n    fetchWithDelay(\"https://api.github.com/repos/vanjs-org/van\", 1000)\n      .then(data => data.stargazers_count)\n\n  const data = van.state(fetchStar())\n\n  return [\n    () => h2(\n      \"Github Star: \",\n      Await({\n        value: data.val, container: span,\n        Loading: () => \"🌀 Loading...\",\n        Error: () => \"🙀 Request failed.\",\n      }, starNumber => `⭐️ ${starNumber}!`)\n    ),\n    () => Await({\n      value: data.val,\n      Loading: () => '',\n    }, () => button({onclick: () => (data.val = fetchStar())}, \"Refetch\")),\n  ]\n}\n",
      ),
    ),
    p(
      "Example 2 (parallel ",
      Symbol(
        "Await",
      ),
      "):",
    ),
    pre(
      code({class: "language-ts"},
        "const Example2 = () => {\n  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))\n\n  const loadNumber = () =>\n    sleep(Math.random() * 1000).then(() => Math.floor(Math.random() * 10))\n\n  const a = van.state(loadNumber()), b = van.state(loadNumber())\n\n  return [\n    h2(\"Parallel Await\"),\n    () => {\n      const sum = van.derive(() => Promise.all([a.val, b.val]).then(([a, b]) => a + b))\n      return Await({\n        value: sum.val,\n        Loading: () => div(\n          Await({value: a.val, Loading: () => \"🌀 Loading a...\"}, () => \"Done\"),\n          Await({value: b.val, Loading: () => \"🌀 Loading b...\"}, () => \"Done\"),\n        ),\n      }, sum => \"a + b = \" + sum)\n    },\n    p(button({onclick: () => (a.val = loadNumber(), b.val = loadNumber())}, \"Reload\")),\n  ]\n}\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "value",
        ),
        ": Type ",
        Symbol(
          "Promise",
        ),
        ". Required. The asynchronous data that the result UI element is based on.",
      ),
      li(
        Symbol(
          "container",
        ),
        ": Type ",
        Symbol(
          "TagFunction<Element>",
        ),
        ". Default ",
        Symbol(
          "div",
        ),
        " (",
        Symbol(
          "van.tags.div",
        ),
        "). Optional. The type of the wrapper HTML element for the result.",
      ),
      li(
        Symbol(
          "Loading",
        ),
        ": Type ",
        Symbol(
          "() => ValidChildDomValue",
        ),
        ". Optional. If specified, indicates what to render when the asynchronous data is being loaded.",
      ),
      li(
        Symbol(
          "Error",
        ),
        ": Type ",
        Symbol(
          "(reason: Error) => ValidChildDomValue",
        ),
        ". Optional. If specified, indicates what to render when error occurs while fetching the asynchronous data.",
      ),
    ),
    H3(
      "Modal",
    ),
    p(
      "Creates a modal window on top of the current page.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Modal({...props}, ...children) => <The created modal window>\n",
      ),
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/modal?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    p(
      "Example 1:",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\nvan.add(document.body, Modal({closed},\n  p(\"Hello, World!\"),\n  div({style: \"display: flex; justify-content: center;\"},\n    button({onclick: () => closed.val = true}, \"Ok\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Example 2:",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\nconst formDom = form(\n  div(input({type: \"radio\", name: \"lang\", value: \"Zig\", checked: true}), \"Zig\"),\n  div(input({type: \"radio\", name: \"lang\", value: \"Rust\"}), \"Rust\"),\n  div(input({type: \"radio\", name: \"lang\", value: \"Kotlin\"}), \"Kotlin\"),\n  div(input({type: \"radio\", name: \"lang\", value: \"TypeScript\"}), \"TypeScript\"),\n  div(input({type: \"radio\", name: \"lang\", value: \"JavaScript\"}), \"JavaScript\"),\n)\n\nconst onOk = () => {\n  const lang = (<HTMLInputElement>formDom.querySelector(\"input:checked\")).value\n  alert(lang + \" is a good language 😀\")\n  closed.val = true\n}\n\nvan.add(document.body, Modal({closed, blurBackground: true},\n  p(\"What's your favorite programming language?\"),\n  formDom,\n  p({style: \"display: flex; justify-content: space-evenly;\"},\n    button({onclick: onOk}, \"Ok\"),\n    button({onclick: () => closed.val = true}, \"Cancel\"),\n  )\n))\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "closed",
        ),
        ": Type ",
        Symbol(
          "State<boolean>",
        ),
        ". Required. A ",
        Symbol(
          "State",
        ),
        " object used to close the created modal window. Basically, setting ",
        Symbol(
          "closed.val = true",
        ),
        " will close the created modal window. You can also subscribe the closing event of the modal window via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
      li(
        Symbol(
          "backgroundColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"rgba(0,0,0,.5)\"",
        ),
        ". Optional. The color of the background overlay when the modal is activated.",
      ),
      li(
        Symbol(
          "blurBackground",
        ),
        ": Type ",
        Symbol(
          "boolean",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. Whether to blur the background.",
      ),
      li(
        Symbol(
          "backgroundClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the background overlay. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "backgroundStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the background overlay.",
      ),
      li(
        Symbol(
          "modalClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the created modal element. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "modalStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the created modal element.",
      ),
    ),
    H3(
      "Tabs",
    ),
    p(
      "Creates a tab-view for tabs specified by the user.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Tabs({...props}, tabContents) => <The created tab-view>\n",
      ),
    ),
    p(
      "The ",
      Symbol(
        "tabContents",
      ),
      " parameter is an object whose keys are the titles of the tabs and values (type: ",
      Symbol(
        "ChildDom",
      ),
      ") are the DOM element(s) for the tab contents.",
    ),
    H4(
      "Example",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tabs?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, Tabs(\n  {\n    style: \"max-width: 500px;\",\n    tabButtonActiveColor: \"white\",\n    tabButtonBorderStyle: \"none\",\n    tabButtonRowStyleOverrides: {\n      \"padding-left\": \"12px\",\n    },\n  },\n  {\n    Home: p(\n      \"Welcome to \", b(\"VanJS\"), \" - the smallest reactive UI framework in the world.\",\n    ),\n    \"Getting Started\": [\n      p(\"To install the \", b(\"VanJS\"), \" NPM package, run the line below:\"),\n      pre(code(\"npm install vanjs-core\")),\n    ],\n    About: p(\n      \"The author of \", b(\"VanJS\"), \" is \",\n      a({href: \"https://github.com/Tao-VanJS\"}, \" Tao Xin\"), \".\"\n    ),\n  },\n))\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "activeTab",
        ),
        ": Type ",
        Symbol(
          "State<string>",
        ),
        ". Optional. If specified, you can activate a tab via the specified ",
        Symbol(
          "State",
        ),
        " object with ",
        Symbol(
          "activeTab.val = \"<tab title>\"",
        ),
        ", and subscribe to the changes of active tab via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
      li(
        Symbol(
          "resultClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the result DOM element. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "style",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "style",
        ),
        " property of the result DOM element.",
      ),
      li(
        Symbol(
          "tabButtonRowColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#f1f1f1\"",
        ),
        ". Optional. The background color of the container of tab buttons.",
      ),
      li(
        Symbol(
          "tabButtonBorderStyle",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "1px solid #000",
        ),
        ". Optional. The style of borders between tab buttons.",
      ),
      li(
        Symbol(
          "tabButtonHoverColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#ddd\"",
        ),
        ". Optional. The color when the tab button is hovered.",
      ),
      li(
        Symbol(
          "tabButtonActiveColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#ccc\"",
        ),
        ". Optional. The color of the tab button for the currently active tab.",
      ),
      li(
        Symbol(
          "transitionSec",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Default ",
        Symbol(
          "0.3",
        ),
        ". Optional. The duration of the transition when tab buttons change color.",
      ),
      li(
        Symbol(
          "tabButtonRowClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the container of tab buttons. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "tabButtonRowStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the container of tab buttons.",
      ),
      li(
        Symbol(
          "tabButtonClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". The ",
        Symbol(
          "class",
        ),
        " attribute of tab buttons. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "tabButtonStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for tab buttons. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "tabContentClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". The ",
        Symbol(
          "class",
        ),
        " attribute of tab contents. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "tabContentStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for tab contents.",
      ),
    ),
    H3(
      "MessageBoard",
    ),
    p(
      "Creates a message board to show messages on the screen.",
    ),
    H4(
      "Signature",
    ),
    p(
      "To create a message board:",
    ),
    pre(
      code({class: "language-js"},
        "const board = new MessageBoard({...props})\n",
      ),
    ),
    p(
      "Then you can show messages with ",
      Symbol(
        "show",
      ),
      " method:",
    ),
    pre(
      code({class: "language-js"},
        "board.show({...props}) => <The created DOM node for the message, which is also appended to the message board>\n",
      ),
    ),
    p(
      "Optionally, you can remove the DOM node of the message board with ",
      Symbol(
        "remove",
      ),
      " method:",
    ),
    pre(
      code({class: "language-js"},
        "board.remove()\n",
      ),
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/message?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "const board = new MessageBoard({top: \"20px\"})\n\nconst example1 = () => board.show({message: \"Hi!\", durationSec: 1})\nconst example2 = () => board.show(\n  {message: [\"Welcome to \", a({href: \"https://vanjs.org/\", style: \"color: #0099FF\"}, \"🍦VanJS\"), \"!\"], closer: \"❌\"})\n\nconst closed = van.state(false)\nconst example3 = () => {\n  closed.val = false\n  board.show({message: \"Press ESC to close this message\", closed})\n}\ndocument.addEventListener(\"keydown\", e => e.key === \"Escape\" && (closed.val = true))\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    p(
      "Message board properties:",
    ),
    ul(
      li(
        Symbol(
          "top",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Optional. The ",
        Symbol(
          "top",
        ),
        " CSS property of the message board.",
      ),
      li(
        Symbol(
          "bottom",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Optional. The ",
        Symbol(
          "bottom",
        ),
        " CSS property of the message board. Exactly one of ",
        Symbol(
          "top",
        ),
        " and ",
        Symbol(
          "bottom",
        ),
        " should be specified.",
      ),
      li(
        Symbol(
          "backgroundColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#333D\"",
        ),
        ". Optional. The background color of the messages shown on the message board.",
      ),
      li(
        Symbol(
          "fontColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"white\"",
        ),
        ". Optional. The font color of the messages shown on the message board.",
      ),
      li(
        Symbol(
          "fadeOutSec",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Default ",
        Symbol(
          "0.3",
        ),
        ". Optional. The duration of the fade out animation when messages are being closed.",
      ),
      li(
        Symbol(
          "boardClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the message board. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "boardStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the message board.",
      ),
      li(
        Symbol(
          "messageClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the message shown on the message board. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "messageStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the message shown on the message board.",
      ),
      li(
        Symbol(
          "closerClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the message closer. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "closerStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the message closer.",
      ),
    ),
    p(
      "Message properties:",
    ),
    ul(
      li(
        Symbol(
          "message",
        ),
        ": Type ",
        Symbol(
          "ChildDom",
        ),
        ". Required. One ",
        Symbol(
          "ChildDom",
        ),
        " or multiple ",
        Symbol(
          "ChildDom",
        ),
        " as an ",
        Symbol(
          "Array",
        ),
        " for the message we want to show.",
      ),
      li(
        Symbol(
          "closer",
        ),
        ": Type ",
        Symbol(
          "ChildDom",
        ),
        ". Optional. If specified, we will render a closer DOM node with one ",
        Symbol(
          "ChildDom",
        ),
        " or multiple ",
        Symbol(
          "ChildDom",
        ),
        "s as an ",
        Symbol(
          "Array",
        ),
        " which can be clicked to close the shown message.",
      ),
      li(
        Symbol(
          "durationSec",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Optional. If specified, the shown message will be automatically closed after ",
        Symbol(
          "durationSec",
        ),
        " seconds.",
      ),
      li(
        Symbol(
          "closed",
        ),
        ": Type ",
        Symbol(
          "State<boolean>",
        ),
        ". Optional. If specified, the shown message can be closed via the ",
        Symbol(
          "closed",
        ),
        Symbol(
          "State",
        ),
        " object with ",
        Symbol(
          "closed.val = true",
        ),
        ". You can also subscribe the closing event of the message via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
    ),
    H3(
      "Tooltip",
    ),
    p(
      "Creates a tooltip above a DOM node which typically shows when the DOM node is being hovered.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Tooltip({...props}) => <The created tooltip element>\n",
      ),
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tooltip?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "const tooltip1Show = van.state(false)\nconst tooltip2Show = van.state(false)\nconst count = van.state(0)\nconst tooltip2Text = van.derive(() => `Count: ${count.val}`)\nconst tooltip3Show = van.state(false)\n\nvan.add(document.body,\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip1Show.val = true,\n    onmouseleave: () => tooltip1Show.val = false,\n  }, \"Normal Tooltip\", Tooltip({text: \"Hi!\", show: tooltip1Show})), \" \",\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip2Show.val = true,\n    onmouseleave: () => tooltip2Show.val = false,\n    onclick: () => ++count.val\n  }, \"Increment Counter\", Tooltip({text: tooltip2Text, show: tooltip2Show})), \" \",\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip3Show.val = true,\n    onmouseleave: () => tooltip3Show.val = false,\n  }, \"Slow Fade-in\", Tooltip({text: \"Hi from the sloth!\", show: tooltip3Show, fadeInSec: 5})),\n)\n",
      ),
    ),
    p(
      "Note that the lines:",
    ),
    pre(
      code({class: "language-ts"},
        "{\n  style: \"position: relative;\",\n  onmouseenter: () => ...Show.val = true,\n  onmouseleave: () => ...Show.val = false,\n}\n",
      ),
    ),
    p(
      "are needed for the tooltip element to be shown properly.",
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "text",
        ),
        ": Type ",
        Symbol(
          "string | State<string>",
        ),
        ". Required. The text shown in the tooltip. If a ",
        Symbol(
          "State",
        ),
        " object is specified, you can set the text with ",
        Symbol(
          "text.val = ...",
        ),
        ".",
      ),
      li(
        Symbol(
          "show",
        ),
        ": Type ",
        Symbol(
          "State<boolean>",
        ),
        ". Required. The ",
        Symbol(
          "State",
        ),
        " object to control whether to show the tooltip or not.",
      ),
      li(
        Symbol(
          "width",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"200px\"",
        ),
        ". Optional. The width of the tooltip.",
      ),
      li(
        Symbol(
          "backgroundColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#333D\"",
        ),
        ". Optional. The background color of the tooltip.",
      ),
      li(
        Symbol(
          "fontColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default: ",
        Symbol(
          "\"white\"",
        ),
        ". Optional. The font color of the tooltip.",
      ),
      li(
        Symbol(
          "fadeInSec",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Default ",
        Symbol(
          "0.3",
        ),
        ". Optional. The duration of the fade-in animation.",
      ),
      li(
        Symbol(
          "tooltipClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the tooltip. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "tooltipStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the tooltip.",
      ),
      li(
        Symbol(
          "triangleClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the triangle in the bottom. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "triangleStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the triangle in the bottom.",
      ),
    ),
    H3(
      "Toggle",
    ),
    p(
      "Creates a toggle switch that can be turned on and off.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Toggle({...props}) => <The created toggle switch>\n",
      ),
    ),
    H4(
      "Example",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/toggle?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, Toggle({\n  size: 2,\n  onColor: \"#4CAF50\"\n}))\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "on",
        ),
        ": Type ",
        Symbol(
          "boolean | State<boolean>",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. A boolean or a boolean-typed ",
        Symbol(
          "State",
        ),
        " object to indicate the status of the toggle. If a ",
        Symbol(
          "State",
        ),
        " object is specified, you can turn on/off the toggle via the specified ",
        Symbol(
          "State",
        ),
        " object with ",
        Symbol(
          "on.val = <true|false>",
        ),
        ", and subscribe to the status change of the toggle via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
      li(
        Symbol(
          "size",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Default ",
        Symbol(
          "1",
        ),
        ". Optional. The size of the toggle. ",
        Symbol(
          "1",
        ),
        " means the height of the toggle is ",
        Symbol(
          "1rem",
        ),
        ".",
      ),
      li(
        Symbol(
          "cursor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "pointer",
        ),
        ". Optional. The ",
        Symbol(
          "cursor",
        ),
        " CSS property of the toggle.",
      ),
      li(
        Symbol(
          "ofColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#ccc\"",
        ),
        ". Optional. The color of the toggle when it's off.",
      ),
      li(
        Symbol(
          "onColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#2196F3\"",
        ),
        ". Optional. The color of the toggle when it's on.",
      ),
      li(
        Symbol(
          "circleColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"white\"",
        ),
        ". Optional. The color of the toggling circle.",
      ),
      li(
        Symbol(
          "toggleClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the toggle. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "toggleStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the toggle.",
      ),
      li(
        Symbol(
          "sliderClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the slider. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "sliderStyleOverrides",
        ),
        ". Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the slider.",
      ),
      li(
        Symbol(
          "circleClass",
        ),
        ". Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the toggling circle. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "circleStyleOverrides",
        ),
        ". Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the toggling circle.",
      ),
      li(
        Symbol(
          "circleWhenOnStyleOverrides",
        ),
        ". Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the toggling circle. Typically this is used to override the ",
        Symbol(
          "transform",
        ),
        " CSS property if the dimensions of the toggle is overridden.",
      ),
    ),
    H3(
      "OptionGroup",
    ),
    p(
      "Creates a group of button-shaped options where only one option can be selected. This is functionally similar to a radio group but with a different appearance.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "OptionGroup({...props}, options) => <The created option group>\n",
      ),
    ),
    p(
      "The ",
      Symbol(
        "options",
      ),
      " parameter is a ",
      Symbol(
        "string[]",
      ),
      " for all the options.",
    ),
    H4(
      "Example",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/option-group?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "const selected = van.state(\"\")\nconst options = [\"Water\", \"Coffee\", \"Juice\"]\n\nvan.add(document.body,\n  p(\"What would you like to drink?\"),\n  OptionGroup({selected}, options),\n  p(() => options.includes(selected.val) ?\n    span(b(\"You selected:\"), \" \", selected) : b(\"You haven't selected anything.\")),\n)\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "selected",
        ),
        ": Type ",
        Symbol(
          "State<string>",
        ),
        ". Required. A ",
        Symbol(
          "State",
        ),
        " object for the currently selected option. You can change the selected option with ",
        Symbol(
          "selected.val = <option string>",
        ),
        ", and subscribe to the selection change via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
      li(
        Symbol(
          "normalColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#e2eef7\"",
        ),
        ". Optional. The color of the option when it's not selected or hovered.",
      ),
      li(
        Symbol(
          "hoverColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#c1d4e9\"",
        ),
        ". Optional. The color of the option when it's hovered.",
      ),
      li(
        Symbol(
          "selectedColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#90b6d9\"",
        ),
        ". Optional. The color of the option when it's selected.",
      ),
      li(
        Symbol(
          "selectedHoverColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"#7fa5c8\"",
        ),
        ". Optional. The color of the option when it's selected and hovered.",
      ),
      li(
        Symbol(
          "fontColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"black\"",
        ),
        ". Optional. The font color of the options.",
      ),
      li(
        Symbol(
          "transitionSec",
        ),
        ": Type ",
        Symbol(
          "number",
        ),
        ". Default ",
        Symbol(
          "0.3",
        ),
        ". Optional. The duration of the transition when the options change color.",
      ),
      li(
        Symbol(
          "optionGroupClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the entire option group. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "optionGroupStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the entire option group.",
      ),
      li(
        Symbol(
          "optionClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the options. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "optionStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the options.",
      ),
    ),
    H3(
      "Banner",
    ),
    p(
      "Creates a banner element for the current container.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Banner({...props}, ...children) => <The created banner element>\n",
      ),
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/banner?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body,\n  h2(\"Sticky Banner\"),\n  div({style: \"width: 300px; height: 200px; overflow-y: auto; border: 1px solid #000;\"},\n    Banner({sticky: true}, \"👋Hello 🗺️World\"),\n    div({style: \"padding: 0 10px\"}, Array.from({length: 10}).map((_, i) => p(\"Line \", i))),\n  ),\n  h2(\"Non-sticky Banner\"),\n  div({style: \"width: 300px; height: 200px; overflow-y: auto; border: 1px solid #000;\"},\n    Banner({sticky: false}, \"👋Hello \", a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n    div({style: \"padding: 0 10px\"}, Array.from({length: 10}).map((_, i) => p(\"Line \", i))),\n  ),\n)\n",
      ),
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "backgroundColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "#fff1a8",
        ),
        ". Optional. The background color of the banner.",
      ),
      li(
        Symbol(
          "fontColor",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "currentcolor",
        ),
        ". Optional. The font color of the banner.",
      ),
      li(
        Symbol(
          "sticky",
        ),
        ": Type ",
        Symbol(
          "boolean",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. Whether the banner is sticky on the top.",
      ),
      li(
        Symbol(
          "bannerClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the created banner element. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "bannerStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the created banner element.",
      ),
    ),
    H3(
      "FloatingWindow",
    ),
    p(
      em(
        "Author: ",
        Link(
          "@Duffscs",
          "https://github.com/Duffscs",
        ),
      ),
    ),
    p(
      "Creates a movable and resizable floating window.",
    ),
    H4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "FloatingWindow({...props}, ...children) => <The created floating window>\n",
      ),
    ),
    H4(
      "Examples",
    ),
    p(
      "Preview with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/window?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    p(
      "Window with custom close button:",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\nconst width = van.state(300), height = van.state(220)\n\nvan.add(document.body, FloatingWindow(\n  {title: \"Example Window 1\", closed, width, height, closeCross: null},\n  div({style: \"display: flex; flex-direction: column; justify-content: center;\"},\n    p(\"Hello, World!\"),\n    button({onclick: () => width.val *= 2}, \"Double Width\"),\n    button({onclick: () => height.val *= 2}, \"Double Height\"),\n    button({onclick: () => closed.val = true}, \"Close Window\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Window with integrated close button:",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, FloatingWindow(\n  {title: \"Example Window 2\", x: 150, y: 150, headerColor: \"lightblue\"},\n  div({style: \"display: flex; justify-content: center;\"},\n    p(\"This is another floating window!\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Close button with custom appearance:",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, FloatingWindow(\n  {\n    title: \"Example Window 3\", x: 175, y: 175, closeCross: \"❌\",\n    crossHoverStyleOverrides: {\"background-color\": \"white\"},\n  },\n  div({style: \"display: flex; justify-content: center;\"},\n    p(\"This is a floating window with custom cross button!\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Window with ",
      Symbol(
        "Tabs",
      ),
      ":",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\n\nvan.add(document.body, FloatingWindow(\n  {\n    closed, x: 200, y: 200, width: 500, height: 300,\n    childrenContainerStyleOverrides: { padding: 0 },\n  },\n  div(\n    span({\n      class: \"vanui-window-cross\",\n      style: \"position: absolute; top: 8px; right: 8px;cursor: pointer;\",\n      onclick: () => closed.val = true,\n    }, \"×\"),\n    Tabs(\n      {\n        style: \"width: 100%;\",\n        tabButtonActiveColor: \"white\",\n        tabButtonBorderStyle: \"none\",\n        tabButtonRowColor: \"lightblue\",\n        tabButtonRowStyleOverrides: {height: \"2.5rem\"},\n        tabButtonStyleOverrides: {height: \"100%\"},\n      },\n      {\n        Home: p(\n          \"Welcome to \", b(\"VanJS\"), \" - the smallest reactive UI framework in the world.\",\n        ),\n        \"Getting Started\": [\n          p(\"To install the \", b(\"VanJS\"), \" NPM package, run the line below:\"),\n          pre(code(\"npm install vanjs-core\")),\n        ],\n        About: p(\n          \"The author of \", b(\"VanJS\"), \" is \",\n          a({href: \"https://github.com/Tao-VanJS\"}, \" Tao Xin\"), \".\"\n        ),\n      },\n    )\n  )\n))\n",
      ),
    ),
    p(
      "Window without header or integrated close button:",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\n\nvan.add(document.body, FloatingWindow(\n  {\n    closed, x: 300, y: 300, width: 500, height: 300,\n    windowStyleOverrides: {\"background-color\": \"lightgray\"},\n    childrenContainerStyleOverrides: {\n      display: \"flex\",\n      \"align-items\": \"center\",\n      \"justify-content\": \"center\",\n      height: \"100%\",\n    }\n  },\n  button({onclick: () => closed.val = true}, \"Close Window\"),\n))\n",
      ),
    ),
    p(
      "Window showing z-index:",
    ),
    pre(
      code({class: "language-ts"},
        "const zIndex = van.state(1)\n\nvan.add(document.body, FloatingWindow(\n  {title: [\"z-index: \", zIndex], x: 200, y: 200, width: 300, height: 100, zIndex},\n))\n",
      ),
    ),
    p(
      "Window with custom stacking:",
    ),
    pre(
      code({class: "language-ts"},
        "const zIndex = van.state(1)\n\nvan.add(document.body, FloatingWindow(\n  {title: \"Custom stacking\", x: 300, y: 300, customStacking: true, zIndex},\n  div({style: \"display: flex; justify-content: space-between;\"},\n    button({onclick: () => zIndex.val++}, \"+\"),\n    p(\"z-index: \", zIndex),\n    button({onclick: () => zIndex.val--}, \"-\"),\n  ),\n  div({style: \"display: flex; justify-content: center;\"},\n    button({onclick: () => zIndex.val = topMostZIndex()}, \"Bring to Front\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Non-movable window:",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, FloatingWindow(\n  {title: \"Not Movable\", disableMove: true},\n  div({style: \"display: flex; justify-content: center;\"},\n    p(\"This window is not movable!\"),\n  ),\n))\n",
      ),
    ),
    p(
      "Non-movable window without title:",
    ),
    pre(
      code({class: "language-ts"},
        "const closed = van.state(false)\n\nvan.add(document.body, FloatingWindow(\n  {closed, x: 150, y: 150, disableMove: true},\n  div(\n    p(\"This window is not movable!\"),\n    p({style: \"display: flex; justify-content: center;\"},\n      button({onclick: () => closed.val = true}, \"Close\")\n    ),\n  ),\n))\n",
      ),
    ),
    p(
      "Non-resizable window:",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, FloatingWindow(\n  {title: \"Not Resizable\", x: 200, y: 200, disableResize: true},\n  div(\n    p({style: \"display: flex; justify-content: center;\"}, \"This window is not resizable!\"),\n  ),\n))\n",
      ),
    ),
    H4(
      "Default ",
      Symbol(
        "z-index",
      ),
      " Stacking",
    ),
    p(
      "By default, the ",
      Symbol(
        "z-index",
      ),
      " CSS property of each window comes from the sequence: ",
      Symbol(
        "1",
      ),
      ", ",
      Symbol(
        "2",
      ),
      ", ",
      Symbol(
        "3",
      ),
      ", ",
      Symbol(
        "...",
      ),
      ". Whenever a new window is created or is interacted with (",
      Symbol(
        "onmousedown",
      ),
      " event is triggered), we assign the ",
      Symbol(
        "z-index",
      ),
      " property of the window to the next number in the sequence. This way, we are making sure that newly created or interacted windows are always brought to the front.",
    ),
    p(
      "You can override the default stacking behavior by specifying ",
      Symbol(
        "{customStacking: true}",
      ),
      " in ",
      Symbol(
        "props",
      ),
      ". This way, you can manually control the ",
      Symbol(
        "z-index",
      ),
      " of the window via a ",
      strong(
        "VanJS",
      ),
      " state.",
    ),
    H4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "title",
        ),
        ": Type ",
        Symbol(
          "ChildDom",
        ),
        ". Optional. One ",
        Symbol(
          "ChildDom",
        ),
        " or multiple ",
        Symbol(
          "ChildDom",
        ),
        " as an ",
        Symbol(
          "Array",
        ),
        " for the title of the created window. If not specified, the window won't have a title.",
      ),
      li(
        Symbol(
          "closed",
        ),
        ": Type ",
        Symbol(
          "State<boolean>",
        ),
        ". Optional. If specified, the created window can be closed via the ",
        Symbol(
          "closed",
        ),
        Symbol(
          "State",
        ),
        " object with ",
        Symbol(
          "closed.val = true",
        ),
        ". You can also subscribe the closing event of the created window via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ".",
      ),
      li(
        Symbol(
          "x",
        ),
        ": Type ",
        Symbol(
          "number | State<number>",
        ),
        ". Default ",
        Symbol(
          "100",
        ),
        ". Optional. The x-coordinate of the created window, in pixels.",
      ),
      li(
        Symbol(
          "y",
        ),
        ": Type ",
        Symbol(
          "number | State<number>",
        ),
        ". Default ",
        Symbol(
          "100",
        ),
        ". Optional. The y-coordinate of the created window, in pixels.",
      ),
      li(
        Symbol(
          "width",
        ),
        ": Type ",
        Symbol(
          "number | State<number>",
        ),
        ". Default ",
        Symbol(
          "300",
        ),
        ". Optional. The width of the created window, in pixels.",
      ),
      li(
        Symbol(
          "height",
        ),
        ": Type ",
        Symbol(
          "number | State<number>",
        ),
        ". Default ",
        Symbol(
          "200",
        ),
        ". Optional. The height of the created window, in pixels.",
      ),
      li(
        Symbol(
          "closeCross",
        ),
        ": Type ",
        Symbol(
          "ChildDom",
        ),
        ". Default ",
        Symbol(
          "\"×\"",
        ),
        ". Optional. One ",
        Symbol(
          "ChildDom",
        ),
        " or multiple ",
        Symbol(
          "ChildDom",
        ),
        " as an ",
        Symbol(
          "Array",
        ),
        " for the close button of the created window. If its value is ",
        Symbol(
          "null",
        ),
        ", there won't be a close button. If ",
        Symbol(
          "title",
        ),
        " property is not specified, this property will be ignored and there won't be a close button.",
      ),
      li(
        Symbol(
          "customStacking",
        ),
        ": type ",
        Symbol(
          "boolean",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. If ",
        Symbol(
          "true",
        ),
        ", ",
        Link(
          "default ",
          Symbol(
            "z-index",
          ),
          " stacking rule",
          "#default-z-index-stacking",
        ),
        " won't be triggered. Users are expected to manually set the ",
        Symbol(
          "z-index",
        ),
        " property of the created window via the ",
        Symbol(
          "State",
        ),
        " object for ",
        Symbol(
          "z-index",
        ),
        " property below.",
      ),
      li(
        Symbol(
          "zIndex",
        ),
        ": type ",
        Symbol(
          "number | State<number>",
        ),
        ". Optional. If a ",
        Symbol(
          "State",
        ),
        " object is specified, you can use the ",
        Symbol(
          "State",
        ),
        " object to track the change of ",
        Symbol(
          "z-index",
        ),
        " property via ",
        Link(
          Symbol(
            "van.derive",
          ),
          "https://vanjs.org/tutorial#api-derive",
        ),
        ". If ",
        Symbol(
          "customTracking",
        ),
        " is ",
        Symbol(
          "true",
        ),
        ", you can use this property to manually set the ",
        Symbol(
          "z-index",
        ),
        " property of the created window.",
      ),
      li(
        Symbol(
          "disableMove",
        ),
        ": type ",
        Symbol(
          "boolean",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. If ",
        Symbol(
          "true",
        ),
        ", the created window can't be moved.",
      ),
      li(
        Symbol(
          "disableResize",
        ),
        ": type ",
        Symbol(
          "boolean",
        ),
        ". Default ",
        Symbol(
          "false",
        ),
        ". Optional. If ",
        Symbol(
          "true",
        ),
        ", the created window can't be resized.",
      ),
      li(
        Symbol(
          "headerColor",
        ),
        ": type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"lightgray\"",
        ),
        ". Optional. The background color of the window header (title bar).",
      ),
      li(
        Symbol(
          "windowClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the created window. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "windowStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the created window.",
      ),
      li(
        Symbol(
          "headerClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the window header (title bar). You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "headerStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the window header (title bar).",
      ),
      li(
        Symbol(
          "childrenContainerClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the container for ",
        Symbol(
          "children",
        ),
        " DOM nodes. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "childrenContainerStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the container of ",
        Symbol(
          "children",
        ),
        " DOM nodes.",
      ),
      li(
        Symbol(
          "crossClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the close button. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "crossStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the close button.",
      ),
      li(
        Symbol(
          "crossHoverClass",
        ),
        ": Type ",
        Symbol(
          "string",
        ),
        ". Default ",
        Symbol(
          "\"\"",
        ),
        ". Optional. The ",
        Symbol(
          "class",
        ),
        " attribute of the close button when it's hovered over. You can specify multiple CSS classes separated by ",
        Symbol(
          "\" \"",
        ),
        ".",
      ),
      li(
        Symbol(
          "crossStyleOverrides",
        ),
        ": Type ",
        Symbol(
          "Record<string, string | number>",
        ),
        ". Default ",
        Symbol(
          "{}",
        ),
        ". Optional. A ",
        Link(
          "property bag",
          "#property-bag-for-style-overrides",
        ),
        " for the styles you want to override for the close button when it's hovered over.",
      ),
    ),
    H3(
      "Property Bag for Style Overrides",
    ),
    p(
      "In the API of ",
      strong(
        "VanUI",
      ),
      ", you can specify an object as a property bag to override the styles of the created elements. The keys of the property bag are CSS property names, and the values of the property bag are CSS property values. Sample values of the property bag:",
    ),
    pre(
      code({class: "language-js"},
        "{\n  \"z-index\": 1000,\n  \"background-color\": \"rgba(0,0,0,.8)\",\n}\n",
      ),
    ),
    pre(
      code({class: "language-js"},
        "{\n  \"border-radius\": \"0.2rem\",\n  padding: \"0.8rem\",\n  \"background-color\": \"yellow\",\n}\n",
      ),
    ),
  )
}
