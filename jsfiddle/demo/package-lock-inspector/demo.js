const {a, div, h4, pre, table, tbody, td, textarea, th, thead, tr} = van.tags

const PackageLockInspector = () => {
  const json = van.state("")
  return [
    div("Paste the content of package-lock.json file here:"),
    textarea({rows: 10, cols: 80, oninput: e => json.val = e.target.value}),
    () => {
      if (!json.val) return div()
      try {
        return div(
          h4("All Dependencies"),
          table(
            thead(tr(th("Package"), th("Version"))),
            tbody(Object.entries(JSON.parse(json.val).packages).map(([k, v]) => {
              if (!k) return null
              const name = k.slice("node_modules/".length), version = v.version
              return tr(
                td(a({href: "https://www.npmjs.com/package/" + name}, name)),
                td(a({href: `https://www.npmjs.com/package/${name}/v/${version}`}, version)),
              )
            })),
          ),
        )
      } catch (e) {
        return pre({style: "color: red;"}, "Parsing error: ", e)
      }
    },
  ]
}

van.add(document.body, PackageLockInspector())
