import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, i, li, ol, p, span, strong, ul}} = van.vanWithDoc(doc)
  const {ApiTable, Caveat, Demo, Download, H1, H2, H3, Html, InlineHtml, InlineJs, InlineTs, Js, JsFile, Json, Link, Shell, SymLink, Symbol, Ts, VanJS, VanX} = common(doc)

  const version = Deno.readTextFileSync("code/van-x.version")

  return div({id: "content"},
    H1(strong("VanX: The 1.0 kB Official VanJS Extension")),
    p(VanX(), " is the official extension of ", VanJS(), ", which provides handy utility functions. ", VanX(), " makes ", VanJS(), " more ergonomic for certain use cases and its developer experience closer to other popular UI frameworks. Like ", VanJS(), ", ", VanX(), " is also ultra-lightweight, with just 1.0kB in the gzipped minified bundle."),
    H2("Installation"),
    p(VanX(), " is published as NPM package ", Link("vanjs-ext", "https://www.npmjs.com/package/vanjs-ext"), ". Run the following command to install the package:"),
    Shell("npm install vanjs-ext"),
    p("Add this line to your script to import the package:"),
    Js(`import * as vanX from "vanjs-ext"`),
    p("You can also import individual utility functions you're going to use:"),
    Js(`import { <functions you want to use> } from "vanjs-ext"`),
    p("Alternatively, you can import ", VanX(), " from CDN via a ", InlineJs(`<script type="text/javascript">`), " tag:"),
    Html(`<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vanjs-ext@${version}/dist/van-x.nomodule.min.js"></script>`),
    p(Symbol(`https://cdn.jsdelivr.net/npm/vanjs-ext@${version}/dist/van-x.nomodule.js`)," can be used for the non-minified version."),
    p("Note that: ", VanJS(), " needs to be ", Link("imported", "/start"), " via a ", InlineJs(`<script type="text/javascript">`), " tag for ", VanX, " to work properly."),
    p("To get TypeScript support for ", InlineHtml("<script>"), " tag integration, download ", Download(`van-x-${version}.d.ts`), " and add the following code at the top of your ", Symbol(".ts"), " file:"),
    Ts(`import type * as vanXType from "./van-x-${version}.d.ts"

declare const vanX: typeof vanXType
`),
    H2({id: "reactive-object"}, Symbol("vanX.reactive"), ": Reactive Object to Hold Many Individual States"),
    p(Symbol("vanX.reactive"), " provides an ergonomic way to define a single reactive object where each of its individual fields corresponds to an underlying ", Symbol("State"), " object. For instance:"),
    Js(`const obj = vanX.reactive({a: 1, b: 2})`),
    p("defines a reactive object with the following underlying state fields:"),
    Js(`{a: van.state(1), b: van.state(2)}`),
    p("The reactive objects defined by ", Symbol("vanX.reactive"), " can be deeply nested. For instance:"),
    Js(`const obj = vanX.reactive({
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
})`),
    p("defines a reactive object with the following underlying state fields:"),
    Js(`{
  a: van.state(1),
  b: van.state({
    c: van.state(2),
    d: van.state(3),
  }),
}`),
    p("Getting and setting values of the underlying states can be simply done by getting / setting the fields of the reactive object. For instance, ", InlineJs(`obj.b.c`), " is equivalent to what you would have to write ", InlineJs(`obj.b.val.c.val`), " had the underlying state object been accessed."),
    H3("A practical example"),
    p("Now, let's take a look at a practice example on how ", Symbol("vanX.reactive"), " can help group multiple states into a single reactive object in your application:"),
    JsFile("name.code.js"),
    p(Demo(), " ", span({id: "demo-name"})),
    p({
      id: "jsfiddle-name",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {button, input, span} = van.tags",
      "data-suffix": "van.add(document.body, Name())",
      "data-css": "input { width: 90px; }\n",
    }),
    p("Note that, not only you can set the value of each individual leaf field, you can also set the entire object of the ", Symbol("name"), " field, as what's being done in the ", Symbol("onclick"), " handler of the ", Symbol("Reset"), " button:"),
    Js(`button({onclick: () => data.name = {first: "Tao", last: "Xin"}}, "Reset")`),
    p({id: "caveat-access-sub-field"}, Caveat(), "Accessing to any sub-field of the reactive object needs to be wrapped inside a binding function. Otherwise, your app won't be reactive to the sub-field changes."),
    p({id: "caveat-no-aliasing"}, Caveat(), "DO NOT alias any sub-field of the reactive object into other variables. Doing so will break the dependency detection when the sub-field alias is used in a binding function."),
    H3({id: "api-reactive"}, "API reference: ", Symbol("vanX.reactive")),
    ApiTable({
      signature: "vanX.reactive(obj) => <the created reactive object>",
      description: ["Converts the input object ", Symbol("obj"), " into a reactive object."],
      parameters: {
        obj: ["Can be a plain object or an object of an existing JavaScript class. ", Symbol("obj"), " can have deeply nested fields. The original ", Symbol("obj"), " shouldn't be accessed anymore after the ", InlineJs("vanX.reactive(obj)"), " call."],
      },
      returns: "The created reactive object.",
    }),
    p(Caveat(), "The passed-in ", Symbol("obj"), " object shouldn't have any ", Symbol("State"), " fields. Doing so will result in states of other ", Symbol("State"), " objects, which is ", Link("invalid", "/tutorial#public-interface-of-state-objects"), " in ", VanJS(), "."),
    H3("Calculated fields"),
    p("You can specify calculated fields (similar to ", Link("derived states", "/tutorial#derived-state"), " in ", VanJS(), ") via ", Symbol("vanX.calc"), ". The example above can be rewritten to the code below:"),
    JsFile("name-calc.code.js"),
    p(Demo(), " ", span({id: "demo-name-calc"})),
    p({
      id: "jsfiddle-name-calc",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {button, input, span} = van.tags",
      "data-suffix": "van.add(document.body, Name())",
      "data-css": "input { width: 90px; }\n",
    }),
    p(Caveat(), "Avoid self-referencing when specify calculated fields. For instance, the code below:"),
    Js(`const data = vanX.reactive({
  name: {first: "Tao", last: "Xin"},
  fullName: vanX.calc(() => \`\${data.name.first} \${data.name.last}\`),
})`),
    p("will lead to ", Symbol("ReferenceError"), " as ", Symbol("data"), " variable is not yet defined when the calculation function is being executed. As shown in the ", Link("example", "#calculated-fields"), " above, it's recommended to define calculated fields in a separate reactive object."),
    H3({id: "api-calc"}, "API reference: ", Symbol("vanX.calc")),
    ApiTable({
      signature: "vanX.calc(f) => <the created calculated field>",
      description: ["Creates a calculated field for a reactive object based on the calculation function", Symbol("f"), "."],
      parameters: {
        f: "The calculation function.",
      },
      returns: "The created calculated field.",
    }),
    H3("Get the underlying ", Symbol("State"), " object"),
    p("Sometimes, it's desirable to get the underlying ", Symbol("State"), " objects for fields in a reactive object. This can be achieved with ", Symbol("vanX.stateFields"), ". The example above can be modified to use the underlying state field instead of the binding function for ", Symbol("Full name"), ":"),
    JsFile("name-state-fields.code.js"),
    p(Demo()),
    p({id: "demo-name-state-fields"}),
    p({
      id: "jsfiddle-name-state-fields",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {button, div, input} = van.tags",
      "data-suffix": "van.add(document.body, Name())",
      "data-css": "input { width: 90px; }\n",
    }),
    p("Note that, ", Symbol("stateFields"), " only gets the underlying state fields for one layer of the reactive object. For instance, to get the state field for ", Symbol("First name"), ", you need to write:"),
    Js(`vanX.stateFields(vanX.stateFields(data).name.val).first`),
    H3({id: "api-stateFields"}, "API reference: ", Symbol("vanX.stateFields")),
    ApiTable({
      signature: "vanX.stateFields(obj) => <an object for all underlying state fields of obj>",
      description: ["Given a reactive object ", Symbol("obj"), ", returns an object for all the underlying state fields of ", Symbol("obj"), ". For instance, if ", Symbol("obj"), " is ", InlineJs(`{a: 1, b: 2}`), ", ", InlineJs(`{a: van.state(1), b: van.state(2)}`), " will be returned."],
      parameters: {
        obj: "The input reactive object.",
      },
      returns: ["An object for all the underlying state fields of ", Symbol("obj"), "."],
    }),
    H3({id: "get-the-raw-field-value"}, "Get the raw field value without registering the dependency"),
    p(i("requires ", VanX(), " 0.3.0 or later.")),
    p("Similar to the ", SymLink("rawVal", "/tutorial#api-rawVal"), " property of ", VanJS(), " states. You can use ", Symbol("vanX.raw"), " for getting the raw field value without registering the dependency. For instance:"),
    Js("data.s = vanX.calc(() => vanX.raw(data).a + data.b)"),
    p("will make ", Symbol("data.s"), " updated when ", Symbol("data.b"), " changes, but ", Symbol("data.s"), " won't be updated when ", Symbol("data.a"), " changes. The same effect goes to derived states and side effects registered via ", SymLink("van.derive", "/tutorial#api-derive"), " as well as ", Symbol("State"), "-derived DOM nodes."),
    p("Note that, ", Symbol("vanX.raw"), " can access deeply nested fields without registering the dependency. For instance, you can use ", InlineJs("vanX.raw(data).a.a"), " to access the field ", InlineJs("data.a.a"), " without registering the dependency."),
    H3({id: "api-raw"}, "API reference: ", Symbol("vanX.raw")),
    ApiTable({
      signature: "vanX.raw(obj) => <an object for getting the field values of obj without registering the dependency>",
      description: ["Given a reactive object ", Symbol("obj"), ", returns an object whose field values equal to the field values of ", Symbol("obj"), ", but accessing its fields won't register the dependency."],
      parameters: {
        obj: "The input reactive object.",
      },
      returns: ["An object with which you can get the field values of ", Symbol("obj"), " without registering the dependency."],
    }),
    H3("Add reactivity to existing JavaScript classes"),
    p("It's possible to add reactivity to objects of existing JavaScript classes with the help of ", Symbol("vanX.reactive"), ". For instance, the code below adds the reactivity to a ", Symbol("Person"), " object:"),
    JsFile("name-existing-class.code.js"),
    p(Demo()),
    p({id: "demo-name-existing-class"}),
    p({
      id: "jsfiddle-name-existing-class",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {button, div, input} = van.tags",
      "data-suffix": "van.add(document.body, Name())",
      "data-css": "input { width: 90px; }\n",
    }),
    p({id: "caveat-no-reuse-reactive"}, Caveat(), "Once an object is turned reactive with ", Symbol("vanX.reactive"), ", you shouldn't access the original object anymore. Doing so will create the same issue as ", Link("aliasing", "#caveat-no-aliasing"), "."),
    p({id: "caveat-native-reactivity"}, Caveat(), "There might be issues if you try to add reactivity to a class implemented in native code (not in JavaScript), or a class from a 3rd party library. Example: ", Link("#156", "https://github.com/vanjs-org/van/issues/156"), "."),
    H3("A comprehensive example"),
    p("You can refer to this ", Link("file", "https://github.com/vanjs-org/van/blob/main/x/examples/reactive/src/main.js"), " for a comprehensive demo of all the features regarding to reactive objects discussed above. You can preview the app via ", Link("CodeSandbox", "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/x/examples/reactive?file=%2Fsrc%2Fmain.js%3A1%2C1"), "."),
    H2({id: "reactive-list"}, Symbol("vanX.list"), ": Reactive List that Minimizes Re-rendering on Updates"),
    p(Symbol("vanX.list"), " takes an input reactive object and builds a list of UI elements whose contents are updated whenever any field of the input reactive object changes. The input reactive object can either be an ", SymLink("Array", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"), " for non-keyed input, or a plain object for keyed input."),
    p("Let's first take a look at some simple examples."),
    p(Symbol("Array"), " for non-keyed input:"),
    Js(`const items = vanX.reactive([1, 2, 3])
return vanX.list(ul, items, v => li(v))
`),
    p("Plain object for keyed input:"),
    Js(`const items = vanX.reactive({a: 1, b: 2, c: 3})
return vanX.list(ul, items, v => li(v))
`),
    p("In both examples, ", InlineHtml("<ul><li>1</li><li>2</li><li>3</li></ul>"), " will be returned."),
    p("You can add, update, and delete entries in the reactive object ", Symbol("items"), ", and the rendered UI elements are bound to the changes while minimizing the re-rendering of the DOM tree. For instance, if you do the following changes to the ", Symbol("Array"), " example:"),
    Js(`++items[0]
delete items[1]
items.push(4)
`),
    p("the rendered UI elements will be updated to ", InlineHtml("<ul><li>2</li><li>3</li><li>4</li></ul>"), "."),
    p("For keyed object, the following changes will produce the same result:"),
    Js(`++items.a
delete items.b
items.d = 4
`),
    p("In addition, for ", Symbol("Array"), "-based input ", Symbol("items"), ", you can call ", SymLink("shift", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift"), ", ", SymLink("unshift", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift"), " and ", SymLink("splice", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"), " as you would normally do to an array. The rendered UI elements are guaranteed to be in sync. For instance, after executing the following code:"),
    Js(`const items = vanX.reactive([1, 2, 3])
const dom = vanX.list(ul, items, v => li(v))

items.shift()
items.unshift(4)
items.splice(1, 1, 5)
`),
    p(Symbol("dom"), " will become ", InlineHtml("<ul><li>4</li><li>5</li><li>3</li></ul>"), "."),
    H3({id: "api-list"}, "API Reference: ", Symbol("vanX.list")),
    ApiTable({
      signature: "vanX.list(container, items, itemFunc) => <the root element of the created DOM tree>",
      description: ["Creates a DOM tree for a list of UI elements based on the input reactive object ", Symbol("items"), "."],
      parameters: {
        container: ["Can be a ", Link("tag function", "/tutorial#api-tags"), " or a DOM element for the container element of the list of UI elements.",
          ul(
            li("If ", Symbol("container"), " is a tag function, such as ", InlineJs("van.tags.ul"), " it means we want to create a ", InlineHtml("<ul>"), " element as the container of the list. Indeed, any function that returns a DOM element can be passed as the ", Symbol("container"), " argument."),
            li(i("(requires ", VanX(), " 0.4.0 or later)"), " If ", Symbol("container"), " is a DOM element, it will be used directly as the container of the list. Usually, this is useful to specify the container element with some customized property values, such as ", InlineJs('div({class: "item-list"})'), " for ", InlineHtml('<div class="item-list">'), "."),
          ),
        ],
        items: ["A reactive object that holds the data for the list. Can be an ", Symbol("Array"), " (for non-keyed input) or a plain object (for keyed input)."],
        itemFunc: ["The function (", InlineJs("(v, deleter, k) => Node"), ") that is used to generate the UI element (or rarely, text node) for each list item. The function takes the following parameters:", ul(
          li(Symbol("v"), " - A ", Symbol("State"), " object corresponding to each list item. You can directly use it as a ", Symbol("State"), "-based ", Link("property", "/tutorial#state-typed-prop"), " / ", Link("child node", "/tutorial#state-typed-child"), ", read its value for building the UI element, and/or set its value in some event handlers."),
          li(Symbol("deleter"), " - a function (", InlineJs("() => void"), ") that can be used in the event handler to delete the entire item. Typically the ", Symbol("deleter"), " function can be used as the ", Symbol("onclick"), " handler of a deletion button."),
          li(Symbol("k"), " - ", i("(requires ", VanX(), " 0.2.0 or later)"), " the key of the corresponding list item, which is the index if ", Symbol("items"), " is an ", Symbol("Array"), " or the property key if ", Symbol("items"), " is a plain object."),
        )],
      },
      returns: "The root element of the created DOM tree.",
    }),
    H3("A simplified TODO App"),
    p("Now, let's take a look at a practical example: The ", Link("Fully Reactive TODO App", "/demo#todo-app"), " in ", Link("VanJS by Example", "/demo"), " page can be re-implemented with the help of ", Symbol("vanX.list"), ". We can see how a 40+ lines of code is simplified to just over 10 lines:"),
    JsFile("todo-app.code.js"),
    p(Demo()),
    p({id: "demo-todo-list"}),
    p({
      id: "jsfiddle-todo-list",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, button, del, div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    p("You might notice how easy it is to serialize/deserialize a complex reactive object into/from external storage. This is indeed one notable benefit of reactive objects provided by ", SymLink("vanX.reactive", "#reactive-object"), "."),
    H3("Holes in the array"),
    p("Deleting items in the reactive array will create ", Link("holes", "https://2ality.com/2015/09/holes-arrays-es6.html"), " inside the array, which is an uncommon situation in JavaScript. Basically, if we execute the following code:"),
    Js(`const a = [1, 2, 3]
delete a[1]
`),
    p(Symbol("a"), " will become ", Symbol("[1, empty, 3]"), ". Note that, ", Symbol("empty"), " is different from ", SymLink("undefined", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined"), ". When we do:"),
    Js("for (const key in a)"),
    p(" or use higher-order functions like ", SymLink("map", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"), " or ", SymLink("filter", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"), ", holes will be skipped in the enumeration."),
    p("Why do we allow holes in the array? Short answer: to minimize the re-rendering of DOM elements. Let's say if we have a reactive array: ", Symbol("[1, 2, 3, 4, 5]"), ", and the 3rd item is deleted by the user. If we allow holes, the array will become ", Symbol("[1, 2, empty, 4, 5]"), ". Based on how DOM elements are bound to the reactive array, only the 3rd element needs to be removed. However, if we don't allow holes, the array will become ", Symbol("[1, 2, 4, 5]"), ", then we need 3 DOM updates:"),
    ol(
      li("3rd DOM element: ", Symbol("3"), " -> ", Symbol("4"), ""),
      li("4th DOM element: ", Symbol("4"), " -> ", Symbol("5"), ""),
      li("Remove the 5th DOM element.")
    ),
    p("In the TODO app above, we are calling ", SymLink("vanX.compact", "#remove-holes-in-reactive-object"), " before serializing ", Symbol("items"), " to the JSON string via ", InlineJs("JSON.stringify"), ". This is because holes are turned into ", SymLink("null", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null"), " values in the result JSON string and cause problems when the JSON string is deserialized (See a ", Link("detailed explanation here", "https://github.com/vanjs-org/van/discussions/144#discussioncomment-7342023"), ")."),
    p({id: "caveat-array-holes"}, Caveat(), "Because of holes in the reactive array, the ", Symbol("length"), " property can't reliable tell the number of items in the array. You can use ", InlineJs("Object.keys(items).length"), " instead as in the ", Link("example below", "#example-1-sortable-list"), "."),
    H2(Symbol("vanX.replace"), ": Update, Insert, Delete and Reorder Items in Batch"),
    p("In addition to updating the ", Symbol("items"), " object one item at a time, we also provide the ", Symbol("vanX.replace"), " function that allows you to update, insert, delete and reorder items in batch. The ", Symbol("vanX.replace"), " function takes a reactive object - ", Symbol("target"), ", and a replace function (or another object) - ", Symbol("source"), ", as its input parameters. ", Symbol("vanX.replace"), " is responsible for updating the ", Symbol("target"), " object as well as UI elements bound to it based on the new data provided by ", Symbol("source"), ". Let's take a look at a few examples:"),
    Js(`// Assume we have a few TODO items as following:
const todoItems = vanX.reactive([
  {text: "Implement VanX", done: true},
  {text: "Test VanX", done: false},
  {text: "Write a tutorial for VanX", done: false},
])

// Directly specify the source object
const refreshItems = () => vanX.replace(todoItems, [
  {text: "Publishing VanX", done: true},
  {text: "Refining VanX", done: false},
  {text: "Releasing a new version of VanX", done: false},
])

// To delete items in batch
const clearCompleted = () => vanX.replace(todoItems, l => l.filter(v => !v.done))

// To update items in batch
const appendText = () =>
  vanX.replace(todoItems, l => l.map(v => ({text: v.text + "!", done: v.done})))

// To reorder items in batch
const sortItems = () =>
  vanX.replace(todoItems, l => l.toSorted((a, b) => a.localeCompare(b)))

// To insert items in batch
const duplicateItems = () => vanX.replace(todoItems,
  l => l.flatMap(v => [v, {text: v.text + " copy", done: v.done}]))
`),
    H3({id: "api-replace"}, "API reference: ", Symbol("vanX.replace")),
    ApiTable({
      signature: "vanX.replace(target, source) => target",
      description: ["Updates the reactive object ", Symbol("target"), " and UI elements bound to it based on the data provided by ", Symbol("source"), "."],
      parameters: {
        target: "The reactive object that you want to update.",
        source: ["Can be a plain array / object, or a function.",
          ul(
            li(i("(requires ", VanX(), " 0.4.0 or later)"), " If ", Symbol("source"), " is a plain array / object, directly update ", Symbol("target"), " with the values provided in ", Symbol("source"), "."),
            li("If ", Symbol("source"), " is a function, it will take the current values of ", Symbol("target"), " as input and returns the new values of the update. The input parameter of the function depends on the type of ", Symbol("target"), ". If ", Symbol("target"), " is an array (for non-keyed data), ", Symbol("source"), " will take its values as an array (after eliminating ", Link("holes", "#holes-in-the-array"), ") and return the updated values as another array. If ", Symbol("target"), " is a plain object (for keyed data), ", Symbol("source"), " will take its values as an array of key value pairs (the data you would get with ", InlineJs("Object.entries(items)"), ") and return the updated values as another array of key value pairs."),
          ),
        ],
      },
      returns: InlineTs("target"),
    }),
    p({id: "caveat-no-calc-fields-in-replace"}, Caveat(), Link("Calculated fields", "#calculated-fields"), " are not allowed in ", Symbol("target"), " and ", Symbol("source"), "."),
    H3("Example 1: sortable list"),
    p("Let's look at a sample app that we can build with ", Symbol("vanX.list"), " and ", Symbol("vanX.replace"), " - a list that you can add/delete items, sort items in ascending or descending order, and append a string to all items in the list:"),
    JsFile("list1.code.js"),
    p(Demo()),
    p({id: "demo-example-list1"}),
    p({
      id: "jsfiddle-example-list1",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, button, div, input, li, ul} = van.tags",
      "data-suffix": "van.add(document.body, List())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H3("Example 2: an advanced sortable TODO list"),
    p("Now, let's take a look at a more advanced example - a sortable TODO list, which is implemented with keyed data. i.e.: reactive ", Symbol("items"), " is a plain object instead of an array. In additional to the addition, deletion, sorting and appending strings that are implemented in the previous example, you can edit an item, mark an item as complete, clear all completed items and duplicate the entire list. Furthermore, the application state is serialized and persisted into ", SymLink("localStorage", "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"), " thus the state is preserved across page loads."),
    JsFile("list2.code.js"),
    p(Demo()),
    p({id: "demo-example-list2"}),
    p({
      id: "jsfiddle-example-list2",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, button, div, input} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H3(Symbol("vanX.list"), " for calculated fields"),
    p(i("requires ", VanX(), " 0.4.0 or later.")),
    p(SymLink("vanX.list", "#reactive-list"), " can take a ", Link("calculated field", "#calculated-fields"), " as ", Symbol("items"), " parameter. Whenever the calculated field is updated, ", Symbol("vanX.replace"), " will be called internally to update the reactive list, as well as all UI elements bound to it. Below is an example which leverages this technique to build a filterable list:"),
    JsFile("calc-list.code.js"),
    p({
      id: "jsfiddle-calc-list",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {div, input, li, ul} = van.tags",
      "data-suffix": "van.add(document.body, FilteredCountries())",
    }),
    H2("Global App State and Serialization"),
    p("With ", VanX(), ", it's possible consolidate the entire app state into a single reactive object, as reactive objects can hold states in arbitrary nested hierarchies. Below is the code for an upgraded version of the ", Link("TODO App", "#a-simplified-todo-app"), " above, which allows the text of the input box to be persisted in ", Symbol("localStorage"), " as well:"),
    JsFile("todo-app-plus.code.js"),
    p(Demo()),
    p({id: "demo-todo-list-plus"}),
    p({
      id: "jsfiddle-todo-list-plus",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, button, del, div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, TodoListPlus())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H3("Smart diff / update in ", Symbol("vanX.replace")),
    p("When ", Symbol("vanX.replace"), " updates the reactive object ", Symbol("target"), ", it will traverse the entire object tree, do a diff between ", Symbol("source"), " and ", Symbol("target"), ", and only update leaf-level fields with different values. Thus, you can call ", Symbol("vanX.replace"), " to replace the entire app state object, and ", VanX(), " guarantees at the framework level that the minimum amount updates are applied to the reactive object and thus the DOM tree bound to it."),
    p("For instance, if ", Symbol("appState"), " in the example above has the following value:"),
    Json(`{
  "input": "New Item",
  "items": [
    {"text": "Item 1", "done": true},
    {"text": "Item 2", "done": false}
  ]
}
`),
    p("Calling"),
    Js(`vanX.replace(appState, {
  input: "New Item",
  items: [
    {text: "Item 1", done: true},
    {text: "Item 2", done: true},
  ]
})
`),
    p("will only get the ", Symbol("done"), " field of 2nd element in ", Symbol("items"), " updated. i.e.: it's equivalent to ", InlineJs("appState.items[1].done = true"), "."),
    H3("Server-driven UI (SDUI) with ", VanX()),
    H2("API Index"),
    p("Below is the list of all top-level APIs in ", VanX(), ":"),
    ul(
      li(SymLink("vanX.reactive", "#api-reactive")),
      li(SymLink("vanX.calc", "#api-calc")),
      li(SymLink("vanX.stateFields", "#api-stateFields")),
      li(SymLink("vanX.raw", "#api-raw")),
      li(SymLink("vanX.list", "#api-list")),
      li(SymLink("vanX.replace", "#api-replace")),
    )
  )
}
