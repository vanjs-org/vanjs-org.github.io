import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {b, div, i, img, li, p, ul} = tags

  const {H1, H2, Js, Link, MiniVan, Symbol, VanJS} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": About"),
    H2({id: "story"}, "Meet the Author - the Story behind VanJS"),
    div({style: "overflow: auto;"},
      img({style: "float: left; width: 150px; margin-right: 20px;",
        src: "/tao.jpeg", alt: "Tao Xin"}),
      p("Hello all,"),
      p("I'm ", Link("Tao Xin (辛韬)", "https://www.linkedin.com/in/tao-xin-64234920/"), ", a senior staff software engineer at Google, and I'm the founder of ", VanJS(), ". I would like to talk about 2 central questions about ", VanJS(), ": What ", VanJS(), " really is, and why I think it's good to the world."),
      p("So, what is ", VanJS(), "? Well, it's a reactive UI framework. It's ", b("more than 100 times"), " smaller than React. It doesn't require installation, configuration, dependencies or transpiling to use. But I think, in a nutshell, the best way to describe it is: ", i(VanJS(), " is the ", b("scripting language"), " for UI, just like ", Symbol("bash"), " is the scripting language for terminal.")),
      p("Ever since the birth of GUI, there is no shortage of UI frameworks: MFC, Win Form, WPF, Qt, Flutter, SwiftUI, Jetpack Compose, React, React Native, to name a few. They enabled us to build highly sophisticated UI apps. But on the other hand, frameworks and tools themselves could be the entry barrier for UI programming: high-specialized IDEs, lengthy tutorials, mysterious problems that might arise here and there, being forced to program in a designated style, and most importantly, ONLY people with specialized skills can work on it. Even JavaScript, with \"", i("Script"), "\" in its name, is trying to become a compiled language: JSX, TSX, transpiling, and plugins/extensions to allow us to work with the transpiled code."),
      p("On the flip side, the default way for programmers to interact with computers remains the same for over 50 years - shells, CLI programs, and sometimes, ASCII arts. Why? Is terminal inherently better than GUI? Or does it just make programmers look cooler? I think the foundamental reason that lies behind, is the power of scripting, the power to start coding immediately in any environment, the power to build useful things with just a few lines of code, the power to easily assemble various code snippets together."),
      p(i("Being the scripting language for UI"), ", is the foundamental principle that guides the design of ", VanJS(), ". It's based on JavaScript so that it can work in as many environments as possibles, not only for websites, but also for webviews which most major OSes support. It has declarative composing API and reactive state binding as it enables an easier way to describe comprehensive UI logic within just a few lines of code. It has strictly 0 dependencies so that it can be used right after the code is typed. It's JSX-free thus REPL can be easily done in the browser console."),
      p("So, why is ", VanJS(), " good to the world? I think the world needs a scripting way to build UI, and there are way more scenarios where UI can be more beneficial than people might have realized, for personal utilities, for teamwide tools, and for user-facing products as well. We are quite used to the categorization between front-end engineers and back-end engineers, and we are quite used to the notion that back-end engineers will never do UI. We think only a very small number of people need to know how to build UI."),
      p("But, is it really the case? I've been a back-end engineer for more than a decade. I had been leading a team which manages 100+ data processing pipelines and datasets produced by them. I felt, for many times, that we really needed a way to visualize the status of the pipelines and datasets. \"", i("But, ..."), "\", pushbacks would immediately arise after the idea, \"", i("We're not a front end team. We shouldn't do it. We don't have the expertise."), "\", I think here, \"", i("We don't have the expertise"), "\", doesn't really mean the team is not technical capable of programming the UI logic. What it actually means is, \"", i("We don't really have the experience of dealing with mysterious, and oftentimes undocumented issues here and there that might only occur in our specific development environment, and we can't accurately estimate the amount of time needed to get them resolved."), "\" We tried to hire an intern to do the work, but the work couldn't finish because of waves of issues in the internal build systems."),
      p("I am never a front-end engineer, and I haven't used any UI framework. But I built lots of UI apps, and I will continue doing it, in a scripting way. And I believe anyone can do that as well."),
      p("I'm hoping open sourcing ", VanJS(), " can help us one step closer to that vision. Hope you can enjoy!"),
      p("Thanks!"),
      p("-- Tao Xin")
    ),
    H2("Copyright and Compliance Disclaimer"),
    p(VanJS(), " was built by Tao Xin during his personal time while being employed as a full-time employee at Google. The project was submitted to Invention Assignment Review Committee at Google where Google, upon reviewing the designated scopes, waived its copyright claims. Thus the copyright of ", VanJS(), " belongs to its creater, all rights reserved. ", VanJS(), " is open sourced under MIT license. ", VanJS(), " aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever."),
    p("The project was developed, and will be maintained with strict compliance to Google's Outside Work Guidelines as well as requirements imposed by Google's copyright waiver. ", VanJS(), " was created, and will continue to be maintaned, without any use of internal Alphabet resources, including but not limited to, corporate hardware equipments, software licenses, internal tools, internal corporate mailing lists, corporate accounts, propriatory or confidential information, trademarks or brand features of any Alphabet company. Alphabet does not sponsor, endorse or in any form affiliate with ", VanJS(), " project. To comply with the conflict of interests provisions, Tao Xin does not advocate the adoption of ", VanJS(), " within Alphabet."),
    H2({id: "reliability"}, "How Do We Ensure the Reliability of VanJS?"),
    p("We're hoping to achieve ", VanJS(), " ", Symbol("1.0"), " soon, which will mean the commitment to API stability. Meanwhile, as a new UI framework, we put heavy focus on the reliability of the framework."),
    p("For every single release of ", VanJS(), ", below is the list of tests that will be run through:"),
    ul(
      li("A browser-based test suite, with 300+ test cases, covering different versions of ", VanJS(), " files (", Symbol(".min.js"), ", ", Symbol(".debug.js"), ", ", Symbol(".nomodule.min.js"), ", etc.), including the coverage of advanced behavior such as ", Link("garbage collection", "/advanced#gc"), ", as well as error messages shown in the debug mode."),
      li("Examples used in ", Link("VanJS tutorial", "/tutorial"), " are also covered in the browser-based test suite."),
      li("The browser-based test suite was implemented in TypeScript, thus TypeScript integration is covered."),
      li(Link("Sample applications", "/demo"), " will keep working in every single ", VanJS(), " release, including applications implemented in TypeScript (which covers TypeScript integration)."),
    ),
    p("For every single release of ", MiniVan(), ", below is the list of tests that will be run through:"),
    ul(
      li("A browser-based test suite, with 40+ test cases, covering different versions of ", MiniVan(), " files (", Symbol(".min.js"), ", ", Symbol(".nomodule.min.js"), ", etc.)"),
      li("The browser-based test suite was implemented in TypeScript, thus TypeScript integration is covered."),
      li("A Deno test suite for ", Symbol("van-plate"), " mode, covering Deno integration."),
      li("The entire site of vanjs.org was generated with ", MiniVan(), " with TypeScript files defining all web pages. Source code can be found ", Link("here", "https://github.com/vanjs-org/vanjs-org.github.io/tree/master/sitegen"), "."),
    ),
    H2({id: "coding-style"}, "A Note on Coding Styles"),
    p("The sample code snippets throughout this website follow a minimalist approach when it comes to coding styles. When readability is not impacted, we are leaning towards the choice that leads to more concise code, with the belief that brevity and simplicity generally make the code easier to read and write. This means that we're consciously choosing certain coding styles throughout this website: such as omitting optional semicolons, naked if statements, usage of ternary operator when appropriate, etc."),
    p("On the other hand, we acknowledge that different people might hold a somewhat different opinion regarding certain coding style choices, and some are among hotly debated issues among programmers. We understand the arguments from the other side that certain coding styles, might occasionally lead to slightly more misleading error messages for incorrect implementation in limited situations. As an ", b("unopinionated"), " framework, ", VanJS(), " doesn't take side on coding styles. If some style in the sample code doesn't align with your personal preference or your team's common practice, feel free to make the corresponding styling changes after copy/past-ing the sample code."),
    H2({id: "name"}, "How Did VanJS Get Its Name?"),
    p(VanJS(), " is short for ", b("Van"), "illa ", b("J"), "ava", b("S"), "ript, which is a metaphor that ", VanJS(), " provides an abbreviated way to write Vanilla JavaScript code. Meanwhile, the logo of ", VanJS(), " is a symbolic vanilla icecream, which means ", VanJS(), " = ", b("Vanilla"), " JavaScript + syntax ", b("Sugar"), "."),
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
