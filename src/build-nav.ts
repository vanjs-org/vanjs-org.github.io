import type { VanObj } from "./type";
export function Nav(van: VanObj, titlePath: [title: string, path: string][], current: {val: string}, click?: (path: string) => void) {
  const { div, a } = van.tags
  return div(
    {id: "nav", class: "w3-bar-block"},
    titlePath.map(([title, path]) => {
    return a({href: path.startsWith("https://") ? path : `/${path}`, ...(click ? { onclick: click(path) } : {}), class: () => "w3-bar-item w3-button w3-hover-white" + (path === current.val ? " current" : "")}, title)
  }));
}