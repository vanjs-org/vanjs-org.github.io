import van from "vanjs-core"
import * as vanX from "vanjs-ext"
import { registerEnv } from "mini-van-plate/shared"
import TodoList from "./components/todo-list.js"

registerEnv({van, vanX})

const {button, p} = van.tags

const hydrate = () => {
  van.hydrate(document.getElementById("todo-list")!, dom => TodoList({
    id: dom.id,
    items: JSON.parse(dom.getAttribute("data-items")!),
  }))
}

van.add(document.body, p(button({onclick: hydrate}, "Hydrate")))
