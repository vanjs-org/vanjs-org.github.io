import { createServer } from "node:http"
import serveStatic from "serve-static"
import finalhandler from "finalhandler"
import van from "mini-van-plate/van-plate"
import { registerEnv, dummyVanX } from "mini-van-plate/shared"
import TodoList from "./components/todo-list.js"

const {body, head, link, meta, script, style, title} = van.tags

const [env, port = 8080] = process.argv.slice(2);

const serveFile = serveStatic(".")

registerEnv({van, vanX: dummyVanX})

createServer((req, res) => {
  if (req.url?.endsWith(".js")) return serveFile(req, res, finalhandler(req, res))
  const initItems = [
    {done: false, text: "abc"},
    {done: true, text: "def"},
    {done: false, text: "ghi"},
  ]
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(van.html(
    head(
      link({rel: "icon", href: "logo.svg"}),
      title("SSR and Hydration Example"),
      meta({name: "viewport", content: "width=device-width, initial-scale=1"}),
      style("a { cursor: pointer }"),
    ),
    body(
      script({type: "text/javascript", src: `dist/client.bundle${env === "dev" ? "" : ".min"}.js`, defer: true}),
      TodoList({id: "todo-list", items: initItems}),
    )
  ))
}).listen(Number(port), () => console.log(`Try visiting the server via http://localhost:${port}.`))
