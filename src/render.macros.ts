import van from "mini-van-plate"
import jsdom from 'jsdom'
import type { JsFiddle, VanObj, VanReturn } from "./type"
import { shortTitleToPath } from "./router"
import { processFiddle } from "./gen-fiddle-links"
import common, { addContext } from "./common"

async function getElement(name: string, render?: (van: VanObj) => (VanReturn | Promise<VanReturn>)) {
  const dom = new jsdom.JSDOM()
  const vanObj = van.vanWithDoc(dom.window.document)
  if (render) {
    const list: {obj: JsFiddle, el: VanReturn}[] = [];
    const remove = addContext(vanObj, list)
    const result = await render(vanObj)
    remove();
    await processFiddle(name, vanObj, list);
    return result
  }
  const {div} = vanObj.tags
  return div({id: "content"});
}

async function renderTemplate(name: string, render?: (van: VanObj) => (VanReturn | Promise<VanReturn>)): Promise<VanReturn> {
  const page = await getElement(name, render)
  return page
}

export type Toc = {
  title: string,
  path: string,
  level: number,
  children: Toc[]
}

export type Render = {
  title: string,
  path: string,
  body: string,
  scripts: string[],
  name: string,
  toc: string
}

function List(headers: readonly HTMLHeadingElement[], level: number): Toc[] {
  const tagName = "H" + level
  const indexes = headers.flatMap((dom, i) => dom.tagName === tagName ? i : [])
  if (indexes.length === 0) return undefined
  return indexes.map((index, i) => ({
    title: headers[index].textContent ?? "",
    path: "#" + headers[index].id,
    level,
    children: List(headers.slice(index + 1, indexes[i + 1]), level + 1),
  }))
}

function buildToc(dom: VanReturn): Toc[] {
  const headers: HTMLHeadingElement[] = [...dom.querySelectorAll<HTMLHeadingElement>("h2,h3")]
  const r = headers.length > 0 ? List(headers, 2) : []
  return r
}

export async function render(): Promise<Render[]> {
  const dom = new jsdom.JSDOM()
  const vanObj = van.vanWithDoc(dom.window.document)
  const { ul, li, aside } = vanObj.tags
  const { Link } = common(vanObj)
  const Toc = (toc: Toc[]) => {
    return toc?.length > 0 ? [ul(
      toc.map(({title, path, children}) => li(
        Link(title, path),
        Toc(children),
      ))
    )] : []
  }
  
  function returnToc(dom: Toc[]): string {
    const d = aside({id: "toc"}, Toc(dom))
    return d.outerHTML
  }

  return await Promise.all(shortTitleToPath.map(async ([name, path, page, scripts, title]) => {
    const body = await renderTemplate(path, page)
    return {
      title,
      name,
      path,
      scripts,
      body: body.outerHTML,
      toc: returnToc(buildToc(body))
    }
  }));
}
