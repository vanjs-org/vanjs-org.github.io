import van from "vanjs-core";
const { a, button, div, input, span, strike } = van.tags;
class TodoItemState {
    text;
    done;
    deleted;
    constructor(text, done, deleted) {
        this.text = text;
        this.done = done;
        this.deleted = deleted;
    }
    serialize() { return { text: this.text, done: this.done.val }; }
}
const TodoItem = ({ text, done, deleted }) => () => deleted.val ? null : div(input({ type: "checkbox", checked: done, onclick: e => done.val = e.target.checked }), () => (done.val ? strike : span)(text), a({ onclick: () => deleted.val = true }, "❌"));
class TodoListState {
    todos;
    constructor(todos) {
        this.todos = todos;
    }
    save() {
        localStorage.setItem("appState", JSON.stringify((this.todos = this.todos.filter(t => !t.deleted.val)).map(t => t.serialize())));
    }
    static load = () => new TodoListState(JSON.parse(localStorage.getItem("appState") ?? "[]")
        .map((t) => new TodoItemState(t.text, van.state(t.done), van.state(false))));
    add(text) {
        this.todos.push(new TodoItemState(text, van.state(false), van.state(false)));
        return new TodoListState(this.todos);
    }
}
const TodoList = () => {
    const appState = van.state(TodoListState.load());
    van.derive(() => appState.val.save());
    const inputDom = input({ type: "text" });
    return div(inputDom, button({ onclick: () => appState.val = appState.val.add(inputDom.value) }, "Add"), (dom) => {
        if (!dom)
            return div(appState.val.todos.map(TodoItem));
        const newItem = appState.val.todos.at(-1);
        van.add(dom, TodoItem(newItem));
        van.derive(() => (newItem.done.val, newItem.deleted.val,
            requestIdleCallback(() => appState.val.save())));
        return dom;
    });
};
van.add(document.body, TodoList());
