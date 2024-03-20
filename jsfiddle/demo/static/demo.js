const {a, button, div, h1} = van.tags

const StaticDom = () => {
  const dom = div(
    div(
      button("Dummy Button"),
      button(
        {onclick: () =>
          van.add(dom,
            div(button("New Button")),
            div(a({href: "https://www.example.com/"}, "This is a link")),
          )
        },
        "Button to Add More Elements"),
      button({onclick: () => alert("Hello from 🍦VanJS")}, "Hello"),
    ),
  )
  return dom
}

van.add(document.body, StaticDom())
