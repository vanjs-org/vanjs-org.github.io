import common from "../common"
import fsp from "fs/promises"
import type { VanObj } from "../type"

export default async (van: VanObj) => {
  const {tags: {b, br, div, li, p, span, ul}} = van
  const {ApiTable, Demo, H1, H2, H3, InlineHtml, InlineJs, Js, Link, Quote, Symbol, SymLink, VanJS, jsFiddle} = common(van)

  const codes = {
    state: await fsp.readFile("src/template/tutorial/state.code.js", "utf-8"),
    derivedState: await fsp.readFile("src/template/tutorial/derived-state.code.js", "utf-8"),
    effect: await fsp.readFile("src/template/tutorial/effect.code.js", "utf-8"),
    escapeDerivedProp: await fsp.readFile("src/template/tutorial/escape-derived-prop.code.js", "utf-8"),
    fontPreview: await fsp.readFile("src/template/tutorial/font-preview.code.js", "utf-8"),
    nonStateDeps: await fsp.readFile("src/template/tutorial/nonstate-deps.code.js", "utf-8"),
    statefulBinding: await fsp.readFile("src/template/tutorial/stateful-binding.snippet.js", "utf-8"),

    hello: `const {a, div, li, p, ul} = van.tags

const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())`,
    smiley: `const {circle, path, svg} = van.tagsNS("http://www.w3.org/2000/svg")

const Smiley = () => svg({width: "16px", viewBox: "0 0 50 50"},
  circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
  circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
  circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
  path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
)

van.add(document.body, Smiley())`,
    euler: `const {math, mi, mn, mo, mrow, msup} = van.tagsNS("http://www.w3.org/1998/Math/MathML")

const Euler = () => math(
  msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"),
)

van.add(document.body, Euler())`,
list: `const {li, ul} = van.tags

const List = ({items}) => ul(items.map(it => li(it)))

van.add(document.body, List({items: ["Item 1", "Item 2", "Item 3"]}))`,
    table: `const {table, tbody, thead, td, th, tr} = van.tags

const Table = ({head, data}) => table(
  head ? thead(tr(head.map(h => th(h)))) : [],
  tbody(data.map(row => tr(
    row.map(col => td(col)),
  ))),
)

van.add(document.body, Table({
  head: ["ID", "Name", "Country"],
  data: [
    [1, "John Doe", "US"],
    [2, "Jane Smith", "CA"],
    [3, "Bob Johnson", "AU"],
  ],
}))`,
    onclick: `button({onclick: () => alert("Hello from 🍦VanJS")}, "Hello")`,
    connectedProps: `const {input, span} = van.tags

const ConnectedProps = () => {
  const text = van.state("")
  return span(
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
  )
}

van.add(document.body, ConnectedProps())`,
    timer: `const {button, span} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Timer = ({totalSecs}) => {
  const secs = van.state(totalSecs)
  return span(
    secs, "s ",
    button({onclick: async () => {
      while (secs.val > 0) await sleep(1000), --secs.val
      await sleep(10) // Wait briefly for DOM update
      alert("⏰: Time is up")
      secs.val = totalSecs
    }}, "Start"),
  )
}

van.add(document.body, Timer({totalSecs: 5}))`,
    sortedList: `const {input, li, option, select, span, ul} = van.tags

const SortedList = () => {
  const items = van.state("a,b,c"), sortedBy = van.state("Ascending")
  return span(
    "Comma-separated list: ",
    input({oninput: e => items.val = e.target.value,
      type: "text", value: items}), " ",
    select({oninput: e => sortedBy.val = e.target.value, value: sortedBy},
      option({value: "Ascending"}, "Ascending"),
      option({value: "Descending"}, "Descending"),
    ),
    // A State-derived child node
    () => sortedBy.val === "Ascending" ?
      ul(items.val.split(",").sort().map(i => li(i))) :
      ul(items.val.split(",").sort().reverse().map(i => li(i))),
  )
}

van.add(document.body, SortedList())`,
    editableList: `const {a, button, div, input, li, ul} = van.tags

const ListItem = ({text}) => {
  const deleted = van.state(false)
  return () => deleted.val ? null : li(
    text, a({onclick: () => deleted.val = true}, "❌"),
  )
}

const EditableList = () => {
  const listDom = ul()
  const textDom = input({type: "text"})
  return div(
    textDom, " ",
    button({onclick: () => van.add(listDom, ListItem({text: textDom.value}))}, "➕"),
    listDom,
  )
}

van.add(document.body, EditableList())`
  }

  return div({id: "content"},
    H1(VanJS(), ": Tutorial and API Reference"),
    Quote({text: ["Entia non sunt multiplicanda praeter necessitatem", br(), "(The best solution is usually the one with the least unnecessary complexity)"], source: "Occam's Razor"}),
    p("In this tutorial, we will break down into 3 core functionalities ", VanJS(), " supports: DOM composition / manipulation, State and State binding."),
    H2({id: "dom"}, "DOM Composition and Manipulation"),
    H3("Your first VanJS app: a simple ", Symbol("Hello"), " page"),
    p("We will start this tutorial with a simple ", Symbol("Hello"), " page, with the code below:"),
    Js(codes.hello),
    jsFiddle({id: "hello", code: codes.hello}),
    p("The code should be self-explanatory if you have some familiarity with HTML. Unlike React, everything in the code above is just pure JavaScript, meaning that you are simply calling functions from ", Symbol("van.js"), " without any transpiling that converts your source code into another form. Reusable UI components built with ", VanJS(), " can be pure vanilla JavaScript functions as well. Here we capitalize the first letter to follow React conventions."),
    p("Also unlike React, ", VanJS(), " does not introduce an ad-hoc virtual DOM layer. All the tag functions above directly return the created DOM objects. e.g.: the function call ", Symbol('p("👋Hello")'), " simply creates an ", SymLink("HTMLParagraphElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement"), " with ", Symbol("👋Hello"), " as its ", SymLink("innerText", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText"), ", meaning that you can directly interact with your created DOM nodes with native DOM APIs."),
    p("💡 ", b("Tip"), ": If you are tired of adding all the tag function names manually in the importing line:"),
    Js("const {a, div, li, p, ul} = van.tags"),
    p("we have built a ", Link("VS Code extension", "https://marketplace.visualstudio.com/items?itemName=TaoXin.vanjs-importtag"), " with the command that can automatically import the tag function at the cursor. You can check out its ", Link("GitHub repo", "https://github.com/vanjs-org/vanjs-importtag"), " for more details."),
    H3({id: "api-tags"}, "API reference: ", Symbol("van.tags")),
    p(Symbol("van.tags"), " is a top-level dynamic object in ", VanJS(), " implemented with ", SymLink("Proxy", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"), ". ", Symbol("van.tags.<name>"), " gets you a function that creates an HTML element with tag name ", Symbol("<name>"), ". A common way of using ", Symbol("van.tags"), " is like the line below:"),
    Js(`const {a, div, p} = van.tags`),
    p("With the line, ", Symbol("a"), ", ", Symbol("div"), ", ", Symbol("p"), " are functions that create ", InlineHtml("<a>"), ", ", InlineHtml("<div>"), ", ", InlineHtml("<p>"), " HTML elements respectively."),
    p("We will use ", Symbol("div"), " function as an example, the API reference for ", Symbol("div"), " tag function is as below:"),
    ApiTable({
      signature: "div([props], ...children) => <the created DOM element>",
      description: ["Creates an ", SymLink("HTMLDivElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement"), " with ", Symbol("props"), " as its properties and ", Symbol("children"), " as its child nodes."],
      parameters: {
        props: ["optional, a plain JavaScript object whose keys and values are the keys and values of the properties of the created HTML element. Keys should be ", Symbol("string"), ", and each value can be a primitive (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"), "), ", Symbol("null"), ", a primitive-valued or ", Symbol("null"), "-valued ", Symbol("State"), " object, or a ", Symbol("function"), " for a ", Symbol("State"), "-derived property. We will explain the behavior of ", Link(Symbol("State"), "-typed", "#state-typed-prop"), " and ", Link(Symbol("State"), "-derived", "#state-derived-prop"), " properties in State Binding section below. For keys like ", Symbol("on..."), ", the value should be a ", Symbol("function"), " to represent the event handler."],
        children: ["caller can provide 0 or more children as arguments to represent the child nodes of the created HTML element. Each child can be a valid DOM node, a primitive (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"), "), ", Symbol("null"), ", ", Symbol("undefined"), ", a primitive-valued or ", Symbol("null"), "/", Symbol("undefined"), "-valued ", Symbol("State"), " object, a ", Symbol("function"), " for a ", Symbol("State"), "-derived child, or an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " of children. ", Symbol("null"), "/", Symbol("undefined"), "-valued children will be ignored. A ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for each primitive-typed argument. We will explain the behavior of ", Link(Symbol("State"), "-typed child", "#state-typed-child"), " and ", Link(Symbol("State"), "-derived child", "#state-derived-child"), " in State Binding section below. For DOM node, it shouldn't be already connected to a document tree (", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), "). i.e.: You should not declare an existing DOM node in the current document as the child node of the newly created element."],
      },
      returns: ["The ", SymLink("HTMLDivElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement"), " object just created."],
    }),
    H3("SVG and MathML Support"),
    p("HTML elements with ", SymLink("namespace URI", "https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/glossary.html#dt-namespaceURI"), " can be created via ", SymLink("van.tagsNS", "#api-tagsns"), ", a variant of ", Symbol("van.tags"), " that allows you to specify the ", Symbol("namespaceURI"), " of the created elements. Here is an example of composing the SVG DOM tree with ", Symbol("van.tagsNS"), ":"),
    Js(codes.smiley),
    p(Demo(), " ", span({id: "demo-smiley"})),
    jsFiddle({id: "smiley", code: codes.smiley}),
    p("Similarly, math formulas can be created with ", SymLink("MathML", "https://developer.mozilla.org/en-US/docs/Web/MathML/Element"), " elements via ", Symbol("van.tagsNS"), ":"),
    Js(codes.euler),
    p(Demo(), " ", span({id: "demo-euler"})),
    jsFiddle({id: "euler", code: codes.euler}),
    H3({id: "api-tagsns"}, "API reference: ", Symbol("van.tagsNS")),
    ApiTable({
      signature: "van.tagsNS(namespaceURI) => <the created tags object for elements with specified namespaceURI>",
      description: ["Creates a tags ", SymLink("Proxy", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"), " object similar to ", SymLink("van.tags", "#api-tags"), " for elements with specified ", Symbol("namespaceURI"), "."],
      parameters: {namespaceURI: ["a string for the ", Symbol("namespaceURI"), " property of elements created via tag functions."]},
      returns: "The created tags object.",
    }),
    H3({id: "api-add"}, "API reference: ", Symbol("van.add")),
    p(Symbol("van.add"), " function is similar to tag functions described above. Instead of creating a new HTML element with specified properties and children, ", Symbol("van.add"), " function mutates its first argument (which is an existing ", SymLink("Element node", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"), ") by appending 0 or more children with ", SymLink("appendChild", "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild"), " calls:"),
    ApiTable({
      signature: "van.add(dom, ...children) => dom",
      description: ["Mutates ", Symbol("dom"), " by appending 0 or more child nodes to it. Returns  ", Symbol("dom"), " for possibly further chaining."],
      parameters: {
        dom: "an existing DOM element that we want to append children to.",
        children: ["caller can provide 0 or more ", Symbol("children"), " as arguments to represent the child nodes we want to append to ", Symbol("dom"), ". Each child can be a valid DOM node, a primitive, ", Symbol("null"), ", ", Symbol("undefined"), ", a primitive-valued or ", Symbol("null"), "/", Symbol("undefined"), "-valued ", Symbol("State"), " object, a ", Symbol("function"), " for a ", Symbol("State"), "-derived child, or an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " of children. ", Symbol("null"), "/", Symbol("undefined"), "-valued children will be ignored. A ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for each primitive-typed argument. ", Link(Symbol("State"), "-typed child", "#state-typed-child"), " and ", Link(Symbol("State"), "-derived child", "#state-derived-child"), " behave the same way as in tag function. For DOM node, it shouldn't be already connected to a document tree (", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), "). i.e.: You should not append an existing DOM node in the current document to ", Symbol("dom"), ". If 0 children is provided, this function is a no-op."],
      },
      returns: Symbol("dom"),
    }),
    H3("DOM nodes already in the document tree can't be used as ", Symbol("children")),
    p("As mentioned in the API reference, if a DOM node is already connected to the document tree, it shouldn't be used as the child node of tag function or ", Symbol("van.add"), ". The following code is invalid and an ", SymLink("Error", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error"), " will be thrown when ", Symbol("van-<version>.debug.js"), " is being used:"),
    Js(`const existing = document.getElementById("some-id")

// Invalid! Existing node can't be used as the child node of tag function.
const dom = div({id: "new-id"}, existing)

// Invalid! Existing node can't be appended to other nodes in \`van.add\`.
van.add(document.body, existing)`),
    H3({id: "fun-dom"}, "Functional-style DOM tree building"),
    p("Because both tag functions and ", Symbol("van.add"), " can take ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " arguments and the ", Symbol("Array"), " arguments can be deeply nested. ", VanJS(), " enables very ergonomic DOM tree composition in functional-style. See examples below:"),
    p("Building a bullet list:"),
    Js(codes.list),
    jsFiddle({id: "list", code: codes.list}),
    p("Building a table:"),
    Js(codes.table),
    jsFiddle({id: "table", code: codes.table}),
    H3(Symbol("on..."), " event handlers"),
    p("In tag functions, you can provide a ", Symbol("function"), " value for property keys like ", Symbol("on..."), ". This is a convenient way to specify event handlers. For instance, the code below creates a ", SymLink("button", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"), " that shows an alert whenever clicked:"),
    Js(codes.onclick),
    jsFiddle({
      id: "onclick",
      "data-prefix": "const {button} = van.tags",
      "data-replace-code": "van.add(document.body, $CODE)\n",
      code: codes.onclick,
    }),
    p("🎉 Congratulations! You have mastered the skills for building and manipulating DOM trees using ", VanJS(), "'s declarative API, which is incredibly powerful for creating comprehensive applications with elegant code. In the sections below, you will continue to learn how to build reactive applications with state and state binding."),
    p("If your application doesn't rely on state and state binding, you can use the slimmed-down version of ", VanJS(), " - ", Link("Mini-Van", "/minivan"), "."),
    H2("State"),
    p("A ", Symbol("State"), " object in ", VanJS(), " represents a value that can be updated throughout your application. A ", Symbol("State"), " object has a public property ", Symbol("val"), ", with a ", Link("custom setter", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set"), " that automatically propagates changes to DOM nodes that are bound to it."),
    p("The code below illustrates how a ", Symbol("State"), " object can be used:"),
    Js(codes.state),
    p(Demo()),
    p({id: "demo-state"}),
    jsFiddle({id: "state", code: codes.state}),
    H3({id: "api-state"}, "API reference: ", Symbol("van.state")),
    ApiTable({
      signature: "van.state(initVal) => <the created State object>",
      description: ["Creates a ", Symbol("State"), " object with its init value specified in the argument."],
      parameters: {
        initVal: ["the init value of the ", Symbol("State"), " object to be created."],
      },
      returns: ["The created ", Symbol("State"), " object."],
    }),
    H3("Public interface of ", Symbol("State"), " objects"),
    ul(
     li("Property ", Symbol(b("val")), " - the current value of the ", Symbol("State"), " object. When a new value of this property is set, all ", Link("derived states", "#derived-state"), " and ", Link("side effects", "#side-effect"), " registered via ", SymLink("van.derive", "#api-derive"), " and all DOM nodes that are bound to it will be updated accordingly."),
     li("Readonly property ", Symbol(b("oldVal")), " - the old value of the ", Symbol("State"), " object prior to the current UI update cycle. This property might be useful for ", Link("stateful binding", "#stateful-binding"), ".")
    ),
    p("The value of a ", Symbol("State"), " object can be almost anything, primitive, ", SymLink("Object", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"), ", ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), ", ", SymLink("null", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null"), ", etc., with 2 ad-hoc exceptions that we made: The value of the ", Symbol("State"), " object cannot be a DOM node, or another ", Symbol("State"), " object. Having values in these 2 types carries little semantic information and is more likely a result of coding bugs. Thus we disallow ", Symbol("State"), " objects to have values in these 2 types. In ", Symbol("van-{version}.debug.js"), ", an explicit error will be thrown if you try to assign a DOM node or another ", Symbol("State"), " object as the value of a state."),
    p("See also: ", Link("Why can't states have DOM node as values?", "/advanced#why-not-dom-valued-states")),
    H3(Symbol("State.val"), " is immutable"),
    p("While you can update ", Symbol("State"), " objects by setting the ", Symbol("val"), " property, you should never mutate the underlying object of ", Symbol("val"), " itself. Doing so will not trigger the DOM tree update as you would expect and might result in ", Link("undefined behavior", "https://en.wikipedia.org/wiki/Undefined_behavior"), " due to ", Link("aliasing", "https://en.wikipedia.org/wiki/Aliasing_(computing)"), "."),
    H3("Derived state"),
    p("Derived states can be declared via ", Symbol("van.derive"), ", as illustrated in the example below:"),
    Js(codes.derivedState),
    p(Demo(), " ", span({id: "demo-derived-state"})),
    jsFiddle({id: "derived-state", code: codes.derivedState}),
    H3({id: "api-derive"}, "API reference: ", Symbol("van.derive")),
    ApiTable({
      signature: "van.derive(f) => <the created derived state>",
      description: ["Creates a derived ", Symbol("State"), " object based on the derivation function ", Symbol("f"), ". The ", Symbol("val"), " of the derived state is always in sync with the result of ", Symbol("f"), ". i.e.: whenever the ", Symbol("val"), " of its dependency changes, ", Symbol("f"), " will be called to update the ", Symbol("val"), " of the derived state, synchronously."],
      parameters: {
        f: "The derivation function, which takes no parameter and returns a single value.",
      },
      returns: ["The created derived ", Symbol("State"), " object."],
    }),
    H3("Side effect"),
    p(Symbol("van.derive"), " can be used to declare side effects as well. You can discard the return value of ", Symbol("van.derive"), " if you are not interested. The code below is a modified ", Symbol("Counter App"), " which logs the counter to console whenever it changes:"),
    Js(codes.effect),
    jsFiddle({id: "effect", code: codes.effect}),
    p("See also: ", Link("Advanced state derivation", "/advanced#advanced-state-derivation")),
    H2("State Binding"),
    p("Once ", Symbol("State"), " objects are created, we can bind them to DOM nodes in various ways to make your UI reactive to state changes."),
    H3({id: "state-typed-prop"}, Symbol("State"), " objects as properties"),
    p(Symbol("State"), " objects can be used as properties of HTML elements. Similar to ", Symbol("State"), "-based child nodes, the value of the properties will be always in sync with the value of the respective states. When ", Symbol("State"), " objects are used as properties, you need to make sure that the values of the states are always valid property values, i.e.: primitives or ", Symbol("function"), "s (for event handlers)."),
    p("The following code demonstrates 2 ", SymLink("text inputs", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text"), " whose values are always in sync:"),
    Js(codes.connectedProps),
    p(Demo(), " ", span({id: "demo-connected-props"})),
    jsFiddle({id: "connected-props", code: codes.connectedProps}),
    H3({id: "state-typed-child"}, Symbol("State"), " objects as child nodes"),
    p(Symbol("State"), " objects can be used as child nodes in ", SymLink("tag functions", "#api-tags"), " and ", SymLink("van.add", "#api-add"), ", like the ", SymLink("Counter", "/#code-counter"), " example shown in the home page. For a ", Symbol("State"), " object used as a child node, its value needs to be primitive (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"),  "), and a ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for it. The content of the created ", Symbol("Text node"), " will be always in sync with the value of the state."),
    p("The following code shows how to build a simple timer with this feature:"),
    Js(codes.timer),
    p(Demo(), " ", span({id: "demo-timer"})),
    jsFiddle({id: "timer", code: codes.timer}),
    H3({id: "state-derived-prop"}, Symbol("State"), "-derived properties"),
    p(Symbol("State"), "-derived property is a more advanced way to bind a property of an HTML element to one or more underlying ", Symbol("State"), " objects. To declare a ", Symbol("State"), "-derived property, you need to provide a function as the value in ", Symbol("props"), " argument while calling to a ", SymLink("tag function", "#api-tags"), ". The function takes no parameter and return the value of the property. Whenever any dependency of the function changes, the value of the property will be updated accordingly."),
    p("The example below is a live font size and color preview implemented with this feature:"),
    Js(codes.fontPreview),
    p(Demo(), " ", span({id: "demo-font-preview"})),
    jsFiddle({id: "font-preview", code: codes.fontPreview}),
    H3({id: "api-_"}, Symbol("van._(...)"), " to escape ", Symbol("on..."), " event handlers"),
    p("When declaring a ", Symbol("State"), "-derived property for an ", Symbol("on..."), " event handler, you should wrap around the binding function with ", Symbol("van._(...)"), ". Otherwise, the function you provide will be consider as the event handler, rather than the binding function for the ", Symbol("State"), "-derived property. See the example below:"),
    Js(codes.escapeDerivedProp),
    p(Demo(), " ", span({id: "demo-escape-derived-prop"})),
    jsFiddle({id: 'escape-derived-prop', code: codes.escapeDerivedProp}),
    H3({id: "state-derived-child"}, Symbol("State"), "-derived child nodes"),
    p("Similarly, you can bind an HTML node to one or more underlying ", Symbol("State"), " objects. To declare a ", Symbol("State"), "-derived child node, you need to provide a function as the ", Symbol("child"), " argument while calling to a ", SymLink("tag function", "#api-tags"), " or ", SymLink("van.add", "#api-add"), ". The function you provide can return a primitive value (a ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for it) or a DOM node. The following example illustrates this:"),
    Js(codes.sortedList),
    p(Demo()),
    p({id: "demo-sorted-list"}),
    jsFiddle({id: "sorted-list", code: codes.sortedList}),
    H3("Removing a DOM node"),
    p("For ", Symbol("State"), "-derived child nodes, if the binding function returns ", Symbol("null"), " or ", Symbol("undefined"), ", the DOM node will removed. Removed DOM node will never be brought back, even when the binding function would return a non-", Symbol("null"), "/", Symbol("undefined"), " value based on future values of the dependencies."),
    p("The following code illustrates how to build an editable list with this features:"),
    Js(codes.editableList),
    p(Demo()),
    p({id: "demo-editable-list"}),
    jsFiddle({
      id: "editable-list",
      "data-css": "a { cursor: pointer; }\n",
      code: codes.editableList,
    }),
    H3({id: "stateful-binding"}, "Stateful binding"),
    p("While dealing with state updates for ", Symbol("State"), "-derived child node, a user can choose to, instead of regenerating the new version of the DOM node entirely based on new state values, mutate the existing DOM node that is already connected to the document tree based on all the new values and old values of its dependencies. This feature can be used as an optimization to avoid the entire DOM subtree being completely re-rendered."),
    p("The following code is a snippet of the ", Link("auto-complete application", "/demo#auto-complete"), " which leverages this feature to optimize:"),
    Js(codes.statefulBinding),
    p("The piece of code above is building a suggestion list that is reactive to the changes of selection ", Symbol("candidates"), " and ", Symbol("selectedIndex"), ". When selection ", Symbol("candidates"), " change, the ", Symbol("suggestionList"), " needs to be regenerated. However, if only ", Symbol("selectedIndex"), " changes, we only need to update the DOM element to indicate that the new candidate is being selected now, which can be achieved by changing the ", SymLink("classList", "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList"), " of relevant candidate elements."),
    p("To facilitate stateful binding, the binding function takes the ", Symbol("dom"), " parameter, which is the current version of the DOM node prior to UI updates (or ", Symbol("undefined"), " when the binding function is first called). The binding function can either return ", Symbol("dom"), " (which means we don't want to update the DOM node to a new version), a primitive value (a new ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for it), or a new DOM node (whose ", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), ")."),
    H2("Polymorphic Binding"),
    p("If you use ", VanJS(), " to build reusable UI components, it's desirable for your components to accept both state and non-state property values. For instance, for a reusable ", Symbol("button"), " component like that:"),
    Js(`const Button = ({color, ...}) = button(
  ...
)
`),
    p("it would be desirable for ", Symbol("button"), " to accept both static ", Symbol("color"), " value and ", Symbol("color"), " state. If the ", Symbol("color"), " property is used as a DOM node property or as a child node, things can work out of the box, as tag functions and ", Symbol("van.add"), " support both state and non-state values in ", Symbol("props"), " and ", Symbol("children"), " parameter. However, if the ", Symbol("color"), " property is used as a ", Symbol("State"), "-derived property or a ", Symbol("State"), "-derived child, it would be hard for your component to work in both ways. Consider the example below:"),
    Js(`button({style: () => \`background-color: \${color};\`},
  ...
)`),
    p("When ", Symbol("color"), " is a static value, we should use ", InlineJs("${color}"), ". However, when ", Symbol("color"), " is a state, we should use ", InlineJs("${color.val}"), " instead. This makes it hard to build reusable UI component that accepts both state and non-state property values. ", VanJS(), " has 2 helper functions: ", Symbol("van.val"), " and ", Symbol("van.oldVal"), " to help you in this situation:"),
    H3({id: "api-val"}, "API reference: ", Symbol("van.val")),
    ApiTable({
      signature: "van.val(s) => <The value of s>",
      description: ["If ", Symbol("s"), " is a ", Symbol("State"), " object, returns the ", Symbol("val"), " property of ", Symbol("s"), "; otherwise, returns ", Symbol("s"), "itself."],
      parameters: {
        s: "The input value, which can be either a state or a non-state value."
      },
      returns: ["The value of ", Symbol("s"), "."],
    }),
    H3({id: "api-oldval"}, "API reference: ", Symbol("van.oldVal")),
    ApiTable({
      signature: "van.oldVal(s) => <The old value of s>",
      description: ["If ", Symbol("s"), " is a ", Symbol("State"), " object, returns the ", Symbol("oldVal"), " property of ", Symbol("s"), "; otherwise, returns ", Symbol("s"), "itself."],
      parameters: {
        s: "The input value, which can be either a state or a non-state value."
      },
      returns: ["The old value of ", Symbol("s"), "."],
    }),
    H3("A practical example"),
    p("Now, let's take a look at a practical example - a reuseable button whose ", Symbol("color"), ", ", Symbol("text"), " and ", Symbol("onclick"), " properties can be either state or non-state objects:"),
    Js(codes.nonStateDeps),
    p(Demo(), span({id: "demo-nonstate-deps"})),
    jsFiddle({id: "nonstate-deps", code: codes.nonStateDeps}),
    H2("The End"),
    p("🎉 Congratulations! You have completed the entire tutorial of ", VanJS(), ". Now you can start your journey of building feature-rich applications!"),
    p("To learn more, you can:"),
    ul(
      li("check out a list of ", Link("sample applications", "/demo"), " built with ", VanJS(), "."),
      li("read the in-depth discussion of a few ", Link("advanced topics", "/advanced"), "."),
      li("check out how to build a ", Link("fullstack app", "/ssr"), " with SSR, CSR and hydration."),
    ),
    H2("API Index"),
    p("Below is the list of all top-level APIs in ", VanJS(), ":"),
    ul(
      li(SymLink("van.tags", "#api-tags")),
      li(SymLink("van.tagsNS", "#api-tagsns")),
      li(SymLink("van.add", "#api-add")),
      li(SymLink("van.state", "#api-state")),
      li(SymLink("van.derive", "#api-derive")),
      li(SymLink("van._", "#api-_")),
      li(SymLink("van.val", "#api-val")),
      li(SymLink("van.oldVal", "#api-oldval")),
      li(SymLink("van.hydrate", "ssr#api-hydrate")),
    ),
  )
}
