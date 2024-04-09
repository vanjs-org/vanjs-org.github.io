import {join} from "https://deno.land/std@0.215.0/path/mod.ts"

const contentType = (path: string) => {
  if (path.endsWith(".js")) return "application/javascript; charset=utf-8"
  if (path.endsWith(".css")) return "text/css; charset=utf-8"
  if (path.endsWith(".html")) return "text/html; charset=utf-8"
  if (path.endsWith(".svg")) return "image/svg+xml"
  if (path.endsWith(".png")) return "image/png"
}

const pageLevelScripts: Record<string, 1 | undefined> = {
  "home.js": 1,
  "start.js": 1,
  "tutorial.js": 1,
  "demo.js": 1,
  "convert.js": 1,
  "vanui.js": 1,
  "minivan.js": 1,
  "ssr.js": 1,
  "x.js": 1,
  "advanced.js": 1,
  "media.js": 1,
  "about.js": 1,
}

const maxAge = (path: string) => path.endsWith(".html") || pageLevelScripts[path] ? 1800 : 43200

interface FileInfo {
  mtime: Date | null
  content: Uint8Array
}

const cachedFiles: Record<string, FileInfo> = {}

async function readFile(path: string): Promise<FileInfo> {
  const result = cachedFiles[path] ?? (cachedFiles[path] = {
    mtime: (await Deno.stat(path)).mtime,
    content: await Deno.readFile(path)
  })

  console.log({path, mtime: result.mtime})
  return result
}

Deno.serve(async req => {
  const url = new URL(req.url)
  let path = url.pathname
  if (path.endsWith("/")) path += "index.html"
  else if (!path.includes(".")) path += ".html"
  try {
    return new Response(
      (await readFile(join(".", path))).content,
      {
        status: 200,
        headers: {
          "content-type": `${contentType(path)}`,
          "Cache-Control": `public, max-age=${maxAge(path)}`,
        },
      },
    )
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return new Response("Not Found", {status: 404})
    throw err
  }
})
