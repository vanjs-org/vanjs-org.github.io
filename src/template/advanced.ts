import common from "../common"
import fsp from "fs/promises"
import type { VanObj } from "../type"

export default async (van: VanObj) => {
  const {tags: {b, br, div, li, ol, p, span}} = van
  const {Demo, H1, H2, H3, InlineHtml, InlineJs, Js, Link, MiniVan, Quote, SymLink, Symbol, VanJS, jsFiddle} = common(van)

  const codes = {
    datalist: await fsp.readFile("src/template/advanced/datalist.code.js", "utf-8"),
    domValuedState: await fsp.readFile("src/template/advanced/dom-valued-state.code.js", "utf-8"),
    advancedStateDerivation: await fsp.readFile("src/template/advanced/advanced-state-derivation.code.js", "utf-8"),
    conditionalBinding: await fsp.readFile("src/template/advanced/conditional-binding.code.js", "utf-8"),
    conditionalDerive: await fsp.readFile("src/template/advanced/conditional-derive.code.js", "utf-8"),
  }

  return div({id: "content"},
    H1(VanJS(), ": Advanced Topics"),
    Quote({text: "Everything should be made as simple as possible, but not simpler.", source: "Albert Einstein"}),
    H2("DOM Attributes vs. Properties"),
    p("In ", SymLink("tag functions", "/tutorial#api-tags"), ", while assigning values from ", Symbol("props"), " parameter to the created HTML element, there are 2 ways of doing it: via ", SymLink("HTML attributes", "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes"), " (", InlineJs("dom.setAttribute(<key>, <value>)"), "), or via the properties of the created HTML element (", InlineJs("dom[<key>] = <value>"), "). ", VanJS(), " follows a consistent rule that makes sense for most use cases regarding which option to choose: when a settable property exists in a given ", Symbol("<key>"), " for the specific element type, we will assign the value via property, otherwise we will assign the value via attribute."),
    p("For instance, ", InlineJs('input({type: "text", value: "Hello 🍦VanJS"})'), " will create an ", Link("input box", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text"), " with ", Symbol("Hello 🍦VanJS"), " as the value of the ", Symbol("value"), " property, while ", InlineJs('div({"data-index": 1})'), " will create the tag: ", InlineHtml('<div data-index="1"></div>'), "."),
    p("Note that, for readonly properties of HTML elements, we will still assign ", Symbol("props"), " values via ", Symbol("setAttribute"), ". For instance, in the code snippet below, the ", Symbol("list"), " of the ", InlineHtml("<input>"), " element is set via ", Symbol("setAttribute"), ":"),
    Js(codes.datalist),
    jsFiddle({
      id: "readonly-prop",
      "data-prefix": "const {div, input, option, datalist, label} = van.tags",
      "data-suffix": 'van.add(document.body, Datalist())',
      code: codes.datalist,
    }),
    p(b("NOTE:"), " for ", MiniVan(), ", since ", Symbol("0.4.0"), ", we consistently assign the ", Symbol("props"), " values via ", Symbol("setAttribute"), " for all property keys in tag functions. This is because for SSR (server-side rendering), which is ", MiniVan(), "'s primary use case, setting the properties of a DOM node won't be visible in the rendered HTML string unless the action of setting the property itself will also set the corresponding HTML attribute (e.g.: setting the ", Symbol("id"), " property of a DOM node will also set the ", Symbol("id"), " attribute). This is helpful as ", InlineJs(`input({type: "text", value: "value"})`), " can be rendered as ", InlineHtml(`<input type="text" value="value">`), " in ", MiniVan(), " but would be rendered as ", InlineHtml(`<input type="text">`), " if we set the property value via DOM property."),
    H2("State and State Binding"),
    H3({id: "why-not-dom-valued-states"}, "Why can't states have DOM node as values?"),
    p("We might be prompted to assign a DOM node to a ", Symbol("State"), " object, especially when the ", Symbol("State"), " object is used as a ", Symbol("State"), "-typed child node. However, this is problematic when the state is bound in multiple places, like the example below:"),
    Js(codes.domValuedState),
    p(Demo(), " ", span({id: "demo-dom-valued-state"})),
    jsFiddle({id: "dom-valued-state", code: codes.domValuedState}),
    p("In this example, if we click the \"Turn Bold\" button, the first \"", VanJS(), "\" text will disappear, which is unexpected. This is because the same DOM node ", InlineJs('b("VanJS")'), " is used twice in the DOM tree. For this reason, an error will be thrown in ", Symbol("van-{version}.debug.js"), " whenever we assign a DOM node to a ", Symbol("State"), " object."),
    H3("State granularity"),
    p("Whenever possible, it's encouraged to define states at a more granular level. That is, it's recommended to define states like this:"),
    Js(`const appState = {
  a: van.state(1),
  b: van.state(2),
}
`),
    p("instead of this:"),
    Js(`const appState = van.state({
  a: 1,
  b: 2,
})
`),
    p("More granular ", Symbol("State"), " objects can help state bindings be more locally scoped, which make reactive UI updates more efficient by eliminating unnecessary DOM tree construction and replacement."),
    H3("Advanced state derivation"),
    Quote({text: ["道生一，一生二，二生三，三生万物", br(), "(Tao derives one, one derives two, two derive three, and three derive everything)"], source: "老子，道德经"}),
    p("A broad set of advanced state derivation (derived states and side effects) can indeed be defined with ", SymLink("van.derive", "/tutorial#api-derive"), ", as illustrated in the following piece of code:"),
    Js(codes.advancedStateDerivation),
    jsFiddle({
      id: "advanced-state-derivation",
      "data-prefix": "const {div, input, span} = van.tags",
      code: codes.advancedStateDerivation,
      "data-suffix": `van.add(document.body,
  div(
    span({class: "label"}, "fullName:"),
    input({type: "text", value: fullName, oninput: e => fullName.val = e.target.value}),
  ),
  div(span({class: "label"}, "firstName:"), () => firstName.val ?? ""),
  div(span({class: "label"}, "lastName:"), () => lastName.val ?? ""),
  div(span({class: "label"}, "elapsed:"), () => elapsed.val.toFixed(2)),
  div(span({class: "label"}, "delayed:"), () => delayed.val.toFixed(2)),
  div(span({class: "label"}, "throttled:"), () => throttled.val.toFixed(2)),
)`,
      "data-css": `.label {
        font-weight: bold;
        display: inline-block;
        width: 100px;
      }`
    }),
    H3("Conditional state binding"),
    p("In ", Link(Symbol("State"), "-derived properties", "/tutorial#state-derived-prop"), " and ", Link(Symbol("State"), "-derived child nodes", "/tutorial#state-derived-child"), ", it is guaranteed that the binding function will (only) be triggered when the dependency states change. This is true even for complex binding functions, who have different dependency states under different conditions."),
    p("For instance, the binding function ", InlineJs("() => cond.val ? a.val + b.val : c.val + d.val"), " will (only) be triggered by updates of state ", Symbol("a"), ", ", Symbol("b"), " and ", Symbol("cond"), " if ", Symbol("cond.val"), " is true, and will (only) be triggered by updates of state ", Symbol("c"), ", ", Symbol("d"), " and ", Symbol("cond"), " if ", Symbol("cond.val"), " is false. This can be illustrated with the code below:"),
    Js(codes.conditionalBinding),
    p(Demo()),
    p({id: "demo-conditional-binding"}),
    jsFiddle({
      id: "conditional-binding",
      code: codes.conditionalBinding,
      "data-prefix": "const {div, input, option, select} = van.tags",
      "data-suffix": "van.add(document.body, ConditionalBinding())",
    }),
    p("Conditional state binding works for ", Link("derived states", "/tutorial#derived-state"), " and ", Link("side effects", "/tutorial#side-effect"), " registered via ", Symbol("van.derive"), " as well:"),
    Js(codes.conditionalDerive),
    p(Demo()),
    p({id: "demo-conditional-derive"}),
    jsFiddle({
      id: "conditional-derive",
      code: codes.conditionalDerive,
      "data-prefix": "const {div, input, option, select} = van.tags",
      "data-suffix": "van.add(document.body, ConditionalDerive())",
    }),
    H2({id: "gc"}, "Garbage Collection"),
    p("There is garbage collection mechanism implemented in ", VanJS(), " to recycle obsolete state bindings. To illustrate the necessity of garbage collection, let's take a look at the code below:"),
    Js(`const renderPre = van.state(false)
const text = van.state("Text")
const TextDiv = () => div(
  () => (renderPre.val ? pre : span)(text),
)
`),
    p("In this piece of code, the ", Symbol("TextDiv"), " component has a ", InlineHtml("<div>"), " element whose only child is bound to a ", Symbol("boolean"), " state - ", Symbol("renderPre"), ", which determines whether the ", InlineHtml("<div>"), " has a ", InlineHtml("<pre>"), " or ", InlineHtml("<span>"), " child. Inside the child element, the underlying text is bound to a ", Symbol("string"), " state - ", Symbol("text"), ". Whenever the value of ", Symbol("renderPre"), " is toggled, a new version of the ", InlineHtml("<div>"), " element will be generated, and we will add a new binding from ", Symbol("text"), " state to the child text node of the newly created ", InlineHtml("<div>"), " element."),
    p("Without proper garbage collection implemented, ", Symbol("text"), " state will eventually be bound to many text nodes after ", Symbol("renderPre"), " is toggled many times. All the of bindings, except for the most recently added one, are actually obsolete, as they bind the ", Symbol("text"), " state to a text node that is not currently being used. i.e.: disconnected from the document tree. Meanwhile, because internally, a ", Symbol("State"), " object holds the reference to all DOM elements are bound to it, these DOM elements won't be GC-ed by JavaScript runtime, causing ", Link("memory leaks", "https://en.wikipedia.org/wiki/Memory_leak"), "."),
    p("Garbage collection is implemented in ", VanJS(), " to resolve the issue. There are 2 ways a garbage collection activity can be triggered:"),
    ol(
      li(b("Periodic recycling:"), " periodically, ", VanJS(), " will scan all ", Symbol("State"), " objects that have new bindings added recently, and remove all bindings to disconnected DOM elements. i.e.: ", SymLink("isConnected", "https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected"), " property is ", Symbol("false"), "."),
      li(b("Pre-rendering recycling:"), " before ", VanJS(), " re-render the DOM tree in response to state changes, it will first check all the states whose values have been changed in this render cycle, and remove all bindings to disconnected DOM elements."),
    ),
    p(Link("Try out the example here", "/code/gc-ui"), " (You can use ", Link("developer console", "https://en.wikipedia.org/wiki/Web_development_tools"), " to watch ", Symbol("text"), "'s UI ", Symbol("_bindings"), ")."),
    H3("Avoid your bindings to be GC-ed unexpectedly"),
    p("There are some general guidelines to follow to avoid your bindings being garbage collected unexpectedly:"),
    ol(
      li("Please complete the construction of the DOM tree and connect the newly constructed DOM tree to the ", SymLink("document", "https://developer.mozilla.org/en-US/docs/Web/API/Window/document"), " object before making any state changes. Otherwise, the bindings to yet-to-be-connected DOM elements will be garbage collected."),
      li("DOM tree construction needs to be synchronous. i.e.: you shouldn't have any suspension point while building the DOM tree (e.g.: ", Symbol("await"), " something in an ", SymLink("async function", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"), "). Otherwise, periodic recycling might be scheduled in the middle of the suspension point which can cause bindings to yet-to-be-connected DOM elements being garbage collected."),
    ),
    H3("Derived states and side effects registered inside a binding function"),
    p("For derived states and side effects registered via ", SymLink("van.derive", "tutorial#api-derive"), ", if they are registered inside a binding function, they will be garbage collected if the DOM node returned by the binding function becomes disconnected from the document tree. For instance, for the code below:"),
    Js(`const renderPre = van.state(false)
const prefix = van.state("Prefix")
const TextDiv = () => div(() => {
  const suffix = van.state("Suffix")
  const text = van.derive(() => \`\${prefix.val} - \${suffix.val}\`)
  return (renderPre.val ? pre : span)(text)
})
`),
    p("whenever ", Symbol("renderPre"), " is toggled, a new ", Symbol("text"), " state will be created and subscribe to changes of the ", Symbol("prefix"), " state. However, the derivation from ", Symbol("prefix"), " to the previous ", Symbol("text"), " state will be garbage collected as the derivation was created while executing a binding function whose result DOM node no longer connects to the document tree. This is the mechanism to avoid memory leaks caused by state derivations that hold onto memory indefinitely."),
    p(Link("Try out the example here", "/code/gc-derive"), " (You can use developer console to watch ", Symbol("prefix"), "'s ", Symbol("_listeners"), ")."),
  )
}
