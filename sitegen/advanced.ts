import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {b, div, li, ol, p, span} = tags

  const {Demo, H1, H2, H3, InlineJs, InlineHtml, Js, JsFile, Link, Symbol, SymLink, VanJS} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": Advanced Topics"),
    H2("DOM Attributes vs. Properties"),
    p("In ", SymLink("tag functions", "/tutorial#api-tags"), ", while assigning values from ", Symbol("props"), " parameter to the created HTML element, there are 2 options of doing it: via ", SymLink("HTML attributes", "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes"), " (", InlineJs("dom.setAttribute(<key>, <value>)"), "), or via the properties of the created HTML element (", InlineJs("dom[<key>] = <value>"), "). ", VanJS(), " follows a consistent rule that makes sense for most use cases regarding which option to choose: when a settable property exists in a given ", Symbol("<key>"), " for the specific element type, we will assign the value via property, otherwise we will assign the value via attribute."),
    p("For instance, ", InlineJs('input({type: "text", value: "Hello 🍦VanJS"})'), " will create an ", Link("input box", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text"), " with ", Symbol("Hello 🍦VanJS"), " as the value of the ", Symbol("value"), " property, while ", InlineJs('div({"data-index": 1})'), " will create the tag: ", InlineHtml('<div data-index="1"></div>'), "."),
    p("Note that, for readonly properties of HTML elements, we will still assign ", Symbol("props"), " values via ", Symbol("setAttribute"), ". For instance, in the code snippet below, the ", Symbol("list"), " of the ", Symbol("<input>"), " element is set via ", Symbol("setAttribute"), ":"),
    JsFile("datalist.code.js"),
    p({
      id: "jsfiddle-readonly-prop",
      "data-prefix": "const {div, input, option, datalist, label} = van.tags",
      "data-suffix": 'van.add(document.body, Datalist())',
    }),
    H2({id: "why-not-dom-valued-states"}, "Why Can't States Have DOM Node as Values?"),
    p("We might be prompted to assign a DOM node to a ", Symbol("State"), " object, especially when the ", Symbol("State"), " object is used as a ", Symbol("State"), "-typed child. However, this is problematic when the state is bound to multiple child DOM nodes, like the example below:"),
    JsFile("dom-valued-state.code.js"),
    p(Demo(), " ", span({id: "demo-dom-valued-state"})),
    p({id: "jsfiddle-dom-valued-state"}),
    p("In this example, if we click the \"Turn Bold\" button, the first \"", VanJS(), "\" text will disappear, which is unexpected. This is because the same DOM node is used twice in the DOM tree. For this reason, an error will be thrown in ", Symbol("van-{version}.debug.js"), " whenever we assign a DOM node to a ", Symbol("State"), " object."),
    H2({id: "gc"}, "Garbage Collection"),
    p("There is garbage collection mechanism implemented in ", VanJS(), " to recycle obsolete state bindings. To illustrate the necessity of garbage collection, let's take a look at the code below:"),
    Js(`const renderPre = van.state(false)
const text = van.state("Text")
return div(
  () => (renderPre.val ? pre : span)(text),
)
`),
    p("In this piece of code, we create a ", Symbol("<div>"), " element whose only child binds to a ", Symbol("boolean"), " state - ", Symbol("renderPre"), ", which determines whether the ", Symbol("<div>"), " has a ", Symbol("<pre>"), " or ", Symbol("<span>"), " child. Inside the child element, the underlying text binds to a ", Symbol("string"), " state - ", Symbol("text"), ". Whenever the value of ", Symbol("renderPre"), " is toggled, a new version of the ", Symbol("<div>"), " element will be generated, and we will add a new binding from ", Symbol("text"), " state to the child text node of the newly created ", Symbol("<div>"), " element."),
    p("Without proper garbage collection implemented, ", Symbol("text"), " state will be eventually bound to many text nodes after ", Symbol("renderPre"), " is toggled many times. All the of bindings, except for the most recently added one, are actually obsolete, as they bind the ", Symbol("text"), " state to a text node that is not currently being used. i.e.: disconnected from the document tree. Meanwhile, because internally, a ", Symbol("State"), " object holds the reference to all DOM elements that bind to it, these DOM elements won't be GC-ed by JavaScript runtime, causing ", Link("memory leaks", "https://en.wikipedia.org/wiki/Memory_leak"), "."),
    p("Garbage collection is implemented in ", VanJS(), " to resolve the issue. There are 2 ways a garbage collection activity can be triggered:"),
    ol(
      li(b("Periodic recycling:"), " periodically, ", VanJS(), " will scan all ", Symbol("State"), " objects that have new bindings added recently, and remove all the bindings for a disconnected DOM element. i.e.: ", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property is ", Symbol("false"), "."),
      li(b("Pre-rendering recycling:"), " before ", VanJS(), " re-render the DOM tree in response to state changes, it will first check all the states whose values have been changed in this render cycle, and remove all the bindings for a disconnected DOM element."),
    ),
    H3("Avoid your bindings to be GC-ed unexpectedly"),
    p("There are some general guidelines to follow to avoid your bindings being garbage collected unexpectedly:"),
    ol(
      li("Please complete the construction of the DOM tree and connect the newly constructed DOM tree to the ", SymLink("document", "https://developer.mozilla.org/en-US/docs/Web/API/Window/document"), " object before making any state changes. Otherwise, the bindings to yet-to-be-connected DOM elements will be garbage collected."),
      li("DOM tree construction needs to be synchronous. i.e.: you shouldn't have any suspension point while building the DOM tree (e.g.: ", Symbol("await"), " something in an ", SymLink("async function", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"), "). Otherwise, periodic recycling might be scheduled in the middle of the suspension point which can cause bindings to yet-to-be-connected DOM elements being garbage collected."),
    ),
    H3("Derived states and side effects are not subject to GC"),
    p("Note that, the garbage collection in ", VanJS(), " only removes obsolete UI bindings. It doesn't apply to derived states or side effects registered via ", Symbol("van.derive"), ". For instance, the code below still suffers from memory leaks:"),
    Js(`const renderPre = van.state(false)
const prefix = van.state("Prefix - ")
return div(() => {
  const suffix = van.state("Suffix")
  const text = van.derive(() => \`\${prefix.val}\${suffix.val}\`)
  return (renderPre.val ? pre : span)(text)
})
`),
    p("In this example, whenever ", Symbol("renderPre"), " is toggled, a new ", Symbol("text"), " state will be created and subscribe to changes of the ", Symbol("prefix"), " and ", Symbol("suffix"), " state. Because ", Symbol("prefix"), " is defined in the outer scope, it will eventually hold references to many versions of the derived ", Symbol("text"), " state, which are created whenever the binding function is called. These ", Symbol("text"), " state instances won't be GC-ed by JavaScript runtime even though they're no longer being used except for the most recent one."),
    p("To avoid memory leaks in this situation, if you register derived states or side effects via ", Symbol("van.derive"), " inside a binding function, the derived states or side effect shall NEVER depend on state that are created outside the scope of current binding function. The code above can be modified in the following way:"),
    Js(`const renderPre = van.state(false)
const prefix = van.state("Prefix - ")
return div(() => {
  const prefixVal = prefix.val
  const suffix = van.state("Suffix")
  const text = van.derive(() => \`\${prefixVal}\${suffix.val}\`)
  return (renderPre.val ? pre : span)(text)
})
`),
    p("In the modified implementation above, we're making the ", Symbol("State"), "-derived DOM node, instead of the ", Symbol("text"), " state, depend on the ", Symbol("prefix"), " state, which avoids the GC issue."),
    p("In ", Symbol("van-{version}.debug.js"), ", an error will be thrown if you try to reference a state created out of the scope of the current binding function while defining derived states or side effects.")
  )
}
