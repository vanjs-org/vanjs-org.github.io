const PackageLockInspector = () => {
  const json = van.state("")
  return [
    div("Paste the content of package-lock.json file here:"),
    textarea({rows: 10, cols: 80, oninput: e => json.val = e.target.value}),
    () => {
      if (!json.val) return div()
      const packagesEntries = Object.entries(JSON.parse(json.val).packages)
      try {
        return div(
          h4("All Dependencies (", packagesEntries.length, ")"),
          table(
            thead(tr(th("Package"), th("Version"))),
            tbody(packagesEntries.map(([k, v]) => {
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
        return pre({style: "color: red;"}, "Parsing error: ", e.toString())
      }
    },
  ]
}
