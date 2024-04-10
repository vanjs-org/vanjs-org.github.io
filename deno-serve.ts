import {join} from "https://deno.land/std@0.215.0/path/mod.ts"
import {encodeHex} from "https://deno.land/std@0.215.0/encoding/hex.ts"
import {crypto} from "https://deno.land/std@0.215.0/crypto/mod.ts"

const contentType = (path: string) => {
  if (path.endsWith(".js")) return "application/javascript; charset=utf-8"
  if (path.endsWith(".css")) return "text/css; charset=utf-8"
  if (path.endsWith(".html")) return "text/html; charset=utf-8"
  if (path.endsWith(".svg")) return "image/svg+xml"
  if (path.endsWith(".png")) return "image/png"
}

const pageLevelScripts: Record<string, 1 | undefined> = {
  "/home.js": 1,
  "/start.js": 1,
  "/tutorial.js": 1,
  "/demo.js": 1,
  "/convert.js": 1,
  "/vanui.js": 1,
  "/minivan.js": 1,
  "/ssr.js": 1,
  "/x.js": 1,
  "/advanced.js": 1,
  "/media.js": 1,
  "/about.js": 1,
}

const maxAge = (path: string) => path.endsWith(".html") || pageLevelScripts[path] ? 3600 : 86400

interface FileInfo {
  hash: string
  content: Uint8Array
}

const cachedFiles: Record<string, FileInfo> = {}

async function getContentAndHash(path: string): Promise<FileInfo> {
  const content = await Deno.readFile(path)
  const hashBuffer = await crypto.subtle.digest("SHA-256", content)
  return {content, hash: encodeHex(hashBuffer).substring(0, 16)}
}

async function readFile(path: string): Promise<FileInfo> {
  const result = cachedFiles[path] ?? (cachedFiles[path] = await getContentAndHash(path))
  console.log({path, ...result})
  return result
}

Deno.serve(async req => {
  const url = new URL(req.url)
  let path = url.pathname
  if (path.endsWith("/")) path += "index.html"
  else if (!path.includes(".")) path += ".html"
  try {
    const file = await readFile(join(".", path))
    const reqHash = req.headers.get("If-None-Match"), fileHash = file.hash
    if (reqHash === fileHash || reqHash === `W/${fileHash}`)
      return new Response(null, {status: 304})
    else
      return new Response(
        file.content,
        {
          status: 200,
          headers: {
            "content-type": `${contentType(path)}`,
            "Cache-Control": `public, max-age=${maxAge(path)}`,
            "Etag": fileHash,
          },
        },
      )
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return new Response("Not Found", {status: 404})
    throw err
  }
})
