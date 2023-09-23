// THIS FILE IS GENERATED AUTOMATICALLY BY https://github.com/vanjs-org/vanjs-org.github.io/tree/master/codegen/gen-code.ts
// DO NOT MODIFY THIS FILE MANUALLY

import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {code, div, h4, li, p, pre, strong, ul}} = van.vanWithDoc(doc)
  const {H1, H2, H3, Link, Symbol} = common(doc)
  return div({id: "content"},
    H1(
      strong(
        "VanUI",
      ),
      ": A Collection of Grab 'n Go Reusable UI Components for VanJS",
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
    p(
      "The library is published as NPM package ",
      Link(
        "vanjs-ui",
        "https://www.npmjs.com/package/vanjs-ui",
      ),
      ".",
    ),
    p(
      "Run the following command to install the package:",
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
    H2(
      "Documentation",
    ),
    p(
      "The following UI components has been implemented so far:",
    ),
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
    ),
    H3(
      "Modal",
    ),
    p(
      "Creates a modal window on top of the current page.",
    ),
    h4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Modal({...props}, ...children) => <The created modal window>\n",
      ),
    ),
    h4(
      "Examples",
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
    p(
      "You can live preview the examples with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/modal?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    h4(
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
        " will close the created modal window.",
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
          "object",
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
          "object",
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
    h4(
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
        "ChildDom | ChildDom[]",
      ),
      ") are the DOM element(s) for the tab contents.",
    ),
    h4(
      "Example",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, Tabs(\n  {\n    style: \"max-width: 500px;\",\n    tabButtonActiveColor: \"white\",\n    tabButtonBorderStyle: \"none\",\n    tabButtonRowStyleOverrides: {\n      \"padding-left\": \"12px\",\n    },\n  },\n  {\n    Home: p(\n      \"Welcome to \", b(\"VanJS\"), \" - the smallest reactive UI framework in the world.\",\n    ),\n    \"Getting Started\": [\n      p(\"To install the \", b(\"VanJS\"), \" NPM package, run the line below:\"),\n      pre(code(\"npm install vanjs-core\")),\n    ],\n    About: p(\n      \"The author of \", b(\"VanJS\"), \" is \",\n      a({href: \"https://github.com/Tao-VanJS\"}, \" Tao Xin\"), \".\"\n    ),\n  },\n))\n",
      ),
    ),
    p(
      "You can live preview the example with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tabs?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    h4(
      "Property Reference",
    ),
    ul(
      li(
        Symbol(
          "activeTab",
        ),
        ": Type ",
        Symbol(
          "State<string> | undefined",
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
          "object",
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
          "object",
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
          "object",
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
    h4(
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
    h4(
      "Examples",
    ),
    pre(
      code({class: "language-ts"},
        "const board = new MessageBoard({top: \"20px\"})\n\nconst example1 = () => board.show({message: \"Hi!\", durationSec: 1})\nconst example2 = () => board.show(\n  {message: [\"Welcome to \", a({href: \"https://vanjs.org/\", style: \"color: #0099FF\"}, \"🍦VanJS\"), \"!\"], closer: \"❌\"})\n\nconst closed = van.state(false)\nconst example3 = () => {\n  closed.val = false\n  board.show({message: \"Press ESC to close this message\", closed})\n}\ndocument.addEventListener(\"keydown\", e => e.key === \"Escape\" && (closed.val = true))\n",
      ),
    ),
    p(
      "You can live preview the examples with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/message?file=/src/main.ts",
      ),
      ".",
    ),
    h4(
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
          "object",
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
          "object",
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
          "object",
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
          "ChildDom | readonly ChildDom[]",
        ),
        ". Required. One or more ",
        Symbol(
          "ChildDom",
        ),
        " for the message we want to show.",
      ),
      li(
        Symbol(
          "closer",
        ),
        ": Type ",
        Symbol(
          "ChildDom | readonly ChildDom[]",
        ),
        ". Optional. If specified, we will render a closer DOM node with one or more ",
        Symbol(
          "ChildDom",
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
        ".",
      ),
    ),
    H3(
      "Tooltip",
    ),
    p(
      "Creates a tooltip above a DOM node which typically shows when the DOM node is being hovered.",
    ),
    h4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Tooltip({...props}) => <The created tooltip element>\n",
      ),
    ),
    h4(
      "Examples",
    ),
    pre(
      code({class: "language-ts"},
        "const tooltip1Show = van.state(false)\nconst tooltip2Show = van.state(false)\nconst count = van.state(0)\nconst tooltip2Text = van.derive(() => `Count: ${count.val}`)\nconst tooltip3Show = van.state(false)\n\nvan.add(document.body,\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip1Show.val = true,\n    onmouseleave: () => tooltip1Show.val = false,\n  }, \"Normal Tooltip\", Tooltip({text: \"Hi!\", show: tooltip1Show})), \" \",\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip2Show.val = true,\n    onmouseleave: () => tooltip2Show.val = false,\n    onclick: () => ++count.val\n  }, \"Increment Counter\", Tooltip({text: tooltip2Text, show: tooltip2Show})), \" \",\n  button({\n    style: \"position: relative;\",\n    onmouseenter: () => tooltip3Show.val = true,\n    onmouseleave: () => tooltip3Show.val = false,\n  }, \"Slow Fade-in\", Tooltip({text: \"Hi from the sloth!\", show: tooltip3Show, fadeInSec: 5})),\n)\n",
      ),
    ),
    p(
      "You can live preview the examples with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/tooltip?file=/src/main.ts:1,1",
      ),
      ".",
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
    h4(
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
          "object",
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
          "object",
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
    h4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Toggle({...props}) => <The created toggle switch>\n",
      ),
    ),
    h4(
      "Example",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body, Toggle({\n  size: 2,\n  onColor: \"#4CAF50\"\n}))\n",
      ),
    ),
    p(
      "You can live preview the example with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/toggle?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    h4(
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
          "object",
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
          "object",
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
          "object",
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
          "object",
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
    h4(
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
    h4(
      "Example",
    ),
    pre(
      code({class: "language-ts"},
        "const selected = van.state(\"\")\nconst options = [\"Water\", \"Coffee\", \"Juice\"]\n\nvan.add(document.body,\n  p(\"What would you like to drink?\"),\n  OptionGroup({selected}, options),\n  p(() => options.includes(selected.val) ?\n    span(b(\"You selected:\"), \" \", selected) : b(\"You haven't selected anything.\")),\n)\n",
      ),
    ),
    p(
      "You can live preview the example with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/option-group?file=%2Fsrc%2Fmain.ts%3A1%2C1",
      ),
      ".",
    ),
    h4(
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
          "object",
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
          "object",
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
    h4(
      "Signature",
    ),
    pre(
      code({class: "language-js"},
        "Banner({...props}, ...children) => <The created banner element>\n",
      ),
    ),
    h4(
      "Examples",
    ),
    pre(
      code({class: "language-ts"},
        "van.add(document.body,\n  h2(\"Sticky Banner\"),\n  div({style: \"width: 300px; height: 200px; overflow-y: auto; border: 1px solid #000;\"},\n    Banner({sticky: true}, \"👋Hello 🗺️World\"),\n    div({style: \"padding: 0 10px\"}, Array.from({length: 10}).map((_, i) => p(\"Line \", i))),\n  ),\n  h2(\"Non-sticky Banner\"),\n  div({style: \"width: 300px; height: 200px; overflow-y: auto; border: 1px solid #000;\"},\n    Banner({sticky: false}, \"👋Hello \", a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n    div({style: \"padding: 0 10px\"}, Array.from({length: 10}).map((_, i) => p(\"Line \", i))),\n  ),\n)\n",
      ),
    ),
    p(
      "You can live preview the examples with ",
      Link(
        "CodeSandbox",
        "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/components/examples/banner?file=/src/main.ts:1,1",
      ),
      ".",
    ),
    h4(
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
          "object",
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
