import {join} from "https://deno.land/std@0.215.0/path/mod.ts"

const contentType = (path: string) => {
  if (path.endsWith(".js")) return "application/javascript; charset=utf-8"
  if (path.endsWith(".css")) return "text/css; charset=utf-8"
  if (path.endsWith(".html")) return "text/html; charset=utf-8"
  if (path.endsWith(".svg")) return "image/svg+xml"
  if (path.endsWith(".png")) return "image/png"
}

Deno.serve(async req => {
  const url = new URL(req.url)
  let path = url.pathname
  if (path.endsWith("/")) path += "index.html"
  else if (!path.includes(".")) path += ".html"
  try {
    return new Response(
      await Deno.readTextFile(join(".", path)),
      {status: 200, headers: {"content-type": `${contentType(path)}`}},
    )
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return new Response("Not Found", {status: 404})
    throw err
  }
})
