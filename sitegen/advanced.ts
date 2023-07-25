import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {b, div, li, ol, p} = tags

  const {H1, H2, H3, InlineJs, InlineHtml, JsFile, Link, Symbol, SymLink, Ts, VanJS} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": Advanced Topics"),
    H2("DOM Attributes vs. Properties"),
    p("In ", SymLink("tag functions", "/tutorial#api-tags"), ", while assigning values from ", Symbol("props"), " parameter to the created HTML element, there are 2 ways of doing it: via ", SymLink("HTML attributes", "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes"), " (", InlineJs("dom.setAttribute(<key>, <value>)"), "), or via the properties of the created HTML element (", InlineJs("dom[<key>] = <value>"), "). ", VanJS(), " follows a consistent rule that makes sense for most use cases regarding which option to choose: when a settable property exists in a given ", Symbol("<key>"), " for the specific element type, we will assign the value via property, otherwise we will assign the value via attribute."),
    p("For instance, ", InlineJs('input({type: "text", value: "Hello 🍦VanJS"})'), " will create an ", Link("input box", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text"), " with ", Symbol("Hello 🍦VanJS"), " as the value of the ", Symbol("value"), " property, while ", InlineJs('div({"data-index": 1})'), " will create the tag: ", InlineHtml('<div data-index="1"></div>'), "."),
    p("Note that, for readonly properties of HTML elements, we will still assign ", Symbol("props"), " values via ", Symbol("setAttribute"), ". For instance, in the code snippet below, the ", Symbol("list"), " of the ", Symbol("<input>"), " element is set via ", Symbol("setAttribute"), ":"),
    JsFile("datalist.code.js"),
    p({
      id: "jsfiddle-readonly-prop",
      "data-prefix": "const {div, input, option, datalist, label} = van.tags",
      "data-suffix": 'van.add(document.body, Datalist())',
    }),
    H2({id: "gc"}, "Garbage Collection"),
    p("There is garbage collection mechanism implemented in ", VanJS(), " to recycle obsolete state bindings. To illustrate the necessity of garbage collection, let's take a look at the code below:"),
    Ts(`const renderPre = van.state(false)
const text = van.state("Text")
const TextLine = (renderPre: boolean) =>
  (renderPre ? pre : div)(
    van.bind(text, t => \`--\${t}--\`),
  )
const dom = div(van.bind(renderPre, TextLine))`),
    p("In this piece of code, we have created an element ", Symbol("dom"), ", whose only child binds to a ", Symbol("boolean"), " state - ", Symbol("renderPre"), ", which determines whether ", Symbol("dom"), " has a ", Symbol("<pre>"), " or ", Symbol("<div>"), " child element. Inside the child element, the underlying text binds to a ", Symbol("string"), " state - ", Symbol("text"), ". Whenever the value of ", Symbol("renderPre"), " is toggled, a new version of the DOM tree will be generated, and we will add a new binding from ", Symbol("text"), " state to the text node of the newly created DOM tree."),
    p("Without proper garbage collection implemented, ", Symbol("text"), " state will eventually be bound to many text nodes after ", Symbol("renderPre"), " is toggled many times. All the of bindings, except the most recently added one, are actually obsolete, as they bind the ", Symbol("text"), " state to a text node that is not currently being used. i.e.: disconnected from the document tree. Meanwhile, because internally, a ", Symbol("State"), " object holds reference to all DOM elements that bind to it, these DOM elements won't be GC-ed by JavaScript runtime, causing ", Link("memory leaks", "https://en.wikipedia.org/wiki/Memory_leak"), "."),
    p("Garbage collection is implemented in ", VanJS(), " to resolve the issue. There are 2 ways a garbage collection activity can be triggered:"),
    ol(
      li(b("Periodic recycling:"), " periodically, ", VanJS(), " will scan all ", Symbol("State"), " objects that have new bindings added recently, and remove all the bindings to a disconnected DOM element. i.e.: ", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property is ", Symbol("false"), "."),
      li(b("Pre-rendering recycling:"), " before ", VanJS(), " re-render the DOM tree in response to state changes, it will first check all the states whose values have been changed in this render cycle, and remove all the bindings to a disconnected DOM element."),
    ),
    H3("Avoid your bindings to be GC-ed unexpectedly"),
    p("There are some general guidelines to follow to avoid your bindings being garbage collected unexpectedly:"),
    ol(
      li("Please complete the construction of the DOM tree and connect the newly constructed DOM tree to the ", SymLink("document", "https://developer.mozilla.org/en-US/docs/Web/API/Window/document"), " object before making any state changes. Otherwise, the bindings to yet-to-be-connected DOM elements will be garbage collected."),
      li("DOM tree construction needs to be synchronous. i.e.: you shouldn't have any suspension point while building the DOM tree (e.g.: ", Symbol("await"), " something in an ", SymLink("async function", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"), "). Otherwise, periodic recycling might be scheduled in the middle of the suspension point which can cause bindings to yet-to-be-connected DOM elements being garbage collected."),
    ),
    H3(Symbol("onnew"), " listeners are not subject to GC"),
    p("Note that, the garbage collection in ", VanJS(), " only removes obsolete bindings. It doesn't apply to event handers registered via ", Symbol("onnew"), " method. For instance, the code below still suffers from memory leaks:"),
    Ts(`const renderPre = van.state(false)
const text = van.state("Text")
const TextLine = (renderPre: boolean) => {
  const expandedText = van.state("--Text--")
  text.onnew(t => expandedText.val = \`--\${t}--\`)
  return (renderPre ? pre : div)(expandedText)
}
const dom = div(van.bind(renderPre, TextLine))
`),
    p("In this example, whenever the generation function ", Symbol("TextLine"), " is called, a new ", Symbol("State"), " object will be created and subscribe to the change of the ", Symbol("text"), " state. Because every event handler registered via ", Symbol("onnew"), " holds the reference to local ", Symbol("State"), " variable ", Symbol("expandedText"), ", the instances of ", Symbol("expandedText"), " variable will not be GC-ed by JavaScript runtime even when they are no longer being actively used."),
    p("To avoid memory leaks caused by ", Symbol("onnew"), ", in the generation function of the ", Symbol("van.bind"), " call, you shall NEVER register event handlers via ", Symbol("onnew"), " method for ", Symbol("State", ), " objects defined outside the scope of generation function."),
  )
}
