const [inFile, outFile] = Bun.argv.slice(2)

const lines = (await Bun.file(inFile).text()).split("\n")

const firstLine = lines.indexOf("## Installation")

await Bun.write(outFile, `# **VanUI**: A Collection of Grab 'n Go Reusable Utility and UI Components for VanJS

🙏 Feedback and contribution are welcome and greatly appreciated! ([source code](https://github.com/vanjs-org/van/tree/main/components))

${lines.slice(firstLine).join("\n")}
`)

// To allow top-level `await`
export {}
