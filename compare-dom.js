import { JSDOM } from 'jsdom'
import fs from 'fs/promises'

async function getPage(link) {
  const dom = await JSDOM.fromURL(link)
  const html = dom.serialize();
  return html
}

const pages = [
  '/',
  '/start',
  '/tutorial',
  '/demo',
  '/convert',
  '/vanui',
  '/minivan',
  '/ssr',
  '/x',
  '/advanced',
  '/media',
  '/about',
]

const link1 = process.argv[2]
const link2 = process.argv[3]

if (!link1 || !link2) {
  console.log("Usage: node compare-dom.js <link1> <link2>")
  process.exit(1)
}

async function compare(link1, link2, page) {
  const page1 = await getPage(link1 + page)
  const page2 = await getPage(link2 + page)
  if (page1 !== page2) {
    console.log(`Page ${page} is different!`)
    const name = page.slice(1) || 'home';
    await fs.writeFile(`diff/${name}-page1.html`, page1)
    await fs.writeFile(`diff/${name}-page2.html`, page2)
  }
}

async function main() {
  try {
    for (const page of pages) {
      await compare(link1, link2, page)
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()