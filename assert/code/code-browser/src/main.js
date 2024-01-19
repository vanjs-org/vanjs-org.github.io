import van from "vanjs-core"

const {a, button, code, div, li, pre, ul} = van.tags

const Browser = () => {
  const file = van.state(location.hash.slice(1))
  window.addEventListener("hashchange", () => file.val = location.hash.slice(1))

  const text = van.derive(() => file.val ? (
    fetch("https://api.github.com/repos/vanjs-org/van/contents/src/" + file.val)
      .then(r => r.json())
      .then(json => text.val = {lang: file.val.split(".").at(-1), str: atob(json.content)})
      .catch(e => text.val = {str: e.toString()}),
    {str: "Loading"}
  ) : {str: "Select a file to browse"})

  const files = van.state([])
  fetch("https://api.github.com/repos/vanjs-org/van/contents/src")
    .then(r => r.json())
    .then(json => files.val = json.map(f => f.name).filter(n => /\.(ts|js)$/.test(n)))
    .catch(e => text.val = {str: e.toString()})

  const browseFile = e => {
    e.preventDefault()
    history.pushState({}, "", new URL(e.target.href).hash)
    dispatchEvent(new Event("hashchange"))
  }

  return div({class: "row"},
    div({class: "left"}, ul(li({class: "folder"}, "src", () => ul(
      files.val.map(f => li({class: "file"},
        a({href: "#" + f, class: () => f === file.val ? "selected" : "", onclick: browseFile}, f),
      )),
    )))),
    (dom = div({class: "right"}, pre(code()))) => {
      const codeDom = dom.querySelector("code")
      codeDom.textContent = text.val.str
      codeDom.className = text.val.lang ? "language-" + text.val.lang : ""
      if (text.val.lang) setTimeout(() => Prism.highlightAll(), 5)
      return dom
    },
  )
}

van.add(document.body, Browser())
