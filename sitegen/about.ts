import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {b, blockquote, br, div, i, img, li, p, ul}} = van.vanWithDoc(doc)
  const {H1, H2, InlineHtml, InlineJs, Js, Link, MiniVan, Quote, SymLink, Symbol, Url, VanJS, VanX} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": About"),
    blockquote(i("大道至简 (The profound truth is utmost simplicity)")),
    H2({id: "story"}, "Meet the Author - the Story behind VanJS"),
    div({style: "overflow: auto;"},
      img({style: "float: left; width: 150px; margin-right: 20px;",
        src: "/tao.jpeg", alt: "Tao Xin"}),
      p("Hello all,"),
      p("I'm ", Link("Tao Xin (辛韬)", "https://www.linkedin.com/in/tao-xin-64234920/"), ", a senior staff software engineer at Google, and I'm the founder of ", VanJS(), ". I would like to talk about 2 central questions about ", VanJS(), ": What ", VanJS(), " really is, and why I think it's good to the world."),
      p("So, what is ", VanJS(), "? Well, it's a reactive UI framework. It's ", b("more than 100 times"), " smaller than React. It doesn't require installation, configuration, dependencies or transpiling to use. But I think, in a nutshell, the best way to describe it is: ", i(VanJS(), " is the ", b("scripting language"), " for UI, just like ", Symbol("bash"), " is the scripting language for terminal.")),
      p("Ever since the birth of GUI, there is no shortage of UI frameworks: MFC, Win Form, WPF, Qt, Flutter, SwiftUI, Jetpack Compose, React, React Native, to name a few. They enabled us to build highly sophisticated UI apps. But on the other hand, frameworks and tools themselves could be the entry barrier for UI programming: high-specialized IDEs, lengthy tutorials, mysterious problems that might arise here and there, being forced to program in a designated style, and most importantly, ONLY people with specialized skills can work on it. Even JavaScript, with \"", i("Script"), "\" in its name, is trying to become a compiled language: JSX, TSX, transpiling, and plugins/extensions to allow us to work with the transpiled code."),
      p("On the flip side, the default way for programmers to interact with computers remains the same for over 50 years - shells, CLI programs, and sometimes, ASCII arts. Why? Is terminal inherently better than GUI? Or does it just make programmers look cooler? I think the fundamental reason that lies behind, is the power of scripting, the power to start coding immediately in any environment, the power to build useful things with just a few lines of code, the power to easily assemble various code snippets together."),
      p(i("Being the scripting language for UI"), ", is the fundamental principle that guides the design of ", VanJS(), ". It's based on JavaScript so that it can work in as many environments as possibles, not only for websites, but also for webviews which most major OSes support. It has declarative composing API and reactive state binding as it enables an easier way to describe comprehensive UI logic within just a few lines of code. It has strictly 0 dependencies so that it can be used right after the code is typed. It's JSX-free thus REPL can be easily done in the browser console."),
      p("So, why is ", VanJS(), " good to the world? I think the world needs a scripting way to build UI, and there are way more scenarios where UI can be more beneficial than people might have realized, for personal utilities, for teamwide tools, and for user-facing products as well. We are quite used to the categorization between front-end engineers and back-end engineers, and we are quite used to the notion that back-end engineers will never do UI. We think only a very small number of people need to know how to build UI."),
      p("But, is it really the case? I've been a back-end engineer for more than a decade. I had been leading a team which manages 100+ data processing pipelines and datasets produced by them. I felt, for many times, that we really needed a way to visualize the status of the pipelines and datasets. \"", i("But, ..."), "\", pushbacks would immediately arise after the idea, \"", i("We're not a front end team. We shouldn't do it. We don't have the expertise."), "\", I think here, \"", i("We don't have the expertise"), "\", doesn't really mean the team is not technical capable of programming the UI logic. What it actually means is, \"", i("We don't really have the experience of dealing with mysterious, and oftentimes undocumented issues here and there that might only occur in our specific development environment, and we can't accurately estimate the amount of time needed to get them resolved."), "\" We tried to hire an intern to do the work, but the work couldn't finish because of waves of issues in the internal build systems."),
      p("I am never a front-end engineer, and I haven't used any UI framework. But I built lots of UI apps, and I will continue doing it, in a scripting way. And I believe anyone can do that as well."),
      p("I'm hoping open sourcing ", VanJS(), " can help us one step closer to that vision. Hope you can enjoy!"),
      p("Thanks!"),
      p("-- Tao Xin"),
      Quote({text: ['"Who do you truly serve?"', br(), '"The Realm. Someone must."'], source: "George R. R. Martin, Game of Thrones: S1E8"}),
    ),
    H2("Copyright and Compliance Disclaimer"),
    p(VanJS(), " was built by Tao Xin during his personal time while being employed as a full-time employee at Google. The project was submitted to Invention Assignment Review Committee at Google where Google, upon reviewing the designated scopes, waived its copyright claims. Thus the copyright of ", VanJS(), " belongs to its creator, all rights reserved. ", VanJS(), " is open sourced under MIT license. ", VanJS(), " aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever."),
    p("The project was developed, and will be maintained with strict compliance to Google's Outside Work Guidelines as well as requirements imposed by Google's copyright waiver. ", VanJS(), " was created, and will continue to be maintained, without any use of internal Alphabet resources, including but not limited to, corporate hardware equipments, software licenses, internal tools, internal corporate mailing lists, corporate accounts, proprietary or confidential information, trademarks or brand features of any Alphabet company. Alphabet does not sponsor, endorse or in any form affiliate with ", VanJS(), " project. To comply with the conflict of interests provisions, Tao Xin does not advocate the adoption of ", VanJS(), " within Alphabet."),
    H2({id: "reliability"}, "How Do We Ensure the Reliability of VanJS?"),
    p("As a new UI framework, we put heavy focus on the reliability of the framework. For every single release of ", VanJS(), ", below is the list of tests that we will run through:"),
    ul(
      li("A browser-based test suite, with 500+ test cases, covering different versions of ", VanJS(), " files (", Symbol(".min.js"), ", ", Symbol(".debug.js"), ", ", Symbol(".nomodule.min.js"), ", etc.), including the coverage of advanced behavior such as ", Link("garbage collection", "/advanced#gc"), ", as well as error messages shown in the debug mode."),
      li("Examples used in ", Link("VanJS tutorial", "/tutorial"), " are also covered in the browser-based test suite."),
      li("The browser-based test suite was implemented in TypeScript, thus TypeScript integration is covered."),
      li(Link("Sample applications", "/demo"), " will keep working in every single ", VanJS(), " release, including applications implemented in TypeScript (which covers TypeScript integration)."),
    ),
    p("For every single release of ", MiniVan(), ", below is the list of tests that we will run through:"),
    ul(
      li("A browser-based test suite, with 60 test cases, covering different versions of ", MiniVan(), " files (", Symbol(".min.js"), ", ", Symbol(".nomodule.min.js"), ", etc.)."),
      li("The browser-based test suite was implemented in TypeScript, thus TypeScript integration is covered."),
      li("A Deno test suite for ", Symbol("van-plate"), " mode, covering Deno integration."),
      li("The entire site of vanjs.org was generated with ", MiniVan(), " with TypeScript files defining all web pages. Source code can be found ", Link("here", "https://github.com/vanjs-org/vanjs-org.github.io/tree/master/sitegen"), "."),
    ),
    p("For every single release of ", VanX(), ", below is the list of tests that we will run through:"),
    ul(
      li("A browser-based test suite, with 100+ test cases, covering different versions of ", VanX(), " files, including the coverage of advanced behavior such as ", Link("garbage collection", "/advanced#gc"), "."),
      li("The browser-based test suite was implemented in TypeScript, thus TypeScript integration is covered."),
      li("Sample applications in ", Url("https://vanjs.org/x"), " will keep working in every single ", VanX(), " release."),
    ),
    H2({id: "coding-style"}, "A Note on Coding Styles"),
    p("The sample code snippets throughout this website follow a minimalist approach when it comes to coding styles. When readability is not impacted, we are leaning towards the choice that leads to more concise code, with the belief that brevity and simplicity generally make the code easier to read and write. This means that we're consciously choosing certain coding styles throughout this website: such as omitting optional semicolons, naked if statements, usage of ternary operator when appropriate, etc."),
    p("On the other hand, we acknowledge that different people might hold a somewhat different opinion regarding certain coding style choices, and some are among hotly debated issues among programmers. We understand the arguments from the other side that certain coding styles, might occasionally lead to slightly more misleading error messages for incorrect implementation in limited situations. As an ", b("unopinionated"), " framework, ", VanJS(), " doesn't take side on coding styles. If some style in the sample code doesn't align with your personal preference or your team's common practice, feel free to make the corresponding styling changes after copy/past-ing the sample code."),
    H2({id: "source-guide"}, "A Guide to Reading VanJS Codebase"),
    p("We believe that ", VanJS(), " is a good illustration of how modern UI frameworks work under the hood. The simplicity in its design, and conciseness in its implementation make it the perfect learning material for the core fundamentals of reactive UI programming, as well as advanced techniques in modern JavaScript. Here we recommend this ", Link("7-minute video", "https://www.youtube.com/watch?v=Oh2IEVqarHs"), " which breaks down and elucidates the underlying principles of ", VanJS(), " codebase."),
    p("On the other hand, we do realize that some parts of ", VanJS(), " codebase might be hard to read for some people. We believe that this is mostly because ", VanJS(), " has chosen some programming techniques and language constructs that are not frequently used in the JavaScript community, despite their usefulness. Here we provide a brief explanation of those in the hope of easing the understanding of ", VanJS(), " codebase, its official extensions, and its sample applications."),
    p("JavaScript language features:"),
    ul(
      li(SymLink("Proxy", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"), ": A type of JavaScript objects that allow you to intercept and redefine common operations of another object, such as getting and setting properties. The ", Symbol("van.tags"), " object in ", VanJS(), " leverages this technique to allow you declaring DOM trees like HTML but without the need of JSX. The operation of getting any properties of ", Symbol("van.tags"), " will be intercepted and redefined to a function that creates an HTML element with the property name as its tag name. e.g.: ", InlineJs("van.tags.div()"), " will create a ", InlineHtml("<div>"), " element. In addition, the ", Link("reactive object", "/x#reactive-object"), " in ", VanX(), " leverages ", Symbol("Proxy"), " so that getting and setting its fields will be redefined to getting and setting values of the underlying states."),
      li(Link("prototype", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes"), ": The foundation of OOP in JavaScript. Any object in JavaScript can specify a prototype object so that property access falls back to the prototype if the property doesn't exist in the object itself. Prototype is a lightweight alternative to ", Link("classes", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"), " in JavaScript. ", VanJS(), " is using prototype instead of classes to keep its size small."),
    ),
    p("Less frequently used JavaScript syntaxes:"),
    ul(
      li(Link("Ternary operator", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator"), ": Ternary operator is way to define conditional computations. Sometimes it can be used as an alternative to ", Symbol("if...else"), " statement for more concise and declarative code. For instance, the following code:", Js(`const getFruits(hasApple, hasOrange) = () => {
  const fruits = []
  if (hasApple) {
    fruits.push("apple")
  }
  if (hasOrange) {
    fruits.push("orange")
  }
  return fruits
}
`), " can be simplified with ternary operators:", Js(`const getFruits(hasApple, hasOrange) = () => [].concat(
  hasApple ? "apple" : [],
  hasOrange ? "orange": [],
)
`), "Even more complex ", Symbol("if...else if...else"), " statement can be simplified with ternary operators as well. For instance, the following code in the ", SymLink("Calculator App", "/demo#calculator"), ":", Js(`const calc = (lhs, op, rhs) =>
  !op || lhs === null ? rhs :
  op === "+" ? lhs + rhs :
  op === "-" ? lhs - rhs :
  op === "x" ? lhs * rhs : lhs / rhs
`), " is the simplified version of:", Js(`const calc = (lhs, op, rhs) => {
  if (!op || lhs === null) {
    return rhs
  } else if (op === "+") {
    return lhs + rhs
  } else if (op === "-") {
    return lhs - rhs
  } else if (op === "x") {
    return lhs * rhs
  } else {
    return lhs / rhs
  }
}
`)),
      li(Link("Comma operator (,)", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator"), ": Comma operator evaluates each of its operands sequentially and returns the last value. ", VanJS(), " leverages comma operators in a few places to make the code concise. For instance, the logic of binding a state to a DOM property:", Js(`bind(() => {
  setter(v.val)
  return dom
})
`), " is simplified to ", InlineJs("bind(() => (setter(v.val), dom))"), " in ", SymLink("van.js", "https://github.com/vanjs-org/van/blob/main/src/van.js"), " (don't confuse this with calling a function with 2 arguments)."),
      li(Link("Nullish coalescing operator (??)", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing"), ": Nullish coalescing expression ", InlineJs("a ?? b"), " means:", Js(`if (a !== null && a !== undefined) {
  return a
} else {
  return b
}
`), VanJS(), " leverages this operator in a few places to simplify code. One notable example in ", SymLink("van.js", "https://github.com/vanjs-org/van/blob/main/src/van.js"), " is function ", Symbol("addAndScheduleOnFirst"), ":", Js(`let addAndScheduleOnFirst = (set, s, f, waitMs) =>
  (set ?? (setTimeout(f, waitMs), new Set)).add(s)
`), "which is equivalent to:", Js(`let addAndScheduleOnFirst = (set, s, f, waitMs) => {
  if (set === null || set === undefined) {
    setTimeout(f, waitMs)
    set = new Set
  }
  set.add(s)
  return set
}
`)),
      li(Link("Short-circuit evaluation for ", Symbol("&&"), " and ", Symbol("||"), "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation"), ": Sometimes, we're leveraging the short-circuit evaluation for ", Symbol("&&"), " and ", Symbol("||"), " to simplify code. For instance, in ", SymLink("van-x.js", "https://github.com/vanjs-org/van/blob/main/x/src/van-x.js"), ", ", InlineJs("refDelete(obj[statesSym], name) && onDelete(obj, name)"), " is equivalent to:", Js(`if (refDelete(obj[statesSym], name)) {
  onDelete(obj, name)
}
`)),
    ),
    H2({id: "name"}, "How Did VanJS Get Its Name?"),
    p(VanJS(), " is short for ", b("Van"), "illa ", b("J"), "ava", b("S"), "cript, which is a metaphor that ", VanJS(), " provides an abbreviated way to write Vanilla JavaScript code. Meanwhile, the logo of ", VanJS(), " is a symbolic vanilla ice cream, which means ", VanJS(), " = ", b("Vanilla"), " JavaScript + syntax ", b("Sugar"), "."),
    p("Under the hood, ", VanJS(), " stays truthful to Vanilla JavaScript as close as possible, as there is no transpiling, virtual DOM or any hidden logic. ", VanJS(), " code can be translated to Vanilla JavaScript code in a very straightforward way. For instance, the following ", VanJS(), " code:"),
    Js(`a({href: "https://vanjs.org"}, "🍦 VanJS")`),
    p("is just an abbreviated/sugared form of following code in Vanilla Javascript:"),
    Js(`const anchorDom = document.createElement("a")
anchorDom.href = "https://vanjs.org"
anchorDom.appendChild(new Text("🍦 VanJS"))
`),
    p("whereas"),
    Js(`ul(
  li("🗺️World"),
  li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
)
`),
    p("is an abbreviated/sugared form of:"),
    Js(`const listDom = document.createElement("ul")

const itemDom1 = document.createElement("li")
itemDom1.appendChild(new Text("🗺️World"))
listDom.appendChild(itemDom1)

const itemDom2 = document.createElement("li")
const anchorDom = document.createElement("a")
anchorDom.href = "https://vanjs.org"
anchorDom.appendChild(new Text("🍦 VanJS"))
itemDom2.appendChild(anchorDom)
listDom.appendChild(itemDom2)
`),
  )
}
