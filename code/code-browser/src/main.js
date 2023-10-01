import van from "vanjs-core"

const {a, button, code, div, li, pre, ul} = van.tags

const Browser = () => {
  const file = van.state(location.hash.slice(1))
  window.addEventListener("hashchange", () => file.val = location.hash.slice(1))

  const content = van.derive(() => file.val ? (
    fetch("https://api.github.com/repos/vanjs-org/van/contents/src/" + file.val)
      .then(r => r.json())
      .then(json => content.val = {lang: file.val.split(".").at(-1), code: atob(json.content)})
      .catch(e => content.val = {code: e.toString()}),
    {code: "Loading"}
  ) : {code: "Select a file to browse"})

  const files = van.state([])
  fetch("https://api.github.com/repos/vanjs-org/van/contents/src")
    .then(r => r.json())
    .then(json => files.val = json.map(f => f.name).filter(n => /\.(ts|js)$/.test(n)))
    .catch(e => content.val = {code: e.toString()})

  const browseFile = e => {
    e.preventDefault()
    history.pushState({}, "", "#" + e.target.textContent)
    file.val = e.target.textContent
  }

  return div({class: "row"},
    div({class: "left"}, ul(li({class: "folder"}, "src", () => ul(
      files.val.map(f => li({class: "file"},
        a({href: "#" + f, class: () => f === file.val ? "selected" : "", onclick: browseFile, }, f),
      )),
    )))),
    dom => {
      if (!dom) dom = div({class: "right"}, pre(code()))
      const codeDom = dom.querySelector("code")
      codeDom.textContent = content.val.code
      codeDom.className = content.val.lang ? "language-" + content.val.lang : ""
      content.val.lang && setTimeout(() => Prism.highlightAll(), 5)
      return dom
    },
  )
}

van.add(document.body, Browser())
