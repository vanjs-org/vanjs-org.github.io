import http from "node:http"
import jsdom from "jsdom"
import van from "mini-van-plate"

const dom = new jsdom.JSDOM("")
const {html, tags} = van.vanWithDoc(dom.window.document)
const {a, body, li, p, ul} = tags

const hostname = '127.0.0.1'
const port = 8080

console.log("Testing DOM rendering...")
const anchorDom = a({href: "https://vanjs.org/"}, "🍦VanJS")
// anchorDom is an HTMLAnchorElement
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(anchorDom.outerHTML)

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(html(
    body(
      p("Your user-agent is: ", req.headers["user-agent"] ?? "Unknown"),
      p("👋Hello"),
      ul(
        li("🗺️World"),
        li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
      ),
    ),
  ))
})

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`))
