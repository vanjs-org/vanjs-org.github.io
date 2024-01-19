import { minify } from '@swc/html'
import { build } from 'esbuild'
import { mkdirSync } from 'fs'
import {readFile, writeFile} from 'fs/promises'
import van from "mini-van-plate"
import jsdom from 'jsdom'
import common from './common'
import { scripts, shortTitleToPath } from './router'
import { type Toc, render, Render } from './render.macros'
import { Nav } from './build-nav'


const templatePromise = readFile('./template.html', 'utf8')

const minifyOptions = {
  html: async (body) => {
    const { code } = await minify(Buffer.from(body), {
      collapseWhitespaces: "all",
    });
    return code;
  }
}

async function renderPage(render: Render) {
  const dom = new jsdom.JSDOM(await templatePromise)
  const doc = dom.window.document;
  const vanObj = van.vanWithDoc(doc)
  const { aside, script, link } = vanObj.tags

  console.log(`Rendering ${render.name}...`)

  const titleElement = doc.querySelector("title")
  titleElement.innerHTML = render.title || (titleElement.innerHTML + " - " + render.name)
  let shortTitle = shortTitleToPath?.find(([_, p]) => p === render.path)?.[0] ?? ""
  if (shortTitle === "Home") shortTitle = "VanJS"
  else if (shortTitle === "Tutorial") shortTitle = "VanJS Tutorial"
  doc.getElementById("title-bar")!.innerHTML = shortTitle
  doc.getElementById("nav")!.replaceWith(Nav(vanObj, shortTitleToPath.map(e => [e[0], e[1]]), {val: render.path}))
  doc.getElementById("content")!.outerHTML = render.body
  doc.getElementById("toc")!.outerHTML = render.toc

  const placeholderDom = doc.getElementById("script-placeholder")!
  for (const src of render.scripts) {
    placeholderDom.appendChild(script({type: "text/javascript", src, defer: ""}))
  }

  for (const href of Object.values(scripts)) {
    doc.body.appendChild(link({rel: "prefetch", href, as: "script"}))
  }

  const result = dom.serialize()
  
  const compressed = await minifyOptions.html(result)
  // console.log(file, result.length, '->', compressed.length, "bytes")
  await writeFile(`./dist/${render.path || 'index'}.html`, compressed)
}

mkdirSync("./dist", { recursive: true });

async function renderClient() {
  console.log("Building client...")
  await build({
    entryPoints: ["./src/build-client.ts"],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: './dist/client.js',
    plugins: [{
      name: "esbuild-plugin-macros",
      setup(ctx) {
        ctx.onLoad({ filter: /\.macros\.[^\.]+$/ }, async args => {
          const exports = await import(args.path);
          const newExports = {}
          for (const key in exports) {
            if (exports[key] instanceof Promise) {
              newExports[key] = await exports[key];
            } else if (typeof exports[key] === "function") {
              newExports[key] = await exports[key]();
            } else {
              newExports[key] = exports[key];
            }
          }
          return { loader: "json", contents: JSON.stringify(newExports) };
        });
      }
    }]
  });
}

async function main() {
  try {
    const buildTemplate = await render();
    await Promise.all([
      ...Object.values(buildTemplate).map(async (render) => {
        return await renderPage(render);
      }),
      renderClient(),
    ]).then(() => {
      console.log("Done!")
    });
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
