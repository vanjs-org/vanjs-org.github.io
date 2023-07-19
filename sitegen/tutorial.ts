import van, { ChildDom as TypedChildDom } from "./mini-van.js"
import common from "./common.ts"
import { Element, HTMLDocument, Text } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

type ChildDom = TypedChildDom<Element, Text>

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {b, div, li, p, span, table, tbody, td, tr, ul} = tags

  const {Demo, H1, H2, H3, InlineJs, Js, JsFile, Link, MinVersion, Symbol, SymLink, VanJS} = common(doc)

  interface ApiTableProps {
    readonly signature: string
    readonly description: string | readonly ChildDom[]
    readonly parameters: {[key: string]: string | readonly ChildDom[] | Element}
    readonly returns: string | readonly ChildDom[] | Element
  }
  const ApiTable = ({signature, description, parameters, returns}: ApiTableProps) =>
    table(
      tbody(
        tr(td(b("Signature")), td(InlineJs(signature))),
        tr(td(b("Description")), td(description)),
        tr(td(b("Parameters")), td(
          ul(Object.entries(parameters).map(([k, v]) => v instanceof Element ?
            v : li(b(Symbol(k)), " - ", v))),
        )),
        tr(td(b("Returns")), td(returns)),
      ),
    )

  return div({id: "content"},
    H1(VanJS(), ": Tutorial and API Reference"),
    p("In this tutorial, we will break down into 3 core functionality ", VanJS(), " supports: DOM composition / manipulation, State and State binding."),
    H2({id: "dom"}, "DOM Composition and Manipulation"),
    H3("Your first VanJS app: a simple ", Symbol("Hello"), " page"),
    p("We will start this tutorial with a simple ", Symbol("Hello"), " page, with the code below:"),
    Js(`const {a, div, li, p, ul} = van.tags

const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())
`),
    p({id: "jsfiddle-hello"}),
    p("The code should be self-explanatory if you have some familiarity with HTML. Unlike React, everything in the code above is just pure JavaScript, meaning that you are simply calling functions from ", Symbol("van.js"), " without any transpiling that converts your source code into another form. Reusable UI components built with ", VanJS(), " can be pure vanilla JavaScript functions as well. Here we capitalize the first letter to follow React conventions."),
    p("Also unlike React, ", VanJS(), " does not introduce an ad-hoc virtual DOM layer. All the tag functions above directly return the created DOM objects. e.g.: the function call ", Symbol('p("👋Hello")'), " simply creates an ", SymLink("HTMLParagraphElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement"), " with ", Symbol("👋Hello"), " as its ", SymLink("innerText", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText"), ", meaning that you can directly interact with your created DOM nodes with native DOM APIs."),
    H3({id: "api-tags"}, "API reference: ", Symbol("van.tags")),
    p(Symbol("van.tags"), " is a top-level dynamic object in ", VanJS(), " implemented with ", SymLink("Proxy", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"), ". ", Symbol("van.tags.<name>"), " gets you a function that creates an HTML element with tag name ", Symbol("<name>"), ". A common way of using ", Symbol("van.tags"), " is like the line below:"),
    Js(`const {a, div, p} = van.tags`),
    p("With the line, ", Symbol("a"), ", ", Symbol("div"), ", ", Symbol("p"), " are functions that create ", Symbol("<a>"), ", ", Symbol("<div>"), ", ", Symbol("<p>"), " HTML elements respectively."),
    p("We will use ", Symbol("div"), " function as an example, the API reference for ", Symbol("div"), " tag function is as below:"),
    ApiTable({
      signature: "div([props], ...children) => <the created DOM element>",
      description: ["Creates an ", SymLink("HTMLDivElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement"), " with ", Symbol("props"), " as its properties and ", Symbol("children"), " as its child nodes."],
      parameters: {
        props: ["optional, a plain JavaScript object whose keys and values are the keys and values of the properties of the created HTML element. Keys should be ", Symbol("string"), ", and values can be primitives (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"), "), primitive-valued ", Symbol("State"), " objects, or ", Symbol("State"), "-derived properties. We will explain the behavior of ", Link(Symbol("State"), "-typed", "#state-typed-prop"), " and ", Link(Symbol("State"), "-derived", "#state-derived-prop"), " properties in State Binding section below. For keys like ", Symbol("on..."), ", value should be ", Symbol("function"), " to represent the event handler."],
        children: ["caller can provide 0 or more children as arguments to represent the child nodes of the created HTML element. Each child can be a valid DOM node, a primitive (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"), "), ", Symbol("null"), ", ", Symbol("undefined"), ", a primitive-valued or ", Symbol("null"), "/", Symbol("undefined"), "-valued ", Symbol("State"), " object, or an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " of children. ", Symbol("null"), "/", Symbol("undefined"), "-valued children are only allowed in ", Link("0.12.1", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6137688"), " or later and will be ignored. A ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for each primitive-typed argument. We will explain the behavior of ", Link(Symbol("State"), "-typed child", "#state-typed-child"), " in State Binding section below. For DOM node, it shouldn't be already connected to a document tree (", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), "). i.e.: You should not declare an existing DOM node in the current document as the child node of the newly created element."],
      },
      returns: ["The ", SymLink("HTMLDivElement", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement"), " object just created."],
    }),
    H3("SVG and MathML Support"),
    MinVersion("0.12.0"),
    p("HTML elements with ", SymLink("namespace URI", "https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/glossary.html#dt-namespaceURI"), " can be created via ", SymLink("van.tagsNS", "#api-tagsns"), ", a variant of ", Symbol("van.tags"), " that allows you to specify the ", Symbol("namespaceURI"), " of the created elements. Here is an example of composing the SVG DOM tree with ", Symbol("van.tagsNS"), ":"),
    Js(`const {circle, path, svg} = van.tagsNS("http://www.w3.org/2000/svg")

const Smiley = () => svg({width: "16px", viewBox: "0 0 50 50"},
  circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
  circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
  circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
  path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
)

van.add(document.body, Smiley())
`),
    p(Demo(), " ", span({id: "demo-smiley"})),
    p({id: "jsfiddle-smiley"}),
    p("Similarly, math formulas can be created with ", SymLink("MathML", "https://developer.mozilla.org/en-US/docs/Web/MathML/Element"), " elements via ", Symbol("van.tagsNS"), ":"),
    Js(`const {math, mi, mn, mo, mrow, msup} = van.tagsNS("http://www.w3.org/1998/Math/MathML")

const Euler = () => math(
  msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"),
)

van.add(document.body, Euler())
`),
    p(Demo(), " ", span({id: "demo-euler"})),
    p({id: "jsfiddle-euler"}),
    H3({id: "api-tagsns"}, "API reference: ", Symbol("van.tagsNS")),
    MinVersion("0.12.0"),
    ApiTable({
      signature: "van.tagsNS(namespaceURI) => <the created tags object for elements with specified namespaceURI>",
      description: ["Creates a tags ", SymLink("Proxy", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"), " object similar to ", SymLink("van.tags", "#api-tags"), " for elements with specified ", Symbol("namespaceURI"), "."],
      parameters: {namespaceURI: ["a string for the ", Symbol("namespaceURI"), " property of elements created via tag fucntions."]},
      returns: "The created tags object.",
    }),
    H3({id: "api-add"}, "API reference: ", Symbol("van.add")),
    p(Symbol("van.add"), " fucntion is similar to tag functions described above. Instead of creating a new HTML element with specified properties and children, ", Symbol("van.add"), " function mutates its first argument (which is an existing ", SymLink("Element node", "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"), ") by appending 0 or more children with ", SymLink("appendChild", "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild"), " calls:"),
    ApiTable({
      signature: "van.add(dom, ...children) => dom",
      description: ["Mutates ", Symbol("dom"), " by appending 0 or more child nodes to it. Returns  ", Symbol("dom"), " for possibly further chaining."],
      parameters: {
        dom: "an existing DOM element that we want to append children to.",
        children: ["caller can provide 0 or more ", Symbol("children"), " as arguments to represent the child nodes we want to append to ", Symbol("dom"), ". Each child can be a valid DOM node, a primitive, ", Symbol("null"), ", ", Symbol("undefined"), ", a primitive-valued or ", Symbol("null"), "/", Symbol("undefined"), "-valued ", Symbol("State"), " object, or an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " of children. ", Symbol("null"), "/", Symbol("undefined"), "-valued children are only allowed in ", Link("0.12.1", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6137688"), " or later and will be ignored. A ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for each primitive-typed argument. ", Link(Symbol("State"), "-typed child", "#state-typed-child"), " behave the same way as in tag function. For DOM node, it shouldn't be already connected to a document tree (", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), "). i.e.: You should not append an existing DOM node in the current document to ", Symbol("dom"), ". If 0 children is provided, this function is a no-op."],
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
    Js(`const {li, ul} = van.tags

const List = ({items}) => ul(items.map(it => li(it)))

van.add(document.body, List({items: ["Item 1", "Item 2", "Item 3"]}))
`),
    p({id: "jsfiddle-list"}),
    p("Building a table:"),
    Js(`const {table, tbody, thead, td, th, tr} = van.tags

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
}))
`),
    p({id: "jsfiddle-table"}),
    H3(Symbol("on..."), " event handlers"),
    p("In tag functions, you can provide a ", Symbol("function"), " value for property keys like ", Symbol("on..."), ". This is a convenient way to specify event handlers. For instance, the code below creates a ", SymLink("button", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"), " that shows an alert whenever clicked:"),
    Js(`button({onclick: () => alert("Hello from 🍦VanJS")}, "Hello")`),
    p({
      id: "jsfiddle-onclick",
      "data-prefix": "const {button} = van.tags",
      "data-replace-code": "van.add(document.body, $CODE)\n",
    }),
    p("🎉 Congratulations! You have mastered the skills for building and manipulating DOM trees using ", VanJS(), "'s declarative API, which is incredibly powerful for creating comprehensive applications with elegant code. In the sections below, you will continue to learn how to build reactive applications with state and state binding."),
    p("If your application doesn't rely on state and state binding, you can use the slimmed-down version of ", VanJS(), " - ", Link("Mini-Van", "/minivan"), "."),
    H2("State"),
    p("A ", Symbol("State"), " object in ", VanJS(), " represents a value that can be updated throughout your application. A ", Symbol("State"), " object has a public property ", Symbol("val"), ", with a ", Link("custom setter", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set"), " that automatically propogates changes to DOM nodes that bind to it. In addition, you can register your event handler to listen to updates of a ", Symbol("State"), " object via its ", Symbol("onnew"), " method."),
    p("The code below illustrates how a ", Symbol("State"), " object can be used:"),
    Js(`const {button, div, input, sup} = van.tags

// Create a new State object with init value 1
const counter = van.state(1)

// Log whenever the value of the state is updated
counter.onnew((v, oldV) => console.log(\`Counter: \${oldV} -> \${v}\`))

// Used as a child node
const dom1 = div(counter)

// Used as a property
const dom2 = input({type: "number", value: counter, disabled: true})

// Used in a state-derived property
const dom3 = div(
  {style: {deps: [counter], f: c => \`font-size: \${c}em;\`}},
  "Text")

// Used in a complex binding
const dom4 = van.bind(counter, c => div(c, sup(2), \` = \${c * c}\`))

// Button to increment the value of the state
const incrementBtn = button({onclick: () => ++counter.val}, "Increment")
const resetBtn = button({onclick: () => counter.val = 1}, "Reset")

van.add(document.body, incrementBtn, resetBtn, dom1, dom2, dom3, dom4)
`),
    p(Demo()),
    p({id: "demo-state"}),
    p({id: "jsfiddle-state"}),
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
     li("Property ", Symbol(b("val")), " - the current value of the ", Symbol("State"), " object. When a new value of this property is set, all event handlers registered via ", Symbol("onnew"), " method will be called and all DOM nodes that bind to it will be updated accordingly. Note that: while setting ", Symbol("val"), ", if the provided value is the same as the current one, event handlers and DOM updates will be skipped."),
     li("Method ", Symbol(b("onnew(l)")), " - register an event handler to listen to the updates of the ", Symbol("State"), " object. Whenever a new value is assigned to the state, the event handler ", Symbol("l"), " will be called with 2 arguments: ", Symbol("v"), " and ", Symbol("oldV"), ", representing the new and old value of the state."),
    ),
    p("The value of a ", Symbol("State"), " object can be almost anything, primitive, ", SymLink("Object", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"), ", ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), ", ", SymLink("null", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null"), ", etc., with 2 ad-hoc exceptions that we made: The value of the ", Symbol("State"), " object cannot be a DOM node, or another ", Symbol("State"), " object. Having values in these 2 types carries little semantic information and is more likely a result of coding bugs. Thus we disallow ", Symbol("State"), " objects to have values in these 2 types. In ", Symbol("van-{version}.debug.js"), ", an explicit error will be thrown if you try to assign a DOM node or another ", Symbol("State"), " object as the value of a state."),
    H3(Symbol("State.val"), " is immutable"),
    p("While you can update ", Symbol("State"), " objects by setting the ", Symbol("val"), " property, you should never mutate the underlying object of ", Symbol("val"), " itself. Doing so will not trigger the DOM tree update as you would expect and might result in ", Link("undefined behavior", "https://en.wikipedia.org/wiki/Undefined_behavior"), " due to ", Link("aliasing", "https://en.wikipedia.org/wiki/Aliasing_(computing)"), ". In ", Symbol("van-<version>.debug.js"), ", attempt to mutate the object in ", Symbol("val"), " will lead to an ", SymLink("Error", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error"), " to be thrown."),
    H2("State Binding"),
    p("Once ", Symbol("State"), " objects are created, we can bind them to DOM nodes in various ways to make your UI reactive to state changes."),
    H3({id: "state-typed-child"}, Symbol("State"), " objects as child nodes"),
    p(Symbol("State"), " objects can be used as child nodes in ", SymLink("tag functions", "#api-tags"), " and ", SymLink("van.add", "#api-add"), ", like the ", SymLink("Counter", "/#code-counter"), " example shown in the home page. For a ", Symbol("State"), " object used as a child node, its value needs to be primitive (", Symbol("string"), ", ", Symbol("number"), ", ", Symbol("boolean"), " or ", Symbol("bigint"),  "), and a ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created for it. The content of the created ", Symbol("Text node"), " will be always in sync with the value of the state."),
    p("The following code shows how to build a simple timer with this feature:"),
Js(`const {button, span} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Timer = ({totalSecs}) => {
  const secs = van.state(totalSecs);
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

van.add(document.body, Timer({totalSecs: 5}))
`),
    p(Demo(), " ", span({id: "demo-timer"})),
    p({id: "jsfiddle-timer"}),
    H3({id: "state-typed-prop"}, Symbol("State"), " objects as properties"),
    p(Symbol("State"), " objects can be used as properties of HTML elements. Similar to ", Symbol("State"), "-based child nodes, the value of the properties will be always in sync with the value of the respective states. When ", Symbol("State"), " objects are used as properties, you need to make sure that the values of the states are always valid property values, i.e.: primitives or ", Symbol("function"), "s (for event handlers)."),
    p("The following code demonstrates 2 ", SymLink("text inputs", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text"), " whose values are always in sync:"),
    Js(`const {input, span} = van.tags

const ConnectedProps = () => {
  const text = van.state("")
  return span(
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
  )
}

van.add(document.body, ConnectedProps())
`),
    p(Demo(), " ", span({id: "demo-connected-props"})),
    p({id: "jsfiddle-connected-props"}),
    H3({id: "state-derived-prop"}, Symbol("State"), "-derived properties"),
    p(Symbol("State"), "-derived property is a more advanced way to bind a property of an HTML element with one or more underlying ", Symbol("State"), " objects. To use ", Symbol("State"), "-derived properties, you need to provide an object with the following fields as the value in ", Symbol("props"), " argument while calling to a ", SymLink("tag function", "#api-tags"), ":"),
    ul(
      li(Symbol(b("deps")), " - an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " of one or more dependencies."),
      li(Symbol(b("f")), " - a ", Symbol("function"), " that takes the values of states in ", Symbol(b("deps")), " as parameters. The return value of ", Symbol(b("f")), " should always be valid property values, i.e.: primitives or ", Symbol("function"), "s (for event handlers)."),
    ),
    p("The example below is a live font size and color preview implemented with this feature:"),
    Js(`const {input, option, select, span} = van.tags

const FontPreview = () => {
  const size = van.state(16), color = van.state("black")
  return span(
    "Size: ",
    input({type: "range", min: 10, max: 36, value: size,
      oninput: e => size.val = e.target.value}),
    " Color: ",
    select({oninput: e => color.val = e.target.value, value: color},
      ["black", "blue", "green", "red", "brown"]
        .map(c => option({value: c}, c)),
    ),
    span({style: {deps: [size, color], f: (size, color) =>
      \`font-size: \${size}px; color: \${color};\`}}, " Hello 🍦VanJS"),
  )
}

van.add(document.body, FontPreview())
`),
    p(Demo(), " ", span({id: "demo-font-preview"})),
    p({id: "jsfiddle-font-preview"}),
    H3("Complex ", Symbol("State"), " binding"),
    p("You can call ", SymLink("van.bind", "#api-bind"), " to bind an HTML node with one or more ", Symbol("State"), " objects in a custom way, as specified in a generation function that you provide. The following example illustrates this:"),
    Js(`const {input, li, option, select, span, ul} = van.tags

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
    van.bind(items, sortedBy, (items, sortedBy) =>
      sortedBy === "Ascending" ?
        ul(items.split(",").sort().map(i => li(i))) :
        ul(items.split(",").sort().reverse().map(i => li(i)))),
  )
}

van.add(document.body, SortedList())
`),
    p(Demo()),
    p({id: "demo-sorted-list"}),
    p({id: "jsfiddle-sorted-list"}),
    H3({id: "api-bind"}, "API reference: ", Symbol("van.bind")),
    ApiTable({
      signature: "van.bind(dep1, dep2, ..., depN, f) => <the created DOM node>",
      description: ["Creates a DOM node that binds to dependencies: ", Symbol("dep1"), ", ", Symbol("dep2"), ", ..., ", Symbol("depN"), ". Whenever the values of these states change, the generation function - ", Symbol("f"), ", will be called to update the DOM tree."],
      parameters: {
        deps: li(Symbol(b("dep1")), ", ", Symbol(b("dep2")), ", ..., ", Symbol(b("depN")), " - the dependencies bound to the DOM node."),
        f: ["The generation function, with signature ", InlineJs("f(v1, v2, ..., vN, [dom, oldV1, oldV2, ..., oldVN]) => <primitive, DOM node, null or undefined>"), ". Whenever any value of ", Symbol("dep1"), ", ", Symbol("dep2"), ", ..., ", Symbol("depN"), " changes, ", Symbol("f"), " will be called and returns the new version of the DOM node based on new values of the dependencies. Optionally, ", Symbol("f"), " can take ", Symbol("dom"), " (the current version of the bound DOM node) and ", Symbol("oldV1"), ", ", Symbol("oldV2"), ", ...,", Symbol("oldVN"), " (the old values of the dependencies) as additional parameters to enable ", Link("Stateful binding", "#stateful-binding"), ", which might sometimes choose to mutate existing DOM node instead of generating a new one as an optimization. When ", Symbol("f"), " returns a primitive, a ", SymLink("Text node", "https://developer.mozilla.org/en-US/docs/Web/API/Text"), " will be created based on its content. When ", Symbol("f"), " returns ", Symbol("null"), " or ", Symbol("undefined"), ", the DOM node will removed. Removed DOM node will never be brought back, even when ", Symbol("f"), " would return a non-", Symbol("null"), "/", Symbol("undefined"), " value based on future values of the dependencies."],
      },
      returns: ["The created DOM node that binds to dependencies."],
  }),
    H3("Polymorphism between ", Symbol("State"), " and non-", Symbol("State"), " dependencies"),
    MinVersion("0.12.0"),
    p("State-derived properties and ", Symbol("van.bind"), " can accept both ", Symbol("State"), " and non-", Symbol("State"), " objects as dependency arguments. This polymorphism makes it handy to build reusable components where users can specify both state and non-state property values. Non-state dependencies behave the same way as state dependencies whose ", Symbol("val"), " properties never change. Below is an example of a reuseable button whose ", Symbol("color"), ", ", Symbol("text"), " and ", Symbol("onclick"), " properties can be both state and non-state objects:"),
    JsFile("nonstate-deps.code.js"),
    p(Demo(), span({id: "demo-nonstate-deps"})),
    p({id: "jsfiddle-nonstate-deps"}),
    H3("Removing a DOM node"),
    p("As noted in the API reference above, when generation function ", Symbol("f"), " returns ", Symbol("null"), " or ", Symbol("undefined"), ", the DOM node will removed. Removed DOM node will never be brought back, even when ", Symbol("f"), " would return a non-", Symbol("null"), "/", Symbol("undefined"), " value based on future values of the dependencies."),
    p("The following code illustrates how to build an editable list with this features:"),
    Js(`const {a, button, div, input, li, ul} = van.tags

const ListItem = ({text}) => {
  const deleted = van.state(false)
  return van.bind(deleted, d => d ? null : li(
    text, a({onclick: () => deleted.val = true}, "❌"),
  ))
}

const EditableList = () => {
  const listDom = ul()
  const textDom = input({type: "text"})
  return div(
    textDom, " ", button({
      onclick: () => van.add(listDom, ListItem({text: textDom.value})),
    }, "➕"),
    listDom,
  )
}

van.add(document.body, EditableList())
`),
    p(Demo()),
    p({id: "demo-editable-list"}),
    p({
      id: "jsfiddle-editable-list",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H3({id: "stateful-binding"}, "Stateful binding"),
    p("While dealing with state updates, a user can choose to, instead of regenerating the new version of the DOM node entirely based on new state values, mutate the existing DOM node that is already connected to the document tree based on all the new values and old values of its dependencies. This feature can be used as an optimization to avoid the entire DOM subtree being completely re-rendered."),
    p("The following code is a snippet of the ", Link("auto-complete application", "/demo#auto-complete"), " which leverages this feature to optimize:"),
    Js(`const suggestionList = van.bind(candidates, selectedIndex,
  (candidates, selectedIndex, dom, oldCandidates, oldSelectedIndex) => {
    if (dom && candidates === oldCandidates) {
      // If candidate list doesn't change, we don't need to re-render the
      // suggetion list. Just need to change the selected candidate.
      dom.querySelector(\`[data-index="\${oldSelectedIndex}"]\`)
        ?.classList?.remove("selected")
      dom.querySelector(\`[data-index="\${selectedIndex}"]\`)
        ?.classList?.add("selected")
      return dom
    }
    return SuggestionList({candidates, selectedIndex})
  })
`),
    p("The piece of code above is building a ", Symbol("suggestionList"), " that is reactive to the changes of selection ", Symbol("candidates"), " and ", Symbol("selectedIndex"), ". When selection ", Symbol("candidates"), " change, the ", Symbol("suggestionList"), " needs to be regenerated. However, if only ", Symbol("selectedIndex"), " changes, we only need to update the DOM element to indicate that the new candidate is being selected now, which can be achieved by changing the ", SymLink("classList", "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList"), " of relevant candidate elements."),
    p("The generation function ", Symbol("f"), " can either return ", Symbol("dom"), " (the existing node in the document tree), or a newly created DOM node. When a newly created DOM node is returned, it shouldn't be already connected to a document tree (", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property should be ", Symbol("false"), ")"),
    p("Note that, when the generation function is being called for the first time, ", Symbol("dom"), " and ", Symbol("oldV1"), ", ", Symbol("oldV2"), ", ...,", Symbol("oldVN"), " will all be ", Symbol("undefined"), ". Thus the generation function of stateful binding needs to handle this situation as well. This is why in Line 3, we're checking ", Symbol("dom"), " in the ", Symbol("if"), " statement."),
    H2("The End"),
    p("🎉 Congratulations! You have completed the entire tutorial of ", VanJS(), ". Now you can start your journey of building feature-rich applications!"),
    p("To learn more, you can:"),
    ul(
      li("check out a list of ", Link("sample applications", "/demo"), " built with ", VanJS(), "."),
      li("read the in-depth discussion of a few ", Link("advanced topics", "/advanced"), "."),
    ),
    H2("API Index"),
    p("Below is the list of all top-level APIs in ", VanJS(), ":"),
    ul(
      li(SymLink("van.tags", "#api-tags")),
      li(SymLink("van.tagsNS", "#api-tagsns")),
      li(SymLink("van.add", "#api-add")),
      li(SymLink("van.state", "#api-state")),
      li(SymLink("van.bind", "#api-bind")),
    ),
  )
}
