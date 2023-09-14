import { mdToVanCode } from "vanjs-converter"
import 'marked'

const [templateFile, inFile, outFile] = Bun.argv.slice(2)

const {code, tags, components} = mdToVanCode(await Bun.file(inFile).text(), {
  renderer: {
    codespan: s => `<Symbol>${s}</Symbol>`,
    link: (href, _unused_title, text) => `<Link>${text}<dummy></dummy>${href}</Link>`,
    heading: (text, level) => {
      const tag = level <= 3 ? "H" : "h"
      return `<${tag}${level}>${text}</${tag}${level}>`
    }
  }
})

Bun.write(outFile,
  (await Bun.file(templateFile).text())
    .replace("/* TAGS */", tags.concat("div").sort().join(", "))
    .replace("/* COMPONENTS */", components.join(", "))
    .replace("/* DOM */", code.map(l => "    " + l).join("\n"))
)
