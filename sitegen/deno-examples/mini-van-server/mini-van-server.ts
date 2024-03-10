import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import van from "https://deno.land/x/minivan@0.5.6/src/mini-van.js"

const document = new DOMParser().parseFromString("", "text/html")!
const {tags: {a, body, button, input, li, p, ul}, html} = van.vanWithDoc(document)

const port = 8080

console.log("Testing DOM rendering...")
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(a({href: "https://vanjs.org/"}, "🍦VanJS").outerHTML)
// Expecting `<button onclick="alert(&quot;Hello&quot;)">Click</button>` printed in the console
console.log(button({onclick: 'alert("Hello")'}, "Click").outerHTML)
// Expecting `<input type="text" value="value">` printed in the console
console.log(input({type: "text", value: "value"}).outerHTML)

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)
Deno.serve({port}, req => new Response(
  html(
    body(
      p("Your user-agent is: ", req.headers.get("user-agent") ?? "Unknown"),
      p("👋Hello"),
      ul(
        li("🗺️World"),
        li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
      ),
    ),
  ),
  {
    status: 200,
    headers: {"content-type": "text/html; charset=utf-8"},
  },
))
