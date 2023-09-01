import { createServer } from "node:http"
import { parse } from "node:url"
import serveStatic from "serve-static"
import finalhandler from "finalhandler"
import van from "mini-van-plate/van-plate"
import Hello from "./components/hello.js"
import Counter from "./components/counter.js"

const {body, div, h1, h2, option, p, script, select} = van.tags

const [env, port = "8080"] = process.argv.slice(2);

const serveFile = serveStatic(".")

createServer((req, res) => {
  if (req.url?.endsWith(".js")) return serveFile(req, res, finalhandler(req, res))
  const counterInit = Number(parse(req.url!, true).query["counter-init"])
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(van.html(
    body(
      script({type: "text/javascript", src: `dist/client.bundle${env === "dev" ? "" : ".min"}.js`, defer: true}),
      h1("Hello Components"),
      div({id: "hello-container"},
        Hello({van}),
      ),
      h1("Counter Components"),
      div({id: "counter-container"},
        h2("Basic Counter"),
        Counter({van, id: "basic-counter", init: counterInit}),
        h2("Styled Counter"),
        p("Select the button style: ",
          select({id: "button-style", value: "👆👇"},
            option("👆👇"),
            option("👍👎"),
            option("🔼🔽"),
            option("⏫⏬"),
            option("📈📉"),
          ),
        ),
        Counter({van, id: "styled-counter", init: counterInit, buttonStyle: "👆👇"}),
      ),
    )
  ))
}).listen(Number(port), () => {
  console.log(`Try visiting the server via http://localhost:${port}/?counter-init=5`)
})
