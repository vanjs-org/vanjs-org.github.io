import http from "node:http"
import van from "mini-van-plate/van-plate"

const {a, body, button, input, li, p, ul} = van.tags

const port = 8080

console.log("Testing DOM rendering...")
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(a({href: "https://vanjs.org/"}, "🍦VanJS").render())
// Expecting `<button onclick="alert(&quot;Hello&quot;)">Click</button>` printed in the console
console.log(button({onclick: 'alert("Hello")'}, "Click").render())
// Expecting `<input type="text" value="value">` printed in the console
console.log(input({type: "text", value: "value"}).render())

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

server.listen(port, () => console.log(`Server running at http://localhost:${port}/`))
