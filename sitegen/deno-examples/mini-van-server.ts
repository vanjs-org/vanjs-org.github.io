import { serve } from "https://deno.land/std@0.184.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import van from "https://deno.land/x/minivan@0.3.9/src/mini-van.js"

const document = new DOMParser().parseFromString("", "text/html")!
const {tags, html} = van.vanWithDoc(document)
const {a, body, li, p, ul} = tags

const port = 8080

console.log("Testing DOM rendering...")
const anchorDom = a({href: "https://vanjs.org/"}, "🍦VanJS")
// anchorDom is an HTMLAnchorElement
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(anchorDom.outerHTML)

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)
await serve(req => new Response(
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
), {port})
