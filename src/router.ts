import about from "./template/about";
import advanced from "./template/advanced";
import convert from "./template/convert";
import demo from "./template/demo";
import home from "./template/home";
import media from "./template/media";
import minivan from "./template/minivan";
import ssr from "./template/ssr";
import start from "./template/start";
import tutorial from "./template/tutorial";
import vanui from "./template/vanui";
import x from "./template/x";
import type { VanObj, VanReturn } from "./type";

export const scripts = {
  prism: "/prism.js",
  chart: "https://www.gstatic.com/charts/loader.js",
  diff: "/code/diff.min.js",
  vanX: "/code/van-x.nomodule.min.js",
}

export const shortTitleToPath: [name: string, link: string, render: (van: VanObj) => VanReturn | Promise<VanReturn>, scripts: string[], title?: string][] = [
  ["Home", "", home, [scripts.prism, scripts.chart, `home.js`], 'VanJS - A 0.9kB No-JSX Framework Based on Vanilla JavaScript'],
  ["Getting Started", "start", start, [scripts.prism, `start.js`]],
  ["Tutorial", "tutorial", tutorial, [scripts.prism, `tutorial.js`], "VanJS - Tutorial and API Reference"],
  ["VanJS by Example", "demo", demo, [scripts.prism, scripts.diff, scripts.chart, scripts.vanX, `demo.js`], "VanJS - Learning by Example"],
  ["HTML/MD to VanJS", "convert", convert, [scripts.prism, `convert.js`], "VanJS - HTML/MD Snippet to 🍦VanJS Code"],
  ["VanUI", "vanui", vanui, [scripts.prism], "VanUI - A Collection of Grab 'n Go Reusable UI Components for VanJS"],
  ["Mini-Van", "minivan", minivan, [scripts.prism], "Mini-Van - A Minimalist Template Engine for Client/Server-side Rendering"],
  ["SSR & Hydration", "ssr", ssr, [scripts.prism], 'VanJS - Fullstack Rendering (SSR, CSR and Hydration)'],
  ["X", "x", x, [scripts.prism, scripts.vanX, `x.js`], 'VanX - The 1.0 kB Official VanJS Extension'],
  ["Advanced Topics", "advanced", advanced, [scripts.prism, `advanced.js`]],
  ["Media Coverage", "media", media, []],
  ["About", "about", about, [scripts.prism]],
]