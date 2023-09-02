import { VanObj, State } from "mini-van-plate/shared"

interface Props {
  van: VanObj
  id?: string
  init?: number
  buttonStyle?: string | State<string>
}

export default ({
  van, id, init = 0, buttonStyle = "👍👎",
}: Props) => van.tags.div((dom: Node) => {
  if (dom) return dom

  const {button, div} = van.tags

  const counter = van.state(init)
  const up = van.state(<string | undefined>undefined)
  const down = van.state(<string | undefined>undefined)
  van.derive(() => [up.val, down.val] = [...van.val(buttonStyle)])

  return div({...(id ? {id} : {}), "data-counter": counter},
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, up),
    button({onclick: () => --counter.val}, down),
  )
}).firstChild
