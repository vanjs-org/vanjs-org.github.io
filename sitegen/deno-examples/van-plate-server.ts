import { serve } from "https://deno.land/std@0.184.0/http/server.ts"
import van from "https://deno.land/x/minivan@0.3.9/src/van-plate.js"

const {a, body, li, p, ul} = van.tags

const port = 8080

console.log("Testing DOM rendering...")
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(a({href: "https://vanjs.org/"}, "🍦VanJS").render())

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)
await serve(req => new Response(
  van.html(
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
