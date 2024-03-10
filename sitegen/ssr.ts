import van, { ChildDom as TypedChildDom } from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument, Element, Text } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

type ChildDom = TypedChildDom<Element, Text>

export default (doc: HTMLDocument) => {
  const {tags: {b, div, i, img, li, ol, p, ul}} = van.vanWithDoc(doc)
  const {ApiTable, Code, H1, H2, H3, InlineHtml, InlineTs, Json, Link, MiniVan, Shell, SymLink, Symbol, Ts, TsFile, VanJS} = common(doc)

  const codeUrlBase = "https://github.com/vanjs-org/vanjs-org.github.io/tree/master/hydration-example"
  const previewUrl = "https://codesandbox.io/p/sandbox/github/vanjs-org/vanjs-org.github.io/tree/master/hydration-example?file=%2Fsrc%2Fserver.ts%3A1%2C1"

  const Folder = (name: string, ...rest: ChildDom[]) =>
    li({class: "folder"}, Symbol(name), ...rest)
  const File = (name: string, path: string, ...rest: ChildDom[]) =>
    li({class: "file"}, SymLink(name, codeUrlBase + path + name), ...rest)
  const NpmLink = (name: string) => Link(name, "https://www.npmjs.com/package/" + name)

  return div({id: "content"},
    H1(VanJS(), ": Fullstack Rendering (SSR, CSR and Hydration)"),
    p(i("Requires ", VanJS(), " ", Link("1.2.0", "https://github.com/vanjs-org/van/discussions/114"), " or later, and ", MiniVan(), " ", Link("0.4.0", "https://github.com/vanjs-org/mini-van/releases/tag/0.4.0"), " or later.")),
    p(VanJS(), " offers a seamless and framework-agnostic solution for fullstack rendering. We will provide a walkthrough for a sample application with SSR (server-side rendering), CSR (client-side rendering) and hydration. As an outline, here are the major steps we're going to take to build the sample application:"),
    ol(
      li("Define common UI components that can be shared on both server-side and client-side."),
      li("Implement server-side script with the help of ", MiniVan(), " for serving the HTML content to end users."),
      li("Implement client-side script with the help of ", VanJS(), " for adding client-side components and enabling hydration."),
    ),
    p("The sample application requires a bare minimum of dependencies. The server-side script can be run by Node.js. We can also build a fullstack application with other JavaScript runtime like Deno or Bun. Other front-end frameworks like Vite or Astro are not required, but it should be easy to integrate with them."),
    p("The source code of the sample application can be found ", Link("here", codeUrlBase), " with the following directory structure:"),
    ul({class: "dir-tree"},
      Folder("hydration-example", ": Root of the sample application.",
        ul(
          Folder("src", ": Source files of the application.",
            ul(
              Folder("components", ": Common components that are shared on both server-side and client-side.",
                ul(
                  File("hello.ts", "/src/components/", ": ", Symbol("Hello"), " component."),
                  File("counter.ts", "/src/components/", ": ", Symbol("Counter"), " component."),
                ),
              ),
              File("server.ts", "/src/", ": server-side script to serve the HTML content."),
              File("client.ts", "/src/", ": client-side script for client-side components and hydration."),
            ),
          ),
          Folder("dist", ": Bundled (and minified) client-side ", Symbol(".js"), " files."),
          File("package.json", "/", ": Basic information of the application. Primarily, it defines the NPM dependencies."),
        ),
      ),
    ),
    p("You can preview the sample application via ", Link("CodeSandbox", previewUrl), "."),
    p(i("A Bun-based variation of this example can be found "), Link("here", "https://github.com/vanjs-org/van/tree/main/bun-examples/hydration"), "."),
    H2(Symbol("package-lock.json"), " File"),
    p("Dependencies are declared in ", SymLink("package.json", codeUrlBase + "/package.json"), " file:"),
    Json(`  "dependencies": {
    "finalhandler": "^1.2.0",
    "mini-van-plate": "^0.5.6",
    "serve-static": "^1.15.0",
    "vanjs-core": "^1.5.0"
  }
`),
    ul(
      li(NpmLink("finalhandler"), " and ", NpmLink("serve-static"), ": Server-side packages for serving static files (primarily used for serving ", Symbol(".js"), " files)."),
      li(NpmLink("mini-van-plate"), ": The ", MiniVan(), " package used for SSR."),
      li(NpmLink("vanjs-core"), ": The ", VanJS(), " package used for CSR."),
    ),
    H2("Shared UI Components"),
    p("Now, let's build some shared UI components that can run on both server-side and client-side."),
    H3("Static Component"),
    p("First, let's take a look at a static (non-reactive) component - ", Symbol("Hello"), ":"),
    TsFile("hydration-example/src/components/hello.ts"),
    p("Compared to the ", SymLink("Hello", "/demo#hello-world"), " component in the \"VanJS by Example\" page, there are following notable differences:"),
    ul(
      li("The shared ", Symbol("Hello"), " component takes a ", Symbol("van"), " object as its input property. This is crucial to make ", Symbol("Hello"), " component cross-platform. Callers are responsible for providing the ", Symbol("van"), " object based on what's available in their specific environment so that the component can be agnostic to the execution environment. On the server-side, the ", Symbol("van"), " object from ", MiniVan(), " will be used (we can choose the ", Symbol("van"), " object from ", Symbol("van-plate"), " mode or from ", Symbol("mini-van"), " mode), whereas on the client-side, the ", Symbol("van"), " object from ", VanJS(), " will be used."),
      li("We can determine if the component is being rendered on the server-side or client-side:", Ts(`const fromServer = typeof window === "undefined"`), " and show different content based on it:", Ts('p(() => `👋Hello (from ${fromServer ? "server" : "client"})'), "This will help us differentiate whether the component is rendered from server or from client."),
    ),
    p("To help with typechecking if you're working with TypeScript, you can import the ", Symbol("VanObj"), " type from ", Symbol("mini-van-plate/shared"), " (part of the ", MiniVan(), " package: ", Link("source file", "https://github.com/vanjs-org/mini-van/blob/main/src/shared.ts"), ")."),
    p(b("Limitations: "), i("The typechecking for tag functions and ", Symbol("van.add"), " is quite limited. This is because it's hard to unify the type system across the common types between server-side and client-side.")),
    H3("Reactive Component"),
    p("Next, let's take a look at a reactive component - ", Symbol("Counter"), ":"),
    TsFile("hydration-example/src/components/counter.ts"),
    p("Notable differences from the ", SymLink("Counter", "/demo#counter"), " component in the \"VanJS by Example\" page:"),
    ul(
      li("Similar to the ", Symbol("Hello"), " component, it takes a ", Symbol("van"), " object as its input property to make the component environment-agnostic."),
      li("You can define states and bind states to DOM nodes as you normally do on the client-side. This is because in ", MiniVan(), " ", Symbol("0.4.0"), " release, we adjusted its implementation to make it compatible to states and state-bindings related API, though with the absence of reactively (i.e.: changing a state won't lead to the update of the DOM tree), which is only possible on the client-side after hydration."),
      li("You can optionally specify the ID of the component with the ", Symbol("id"), " property. This is helpful to locate the component while hydrating."),
      li("You can optionally specify the initial counter value (default: ", Symbol("0"), ") with the ", Symbol("init"), " property."),
      li("You can optionally specify the style of the increment/decrement buttons. As illustrated later, we will see how to make the button style of the ", Symbol("Counter"), " component reactive to user selection."),
      li("We keep the ", Symbol("data-counter"), " attribute of the component in sync with the current value of the counter. This will help us keep the counter value while hydrating."),
    ),
    H2("Server-Side Script: HTML Template"),
    p("Now, let's build the server-side script that enables SSR:"),
    TsFile("hydration-example/src/server.ts"),
    p("The script implements a basic HTTP server with the built-in ", Symbol("node:http"), " module (no web framework needed). You will probably first notice this line:"),
    Ts('if (req.url?.endsWith(".js")) return serveFile(req, res, finalhandler(req, res))'),
    p("This is to tell the HTTP server to serve the file statically if any ", Symbol(".js"), " file is requested."),
    p("The bulk of the script is declaring the DOM structure of the page that is enclosed in ", InlineTs("van.html(...)"), ". As you can see, the expressiveness of tag functions enable us to declare the entire HTML page, including everything in the ", InlineHtml("<head>"), " section and ", InlineHtml("<body>"), " section."),
    p("The code declares an HTML page with one ", Symbol("Hello"), " component and two ", Symbol("Counter"), " components - one with the default button style, and the other whose button style can be selected by the user. Here are a few interesting things to note:"),
    ul(
      li("The line:", Ts('script({type: "text/javascript", src: `dist/client.bundle${env === "dev" ? "" : ".min"}.js`, defer: true})'), "indicates that we're choosing different JavaScript bundle files under different modes: ", Symbol("client.bundle.js"), " in dev mode whereas ", Symbol("client.bundle.min.js"), " in prod mode. It makes sense to use original client-side script during development and use the minified script in production."),
      li("We're allowing users to set the initial value of the counters via query parameters. Specifically, the line:", Ts('const counterInit = Number(parse(req.url!, true).query["counter-init"] ?? 0)'), "and line:", Ts('Counter({van, id: "basic-counter", init: counterInit})'), "enable that."),
      li("We're choosing ", Link(Symbol("van-plate"), " mode", "/minivan#npm-van-plate"), " as SSR is done with pure text templating without any DOM manipulation. If you want some DOM manipulation for your SSR, you can choose ", Link(Symbol("mini-van"), " mode", "/minivan#npm-mini-van"), " instead."),
    ),
    H2("Client-Side Script: CSR and Hydration"),
    p("The final step is to complete the client-side script file."),
    H3("Client-Side Component"),
    p("First, let's try to add a client-side component:"),
    Ts(`van.add(document.getElementById("hello-container")!, Hello({van}))`),
    p("This will append a CSR ", Symbol("Hello"), " component right after the SSR ", Symbol("Hello"), " component. You can tell whether the component is rendered on the server-side or on the client-side by checking whether the text is ", Symbol("👋Hello (from server)"), " or ", Symbol("👋Hello (from client)"), "."),
    H3("Hydration"),
    p("Next, let's hydrate the counter components rendered on the server side to add the reactivity. We can use ", Symbol("van.hydrate"), " to achieve that:"),
    Ts(`van.hydrate(document.getElementById("basic-counter")!, dom => Counter({
  van,
  id: dom.id,
  init: Number(dom.getAttribute("data-counter")),
}))
`),
    p(Symbol(`van.hydrate`), " replaces the SSR component (located by ", InlineTs(`document.getElementById("basic-counter")!`), ") with the CSR ", Symbol("Counter"), " component. Note that the 2nd argument of ", Symbol("van.hydrate"), " is the hydration function that takes the existing DOM node as its parameter and returns the new hydrated component. This way we can get the current state of SSR component (via ", InlineTs(`Number(dom.getAttribute("data-counter"))`), ") and pass-in the information while constructing the hydrated component, which keeps the counter value the same after hydration."),
    p("In the hydration function, you can read the ", Symbol("val"), " property of external states. In this way, the hydrated component will be a ", Link(Symbol("State"), "-derived node", "/tutorial#state-derived-child"), ", i.e.: a DOM node that will be updated whenever its dependency states change. Now, with that, let's build a ", Symbol("Counter"), " component whose button style can be adjusted by end users. First, let's define a state ", Symbol("buttonStyle"), " whose ", Symbol("val"), " is bound to the ", Symbol("value"), " of the ", Symbol("#button-style"), " ", InlineHtml("<select>"), " element:"),
    Ts(`const styleSelectDom = <HTMLSelectElement>document.getElementById("button-style")
const buttonStyle = van.state(styleSelectDom.value)
styleSelectDom.oninput = e => buttonStyle.val = (<HTMLSelectElement>e.target).value
`),
    p("Next, let's make the hydrated ", Symbol("Counter"), " component reactive to ", Symbol("buttonStyle"), " state:"),
    Ts(`van.hydrate(document.getElementById("styled-counter")!, dom => Counter({
  van,
  id: dom.id,
  init: Number(dom.getAttribute("data-counter")),
  buttonStyle,
}))
`),
    p("Since ", Symbol("buttonStyle"), " is passed into the ", Symbol("Counter"), " component where its ", Symbol("val"), " property is referenced, the hydrated ", Symbol("Counter"), " component will be reactive to the change of ", Symbol("buttonStyle"), " state."),
    p("Note that, this is an illustrative example to show how to make the entire hydrated component reactive to external states. In practice, the implementation of ", Symbol("Counter"), " component can be optimized to only make the ", InlineHtml("<button>"), "s' child text nodes of the ", Symbol("Counter"), " component reactive to ", Symbol("buttonStyle"), " state. This can be achieved by binding more localized DOM nodes (i.e.: the child text nodes of ", InlineHtml("<button>"), "s) to the ", Symbol("buttonStyle"), " state. You can check out the implementation below for an optimized ", Symbol("Counter"), " component:"),
    TsFile("hydration-example/src/components/optimized-counter.ts"),
    H3({id: "api-hydrate"}, "API reference: ", Symbol("van.hydrate")),
    ApiTable({
      signature: "van.hydrate(dom, f) => undefined",
      description: ["Hydrates the SSR component ", Symbol("dom"), " with the hydration function ", Symbol("f"), "."],
      parameters: {
        dom: "The root DOM node of the SSR component we want to hydrate.",
        f: ["The hydration function, which takes a DOM node as its input parameter and returns the new version of the DOM node. The hydration function describes how we want to convert an existing DOM node into a new one with added reactivity. If the ", Symbol("val"), " property of any states are referenced in the hydration function, the hydrated component will be bound to the dependency states (i.e.: reactive to the changes of the referenced states). In this case, the behavior of the hydrated component will be similar to a ", Link(Symbol("State"), "-derived child node", "/tutorial#state-derived-child"), "."],
      },
      returns: Symbol("undefined"),
    }),
    H2("Demo"),
    p("Now, let's check out what we have built so far. You can preview the application via ", Link("CodeSandbox", previewUrl), ". Alternatively, you can build and deploy application locally by following the steps below:"),
    ol(
      li("Clone the GitHub repo:", Shell("git clone " + "https://github.com/vanjs-org/vanjs-org.github.io.git")),
      li("Go to the directory for the demo:", Shell("cd vanjs-org.github.io/hydration-example")),
      li("Install NPM packages:", Shell("npm install")),
      li("Launch the development server:", Shell("npm run dev"), "You will see something like this in the terminal:", Code("", `Try visiting the server via http://localhost:8080.
      Also try http://localhost:8080?counter-init=5 to set the initial value of the counter.
`)),
      li("By clicking the links printed in the terminal, you will go to the demo page."),
      li("You can build the bundle for production with:", Shell("npm run build")),
    ),
    p("Let's go to the demo page now. You will probably first notice the ", Symbol("Hello"), " components of the demo:"),
    img({src: "/code/hydration-hello-screenshot.png", width: "300px"}),
    p("You can see an SSR ", Symbol("Hello"), " component followed by a CSR ", Symbol("Hello"), " component."),
    p("The second part of the demo page is for hydrating the ", Symbol("Counter"), " components. In real-world use cases, hydration typically happens immediately after the page load, or when the application is idle. But if we do that in our sample application, hydration will happen so fast that we won't even be able to notice how hydration happens. Thus, for illustration purpose, we introduce a ", InlineHtml("<button>"), " where hydration only happens upon user click:"),
    Ts(`van.add(document.getElementById("counter-container")!, p(button({onclick: hydrate}, "Hydrate")))`),
    p("As a result, the second part of the demo will look like this:"),
    img({src: "/code/hydration-counter-screenshot.png", width: "300px"}),
    p("You can verified that all the ", Symbol("Counter"), " components are non-reactive before the ", Symbol("Hydrate"), " button is clicked and can be turned reactive upon clicking the ", Symbol("Hydrate"), " button."),
    H2("The End"),
    p("🎉 Congratulations! You have completed the walkthrough for fullstack rendering. With the knowledge you have learned, you will be able to build sophisticated applications that take advantage of SSR, CSR and hydration."),
  )
}
