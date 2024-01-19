import common from "../common"
import type { VanObj } from "../type"

export default async (van: VanObj) => {
  const {tags: {div, i, p}} = van
  const {H1, Link, VanJS} = common(van)

  return div({id: "content"},
    H1("HTML/MD Snippet to 🍦VanJS Code"),
    p(i("The library version of the converter with the support of custom ", VanJS(), " components is ", Link("here", "https://github.com/vanjs-org/converter"), ".")),
    p({id: "converter"}),
  )
}
