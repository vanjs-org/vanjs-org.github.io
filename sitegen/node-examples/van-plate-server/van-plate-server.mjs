import http from "node:http"
import van from "mini-van-plate/van-plate"

const {a, body, li, p, ul} = van.tags

const hostname = '127.0.0.1'
const port = 8080

console.log("Testing DOM rendering...")
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(a({href: "https://vanjs.org/"}, "🍦VanJS").render())

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(van.html(
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
