import { VanObj } from "mini-van-plate/shared"

interface Props {
  van: VanObj
  id?: string
  init: number
  buttonStyle?: string
}

export default ({
  van, id, init, buttonStyle = "👍👎",
}: Props) => {
  const {button, div} = van.tags

  const [up, down] = [...buttonStyle]
  const counter = van.state(init)
  return div({...(id ? {id} : {}), "data-counter": counter},
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, up),
    button({onclick: () => --counter.val}, down),
  )
}
