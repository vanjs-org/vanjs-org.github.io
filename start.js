const {a, button, code, div, option, p, pre, select, span, table, tbody, td, th, thead, tr} = van.tags

{
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const Run = ({sleepMs}) => {
    const steps = van.state(0)
    ;(async () => { for (; steps.val < 40; ++steps.val) await sleep(sleepMs) })()
    return pre(() => `${" ".repeat(40 - steps.val)}🚐💨Hello VanJS!${"_".repeat(steps.val)}`)
  }

  const Hello = () => {
    const dom = div()
    return div(
      dom,
      button({onclick: () => van.add(dom, Run({sleepMs: 2000}))}, "Hello 🐌"),
      button({onclick: () => van.add(dom, Run({sleepMs: 500}))}, "Hello 🐢"),
      button({onclick: () => van.add(dom, Run({sleepMs: 100}))}, "Hello 🚶‍♂️"),
      button({onclick: () => van.add(dom, Run({sleepMs: 10}))}, "Hello 🏎️"),
      button({onclick: () => van.add(dom, Run({sleepMs: 2}))}, "Hello 🚀"),
    )
  }

  van.add(document.getElementById("demo-hello-fun"), Hello())
}

{
  const Symbol = (...children) => code({class: "symbol"}, children)

  const CopyButton = () => a(
    {class: "copy", onclick() {copy(this)}, onmouseout() {resetTooltip(this)}},
    span({class: "tooltip"}, "Copy import line"),
    "📋",
  )

  const Download = (file, hasCopyButton) => Symbol(
    a({href: "/code/" + file, download: file, style: "white-space: nowrap;", title: "Download " + file}, file),
    hasCopyButton && CopyButton(),
  )

  const DownloadRow = ({version, suffix, hasDts, description}) => tr(
    td(pre({style: "margin: 0;"}, Download(`van-${version}${suffix}.js`, true)),
      hasDts && pre({style: "margin: 0;"}, Download(`van-${version}${suffix}.d.ts`)),
    ),
    td(description),
  )

  const versionToAnnouncement = {
    "1.5.0": "https://github.com/vanjs-org/van/discussions/290",
    "1.4.1": "https://github.com/vanjs-org/van/discussions/280#discussioncomment-8725692",
    "1.4.0": "https://github.com/vanjs-org/van/discussions/280",
    "1.3.0": "https://github.com/vanjs-org/van/discussions/275",
    "1.2.8": "https://github.com/vanjs-org/van/discussions/246",
    "1.2.7": "https://github.com/vanjs-org/van/discussions/114#discussioncomment-7849992",
    "1.2.6": "https://github.com/vanjs-org/van/discussions/114#discussioncomment-7447600",
    "1.2.5": "https://github.com/vanjs-org/van/discussions/114#discussioncomment-7399324",
    "1.2.4": "https://github.com/vanjs-org/van/discussions/114#discussioncomment-7361441",
    "1.2.3": "https://github.com/vanjs-org/van/discussions/114#discussioncomment-7330296",
    "1.2.1": "https://github.com/vanjs-org/van/discussions/120",
    "1.2.0": "https://github.com/vanjs-org/van/discussions/114",
    "1.1.3": "https://github.com/vanjs-org/van/discussions/81#discussioncomment-6849913",
    "1.1.0": "https://github.com/vanjs-org/van/discussions/81",
    "1.0.2": "https://github.com/vanjs-org/van/discussions/72#discussioncomment-6718307",
    "1.0.1": "https://github.com/vanjs-org/van/discussions/72#discussioncomment-6652959",
    "1.0.0": "https://github.com/vanjs-org/van/discussions/72",
    "0.12.4": "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6463621",
    "0.12.3": "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6223903",
    "0.12.2": "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6142154",
    "0.12.1": "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6137688",
    "0.12.0": "https://github.com/vanjs-org/van/discussions/53",
    "0.11.11": "https://github.com/vanjs-org/van/discussions/44",
    "0.11.10": "https://github.com/vanjs-org/van/discussions/6",
    "0.11.9": "https://www.linkedin.com/posts/tao-xin-64234920_github-vanjs-orgvan-vanjs-an-ultra-lightweight-activity-7062813716383219713-CI4O",
  }

  const DownloadTable = ({version}) => div(
    div("Click the link to download the file, or 📋 to copy the import line from CDN."),
    table({class: "download-table"},
      thead(tr(th("Files"), th("Description"))),
      tbody(
        DownloadRow({
          version,
          suffix: ".min",
          hasDts: true,
          description: "Minified script file for ES6 modules, optimized for bundle size.",
        }),
        DownloadRow({
          version,
          suffix: "",
          hasDts: true,
          description: "The source file without minification.",
        }),
        DownloadRow({
          version,
          suffix: ".debug",
          hasDts: true,
          description: ["The script file for debugging purpose, compared to ", Symbol(`van-${version}.js`), ", it adds additional sanity checks, such as type-checking, including the checkings that are impossible to do with TypeScript. Using this file for development purpose will detect issues earlier and produce more meaningful error messages."],
        }),
        DownloadRow({
          version,
          suffix: ".nomodule.min",
          description: ["Similar to ", Symbol(`van-${version}.min.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
        }),
        DownloadRow({
          version,
          suffix: ".nomodule",
          description: ["Similar to ", Symbol(`van-${version}.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
        }),
        DownloadRow({
          version,
          suffix: ".nomodule.debug",
          description: ["Similar to ", Symbol(`van-${version}.debug.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
        }),
      ),
    ),
  )

  const version = van.state(Object.keys(versionToAnnouncement)[0])
  van.add(document.getElementById("download-table-div"),
    p(
      "Version: ",
      select({value: version, oninput: e => version.val = e.target.value},
        Object.keys(versionToAnnouncement).map(v => option({value: v}, v)),
      ),
      " ",
      () => a({href: versionToAnnouncement[version.val]}, "release announcement"),
    ),
    () => DownloadTable({version: version.val}),
  )
}
