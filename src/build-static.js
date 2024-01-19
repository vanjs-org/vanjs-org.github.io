import { transform, build } from 'esbuild'
import { mkdirSync } from 'fs'
import { readFile, writeFile, cp } from 'fs/promises'

const minifyOptions = {
  css: async (body) => {
    const { code: esb } = await transform(body, {
      loader: 'css',
      minify: true,
    });
    return esb
  },
}

async function buildJs(filename) {
  await build({
    entryPoints: ["./assert/" + filename],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: './dist/' + filename,
  });
}

async function buildStatic(filename, type) {
  const css = await readFile(`./assert/${filename}`, 'utf8')
  const result = await minifyOptions[type](css);
  console.log(filename, css.length, '->', result.length, "bytes")
  return writeFile(`./dist/${filename}`, result)
}

function copyStatic(filename) {
  return cp(`./assert/${filename}`, `./dist/${filename}`, {
    recursive: true,
  })
}

mkdirSync("./dist", { recursive: true });

const tree = {
  static: {
    css: ['w3.css', 'prism.css', 'vanjs.css'],
    js: ['prism.js', 'home.js', 'start.js', 'tutorial.js', 'demo.js', 'convert.js', 'x.js', 'advanced.js'],
  },
  copy: ['logo.svg', 'vs-code-16x16.png', 'tao.jpeg'],
  copyFolder: ['code'],
}

async function main() {
  try {
    await Promise.all([
      ...tree.static?.css?.map(filename => buildStatic(filename, 'css')),
      ...tree.static?.js?.map(filename => buildJs(filename)),
      ...tree.copy?.map(filename => copyStatic(filename)),
      ...tree.copyFolder?.map(filename => copyStatic(filename)),
    ]).then(() => {
      console.log("Done!")
    });
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
