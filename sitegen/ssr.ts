import van, { ChildDom as TypedChildDom } from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument, Element, Text } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

type ChildDom = TypedChildDom<Element, Text>

export default (doc: HTMLDocument) => {
  const {tags: {b, div, i, li, ol, p, ul}} = van.vanWithDoc(doc)
  const {InlineTs, H1, H2, H3, Json, Link, MiniVan, Symbol, SymLink, Ts, TsFile, VanJS} = common(doc)

  const codeUrlBase = "https://github.com/vanjs-org/vanjs-org.github.io/tree/hydrate/hydration-example"
  const previewUrl = "https://codesandbox.io/p/sandbox/github/vanjs-org/vanjs-org.github.io/tree/hydrate/hydration-example?file=/package.json:1,1"

  const Folder = (name: string, ...rest: ChildDom[]) =>
    li({class: "folder"}, Symbol(name), ...rest)
  const File = (name: string, path: string, ...rest: ChildDom[]) =>
    li({class: "file"}, SymLink(name, codeUrlBase + path + name), ...rest)
  const NpmLink = (name: string) => Link(name, "https://www.npmjs.com/package/" + name)

  return div({id: "content"},
    H1(VanJS(), ": Fullstack Rendering (SSR, CSR and Hydration)"),
    p(VanJS(), " offers a seamless and framework-agnostic solution for fullstack rendering. We will provide a walkthrough for a sample application with SSR (server-side rendering), CSR (client-side rendering) and hydration. As an outline, here are the major steps we're going to take to build the sample application:"),
    ol(
      li("Define common UI components that can be shared on both server-side and client-side."),
      li("Implement server-side script with the help of ", MiniVan(), " for serving the HTML content to end users."),
      li("Implement client-side script with the help of ", VanJS(), " for adding client-side components and enabling hydration."),
    ),
    p("The sample application requires a bare minimum of dependencies. The server-side script can be run by Node.js. We can also build a fullstack application with other JavaScript runtimes like Deno or Bun. Other front-end frameworks like Vite or Astro are not required, but it should be easy to integrate with them."),
    p("The source code of the sample application can be found ", Link("here", codeUrlBase), " with the following directory structure:"),
    ul({class: "dir-tree"},
      Folder("hydration-example", ": Root of the sample application.",
        ul(
          Folder("src", ": Source files of the application.",
            ul(
              Folder("components", ": Common components that are shared on both server-side and client-side.",
                ul(
                  File("hello.ts", "/src/components/", ": ", Symbol("Hello"), " component."),
                  File("counter.ts", "/src/components/", ": ", Symbol("Counter"), " component."),
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
    H2(Symbol("package-lock.json"), " File"),
    p("Dependencies are declared in ", SymLink("package.json", codeUrlBase + "/package.json"), " file:"),
    Json(`  "dependencies": {
    "finalhandler": "^1.2.0",
    "mini-van-plate": "^0.4.0",
    "serve-static": "^1.15.0",
    "vanjs-core": "^1.2.0"
  }
`),
    ul(
      li(NpmLink("finalhandler"), " and ", NpmLink("serve-static"), ": Server-side packages for serving static files (primarily used for serving ", Symbol(".js"), " files)."),
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
      li("The shared ", Symbol("Hello"), " component takes a ", Symbol("van"), " object as its input property. This is crucial to make ", Symbol("Hello"), " component cross-platform. Callers are responsible for providing the ", Symbol("van"), " object based on what's available in their specific environment so that the component can be agnostic to the execution environment. On the server-side, the ", Symbol("van"), " object from ", MiniVan(), " will be used (we can choose the ", Symbol("van"), " object from ", Symbol("van-plate"), " mode or from ", Symbol("mini-van"), " mode), whereas on the client-side, the ", Symbol("van"), " object from ", VanJS(), " will be used."),
      li("We can determine if the component is being rendered on the server-side or client-side:", Ts(`const fromServer = typeof window === "undefined"`), " and show different content based on it:", Ts('p(() => `👋Hello (from ${fromServer ? "server" : "client"})'), "This will help us differentiate whether the component is rendered from server or from client."),
    ),
    p("To help with typechecking if you're working with TypeScript, you can import the ", Symbol("VanObj"), " type from ", Symbol("mini-van-plate/shared"), " (part of the ", MiniVan(), " package). "),
    p(b("Limitations: "), i("The typechecking for tag functions and ", Symbol("van.add"), " is quite limited. This is because it's hard to unify the type system across the common types between server-side and client-side.")),
    H3("Reactive Component"),
    p("Next, let's take a look at a reactive component - ", Symbol("Counter"), ":"),
    TsFile("hydration-example/src/components/counter.ts"),
    p("Notable differences from the ", SymLink("Counter", "/demo#counter"), " component in the \"VanJS by Example\" page:"),
    ul(
      li("Similar to the ", Symbol("Hello"), " component, it takes a ", Symbol("van"), " object as its input property to make the component environment-agnostic."),
      li("You can define states and bind states to DOM nodes as you normally do on the client-side. This is because in ", MiniVan(), " ", Symbol("0.4.0"), " release, we adjusted its implementation to polyfill states and state-bindings related API, though with the absence of reactively (i.e.: changing a state won't lead to the update of the DOM tree), which is only possible on the client-side after hydration."),
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
    p("The bulk of the script is declaring the DOM structure of the page that is enclosed in ", InlineTs("van.html(...)"), ". As you can see, the expressiveness of tag functions enable us to declare the entire HTML page, including everything in the ", Symbol("<head>"), " section and ", Symbol("<body>"), " section."),
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
    p("Next, let's hydrate the counter components rendered on the server side to add the reactivity. We can use ", Symbol("van.hydrate"), " to achieve that:"),
    Ts(`van.hydrate(document.getElementById("basic-counter")!, dom => Counter({
  van,
  id: dom.id,
  init: Number(dom.getAttribute("data-counter")),
}))
`),
    p(Symbol(`van.hydrate`), " replaces the SSR component (located by ", InlineTs(`document.getElementById("basic-counter")!`), ") with the CSR ", Symbol("Counter"), " component. Note that the 2nd argument of ", Symbol("van.hydrate"), " is a function that takes the existing DOM node as its parameter. This is exactly how we can get the current state of SSR component (via ", InlineTs(`Number(dom.getAttribute("data-counter"))`), ") and pass-in the information while constructing the CSR component, which keeps the counter value the same after hydration."),
  )
}
