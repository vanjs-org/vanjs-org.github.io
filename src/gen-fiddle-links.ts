import fs from "fs"
import fsp from "fs/promises"
import { join } from "path"
import type { JsFiddle, VanObj, VanReturn } from "./type"

const jsFiddleRoot = "jsfiddle"
const ghPath = `vanjs-org/vanjs-org.github.io/tree/master/`

const mkdirIfNotExist = async (dir: string) => {
  try {
    fsp.mkdir(dir, {recursive: true})
  } catch (e) {
  }
}

const findCode = (dom: Element) => {
  // while (!dom.firstElementChild?.matches("code[class^=language-]"))
  //   dom = dom.previousElementSibling!
  // return dom.querySelector("code")!.innerText

}

const extractCss = (htmlFile: string) => {
  const doc = new DOMParser().parseFromString(fs.readFileSync(htmlFile, 'utf-8'), "text/html")!
  const cssLines = doc.querySelector("style")!.innerText.split("\n")
  const indent = cssLines[cssLines.length - 1].length + 2
  return cssLines.slice(1, -1).map(l => l.substring(indent) + "\n").join("")
}

const vanVersion = fs.readFileSync("assert/code/van.version", "utf8")
const miniVanVersion = fs.readFileSync("assert/code/mini-van.version", "utf8")
const vanXVersion = fs.readFileSync("assert/code/van-x.version", "utf8")

export const processFiddle = async (path: string, van: VanObj, dom: {obj: JsFiddle, el: VanReturn}[]) => {
  const {add, tags} = van
  const {a} = tags

  for (const node of dom) {
    let code = node.obj.code
    const replaceCode = node.obj["data-replace-code"]
    if (replaceCode) code = replaceCode.replace("$CODE", code)
    const prefix = node.obj["data-prefix"]
    if (prefix) code = prefix + "\n\n" + code
    const suffix = node.obj["data-suffix"]
    if (suffix) code += "\n" + suffix + "\n"

    const subdir = join(path ? path : "home", node.obj.id)
    const dir = join(jsFiddleRoot, subdir)

    await mkdirIfNotExist(dir)

    const detailFile = node.obj["data-details"] ?? "demo.details"
    const detailStr = await fsp.readFile("jsfiddle/" + detailFile, 'utf8')
    await fsp.writeFile(join(dir, "demo.details"), detailStr
      .replace("van-latest.", `van-${detailFile.includes("mini-van") ? miniVanVersion : vanVersion}.`)
      .replace("@latest", "@" + vanXVersion)
    )
    await fsp.writeFile(join(dir, "demo.js"), code)
    const css = node.obj["data-css"]
    if (css) await fsp.writeFile(join(dir, "demo.css"), css)
    const cssFile = node.obj["data-css-file"]
    if (cssFile) {
      if (cssFile.endsWith(".css")) {
        await fsp.copyFile(cssFile, join(dir, "demo.css"))
      } else {
        await fsp.writeFile(join(dir, "demo.css"), extractCss(cssFile))
      }
    }

    add(node.el,
      a({href: "https://jsfiddle.net/gh/get/library/pure/" + join(ghPath, dir)},
        "Try on jsfiddle",
      ),
    )
  }
}
