import van, { State } from "vanjs-core"

const {a, button, del, div, input, span} = van.tags

class TodoItemState {
  constructor(public text: string, public done: State<boolean>, public deleted: State<boolean>) {}
  serialize() { return {text: this.text, done: this.done.val} }
}

const TodoItem = ({text, done, deleted}: TodoItemState) => () => deleted.val ? null : div(
  input({type: "checkbox", checked: done, onclick: e => done.val = e.target.checked}),
  () => (done.val ? del : span)(text),
  a({onclick: () => deleted.val = true}, "❌"),
)

class TodoListState {
  private constructor(public todos: TodoItemState[]) {}

  save() {
    localStorage.setItem("appState", JSON.stringify(
      (this.todos = this.todos.filter(t => !t.deleted.val)).map(t => t.serialize())))
  }

  static readonly load = () => new TodoListState(
    JSON.parse(localStorage.getItem("appState") ?? "[]")
      .map((t: any) => new TodoItemState(t.text, van.state(t.done), van.state(false)))
  )

  add(text: string) {
    this.todos.push(new TodoItemState(text, van.state(false), van.state(false)))
    return new TodoListState(this.todos)
  }
}

const TodoList = () => {
  const appState = van.state(TodoListState.load())
  van.derive(() => appState.val.save())
  const inputDom = input({type: "text"})
  return div(
    inputDom, button({onclick: () => appState.val = appState.val.add(inputDom.value)}, "Add"),
    (dom?: Element) => dom ?
      van.add(dom, TodoItem(appState.val.todos.at(-1)!)) :
      div(appState.val.todos.map(TodoItem)),
  )
}

van.add(document.body, TodoList())
