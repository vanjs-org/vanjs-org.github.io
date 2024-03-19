const {a, b, button, code, del, div, i, input, label, li, p, pre, span, table, tbody, td, textarea, th, thead, tr, ul} = van.tags

document.getElementById("random-demo").addEventListener("click", () => {
  const allDemos = [...document.querySelectorAll("h2")].map(e => e.id).slice(0, -1)
  const demo = allDemos[Math.floor(Math.random() * allDemos.length)]
  const url = new URL(location)
  url.hash = "#" + demo
  history.pushState({}, "", url)
  document.getElementById(demo).scrollIntoView()
})

{
  const Hello = () => div(
    p("👋Hello"),
    ul(
      li("🗺️World"),
      li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
    ),
  )

  van.add(document.getElementById("demo-hello"), Hello())
}

{
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const Run = ({sleepMs}) => {
    const steps = van.state(0)
    ;(async () => { for (; steps.val < 40; ++steps.val) await sleep(sleepMs) })()
    return pre(() => `${" ".repeat(40 - steps.val)}🚐💨Hello VanJS!${"_".repeat(steps.val)}`)
  }

  const Hello = () => {
    const dom = div()
    return div(
      dom,
      button({onclick: () => van.add(dom, Run({sleepMs: 2000}))}, "Hello 🐌"),
      button({onclick: () => van.add(dom, Run({sleepMs: 500}))}, "Hello 🐢"),
      button({onclick: () => van.add(dom, Run({sleepMs: 100}))}, "Hello 🚶‍♂️"),
      button({onclick: () => van.add(dom, Run({sleepMs: 10}))}, "Hello 🏎️"),
      button({onclick: () => van.add(dom, Run({sleepMs: 2}))}, "Hello 🚀"),
    )
  }

  van.add(document.getElementById("demo-hello-fun"), Hello())
}

{
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
        button({onclick: () => alert("Hello from VanJS")}, "Hello"),
      ),
    )
    return dom
  }

  van.add(document.getElementById("demo-static"), StaticDom())
}

{
  const Counter = () => {
    const counter = van.state(0)
    return span(
      "❤️ ", counter, " ",
      button({onclick: () => ++counter.val}, "👍"),
      button({onclick: () => --counter.val}, "👎"),
    )
  }

  van.add(document.getElementById("demo-counter-simple"), Counter())
}

{
  const buttonStyleList = [
    ["👆", "👇"],
    ["👍", "👎"],
    ["🔼", "🔽"],
    ["⬆️", "⬇️"],
    ["⏫", "⏬"],
    ["📈", "📉"],
  ]

  const Counter = ({buttons}) => {
    const counter = van.state(0)
    const dom = div(
      "❤️ ", counter, " ",
      button({onclick: () => ++counter.val}, buttons[0]),
      button({onclick: () => --counter.val}, buttons[1]),
      button({onclick: () => dom.remove()}, "❌"),
    )
    return dom
  }

  const CounterSet = () => {
    const containerDom = div()
    return div(
      containerDom,
      button({onclick: () => van.add(containerDom,
        Counter({buttons: buttonStyleList[Math.floor(Math.random() * buttonStyleList.length)]}))},
        "➕",
      ),
    )
  }

  van.add(document.getElementById("demo-counter-advanced"), CounterSet())
}

{
  const {button, pre, span} = van.tags

  const Stopwatch = () => {
    const elapsed = van.state(0)
    let id
    const start = () => id = id || setInterval(() => elapsed.val += .01, 10)
    return span(
      pre({style: "display: inline;"}, () => elapsed.val.toFixed(2), "s "),
      button({onclick: start}, "Start"),
      button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
      button({onclick: () => (clearInterval(id), id = 0, elapsed.val = 0)}, "Reset"),
    )
  }

  van.add(document.getElementById("demo-stopwatch"), Stopwatch())
}

{
  const TodoItem = ({text}) => div(
    input({type: "checkbox", onchange: e =>
      e.target.closest("div").querySelector("span").style["text-decoration"] =
        e.target.checked ? "line-through" : ""
    }),
    span(text),
    a({onclick: e => e.target.closest("div").remove()}, "❌"),
  )

  const TodoList = () => {
    const inputDom = input({type: "text"})
    const dom = div(
      inputDom,
      button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
    )
    return dom
  }

  van.add(document.getElementById("demo-todo-procedural"), TodoList())
}

{
  const TodoItem = ({text}) => {
    const done = van.state(false), deleted = van.state(false)
    return () => deleted.val ? null : div(
      input({type: "checkbox", checked: done, onclick: e => done.val = e.target.checked}),
      () => (done.val ? del : span)(text),
      a({onclick: () => deleted.val = true}, "❌"),
    )
  }

  const TodoList = () => {
    const inputDom = input({type: "text"})
    const dom = div(
      inputDom,
      button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
    )
    return dom
  }

  van.add(document.getElementById("demo-todo-functional"), TodoList())
}

{
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
  const TodoItem = ({ text, done, deleted }) => () => deleted.val ? null : div(input({ type: "checkbox", checked: done, onclick: e => done.val = e.target.checked }), () => (done.val ? del : span)(text), a({ onclick: () => deleted.val = true }, "❌"));
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
      return div(inputDom, button({ onclick: () => appState.val = appState.val.add(inputDom.value) }, "Add"), (dom) => dom ?
          van.add(dom, TodoItem(appState.val.todos.at(-1))) :
          div(appState.val.todos.map(TodoItem)));
  };
  van.add(document.getElementById("demo-todo-fully-reactive"), TodoList());
}

{
  const TodoList = () => {
    const items = vanX.reactive(JSON.parse(localStorage.getItem("appState") ?? "[]"))
    van.derive(() => localStorage.setItem("appState", JSON.stringify(items.filter(v => v))))
    const inputDom = input({type: "text"})
    return div(
      inputDom, button({onclick: () => items.push({text: inputDom.value, done: false})}, "Add"),
      vanX.list(div, items, ({val: v}, deleter) => div(
        input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
        () => (v.done ? del : span)(v.text),
        a({onclick: deleter}, "❌"),
      )),
    )
  }

  van.add(document.getElementById("demo-todo-fully-reactive-vanx"), TodoList())
}

{
  const tsToDate = ts =>
    ts < 1e10 ? new Date(ts * 1e3) :
    ts < 1e13 ? new Date(ts) :
    ts < 1e16 ? new Date(ts / 1e3) :
    new Date(ts / 1e6)

  const Converter = () => {
    const nowTs = van.state(Math.floor(new Date().getTime() / 1e3)), date = van.state(null)
    setInterval(() => ++nowTs.val, 1000)
    const inputDom = input({type: "text", size: 25, value: nowTs.val})
    return div(
      div(b("Now: "), nowTs),
      inputDom, " ",
      button({onclick: () => date.val = tsToDate(Number(inputDom.value))}, "Convert"),
      p(i("Supports Unix timestamps in seconds, milliseconds, microseconds and nanoseconds.")),
      () => date.val ? p(
        div(date.val.toString()),
        div(b("GMT: "), date.val.toGMTString()),
      ) : p(),
    )
  }

  van.add(document.getElementById("demo-epoch-converter"), Converter())
}

{
  const Label = text => span({class: "label"}, text)
  const Value = text => span({class: "value"}, text)

  const Inspector = () => {
    const keyEvent = van.state(new KeyboardEvent("keydown"))

    const Result = prop => span(Label(prop + ": "), Value(() => keyEvent.val[prop]))

    return div(
      div(input({placeholder: "Focus here and press keys…", style: "width: 260px",
        onkeydown: e => (e.preventDefault(), keyEvent.val = e)})),
      div(Result("key"), Result("code"), Result("which"), Result("keyCode")),
      div(Result("ctrlKey"), Result("metaKey"), Result("altKey"), Result("shiftKey")),
    )
  }

  van.add(document.getElementById("demo-key-inspector"), Inspector())
}

{
  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const DiffApp = () => {
    const oldTextDom = textarea({oninput: autoGrow, rows: 1})
    const newTextDom = textarea({oninput: autoGrow, rows: 1})
    const diff = van.state([])
    return div(
      div({class: "row"},
        div({class: "column"}, oldTextDom), div({class: "column"}, newTextDom),
      ),
      div({class: "row"},
        button({onclick: () => diff.val = Diff.diffWords(oldTextDom.value, newTextDom.value)},
          "Diff",
        ),
      ),
      div({class: "row"}, () => div({class: "column", style: "white-space: pre-wrap;"},
        diff.val.map(d => span({class: d.added ? "add" : (d.removed ? "remove" : "")}, d.value)),
      )),
    )
  }

  van.add(document.getElementById("demo-diff-simple"), DiffApp())
}

{
  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const Line = ({diff, skipAdd, skipRemove}) => div(
    {class: "column", style: "white-space: pre-wrap;"},
    diff.filter(d => !(skipAdd && d.added || skipRemove && d.removed)).map(d =>
      span({class: d.added ? "add" : (d.removed ? "remove" : "")}, d.value)),
  )

  const DiffLine = (oldLine, newLine, showMerged) => {
    const diff = Diff.diffWords(oldLine, newLine)
    return div({class: "row" + (showMerged ? " merged" : "")},
      showMerged ?
        Line({diff}) : [Line({diff, skipAdd: true}), Line({diff, skipRemove: true})],
    )
  }

  const DiffApp = () => {
    const oldTextDom = textarea({oninput: autoGrow, rows: 1})
    const newTextDom = textarea({oninput: autoGrow, rows: 1})
    const diff = van.state([])
    const showMerged = van.state(true)
    return div(
      div({class: "row"},
        div({class: "column"}, oldTextDom), div({class: "column"}, newTextDom),
      ),
      div({class: "row"},
        button({onclick: () => diff.val = Diff.diffLines(oldTextDom.value, newTextDom.value)},
          "Diff",
        ),
        input({type: "checkbox", checked: showMerged,
          oninput: e => showMerged.val = e.target.checked}),
        "show merged result"
      ),
      () => {
        const diffVal = diff.val, showMergedVal = showMerged.val, resultDom = div()
        for (let i = 0; i < diffVal.length; ) {
          let line
          if (diffVal[i].added && diffVal[i + 1].removed) {
            line = DiffLine(diffVal[i + 1].value, diffVal[i].value, showMergedVal)
            i += 2
          } else if (diffVal[i].removed && diffVal[i + 1].added) {
            line = DiffLine(diffVal[i].value, diffVal[i + 1].value, showMergedVal)
            i += 2
          } else if (diffVal[i].added) {
            line = showMergedVal ? div({class: "merged add row"},
              div({class: "column", style: "white-space: pre-wrap;"}, diffVal[i].value),
            ) : div({class: "row"},
              div({class: "column"}),
              div({class: "add column", style: "white-space: pre-wrap;"}, diffVal[i].value),
            )
            ++i
          } else if (diffVal[i].removed) {
            line = showMergedVal ? div({class: "merged remove row"},
              div({class: "column", style: "white-space: pre-wrap;"}, diffVal[i].value),
            ) : div({class: "row"},
              div({class: "remove column", style: "white-space: pre-wrap;"}, diffVal[i].value),
            )
            ++i
          } else {
            line = div({class: "row", style: "white-space: pre-wrap;"},
              showMergedVal ? div({class: "merged column"}, diffVal[i].value) :
                [
                  div({class: "column"}, diffVal[i].value),
                  div({class: "column"}, diffVal[i].value),
                ],
            )
            ++i
          }
          van.add(resultDom, line)
        }
        return resultDom
      },
    )
  }

  van.add(document.getElementById("demo-diff"), DiffApp())
}

{
  const setCalculatorHeight = () => {
    const calculatorDom = document.getElementById("demo-calculator")
    calculatorDom.style.height = calculatorDom.clientWidth * (4 / 3) + "px"
  }
  addEventListener("resize", setCalculatorHeight)
  setCalculatorHeight()
}

{
  const TableViewer = ({inputText, inputType}) => {
    const jsonRadioDom = input({type: "radio", checked: inputType === "json",
      name: "inputType", value: "json"})
    const csvRadioDom = input({type: "radio", checked: inputType === "csv",
      name: "inputType", value: "csv"})
    const autoGrow = e => {
      e.style.height = "5px"
      e.style.height = (e.scrollHeight + 5) + "px"
    }
    const textareaDom = textarea({oninput: e => autoGrow(e.target)}, inputText)
    setTimeout(() => autoGrow(textareaDom), 10)

    const text = van.state("")

    const tableFromJson = text => {
      const json = JSON.parse(text), head = Object.keys(json[0])
      return {
        head,
        data: json.map(row => head.map(h => row[h]))
      }
    }

    const tableFromCsv = text => {
      const lines = text.split("\n").filter(l => l.length > 0)
      return {
        head: lines[0].split(","),
        data: lines.slice(1).map(l => l.split(",")),
      }
    }

    return div(
      div(jsonRadioDom, label("JSON"), csvRadioDom, label("CSV (Quoting not Supported)")),
      div(textareaDom),
      div(button({onclick: () => text.val = textareaDom.value}, "Show Table")),
      p(() => {
        if (!text.val) return div()
        try {
          const {head, data} = (jsonRadioDom.checked ? tableFromJson : tableFromCsv)(text.val)
          return table(
            thead(tr(head.map(h => th(h)))),
            tbody(data.map(row => tr(row.map(col => td(col))))),
          )
        } catch (e) {
          return pre({class: "err"}, e.toString())
        }
      }),
    )
  }

  van.add(document.getElementById("demo-table-viewer"), TableViewer({
    inputText: `[{"id":1,"name":"John Doe","email":"john.doe@example.com","age":35,"country":"USA"},{"id":2,"name":"Jane Smith","email":"jane.smith@example.com","age":28,"country":"Canada"},{"id":3,"name":"Bob Johnson","email":"bob.johnson@example.com","age":42,"country":"Australia"}]`,
    inputType: "json",
  }))
}

{
  const ListItem = ({key, value, indent = 0}) => {
    const hide = van.state(key !== "")
    const valueDom = typeof value !== "object" ? value : div(
      {style: () => hide.val ? "display: none;" : ""},
      Object.entries(value).map(([k, v]) =>
        ListItem({key: k, value: v, indent: indent + 2 * (key !== "")})),
    )
    return (key ? div : pre)(
      " ".repeat(indent),
      key ? (
        typeof valueDom !== "object" ? ["🟰 ", b(`${key}: `)] :
          a({onclick: () => hide.val = !hide.val, style: "cursor: pointer"},
            () => hide.val ? "➕ " : "➖ ", b(`${key}: `), () => hide.val ? "…" : "",
          )
      ) : [],
      valueDom,
    )
  }

  const JsonInspector = ({initInput}) => {
    const autoGrow = e => {
      e.style.height = "5px"
      e.style.height = (e.scrollHeight + 5) + "px"
    }
    const textareaDom = textarea({oninput: e => autoGrow(e.target)}, initInput)
    setTimeout(() => autoGrow(textareaDom), 10)
    const errmsg = van.state(""), json = van.state(null)

    const inspect = () => {
      try {
        json.val = JSON.parse(textareaDom.value)
        errmsg.val = ""
      } catch (e) {
        errmsg.val = e.message
      }
    }

    return div(
      div(textareaDom),
      div(button({onclick: inspect}, "Inspect")),
      pre({style: "color: red"}, errmsg),
      () => json.val ? ListItem({key: "", value: json.val}) : "",
    )
  }

  van.add(document.getElementById("demo-json-inspector"), JsonInspector({initInput: `{"name":"John Doe","age":30,"email":"johndoe@example.com","address":{"street":"123 Main St","city":"Anytown","state":"CA","zip":"12345"},"phone_numbers":[{"type":"home","number":"555-1234"},{"type":"work","number":"555-5678"}]}`}))
}

{
  const SuggestionList = ({ candidates, selectedIndex }) => div({ class: "suggestion" }, candidates.map((s, i) => pre({
      "data-index": i,
      class: i === selectedIndex ? "text-row selected" : "text-row",
  }, s)));
  const lastWord = (text) => text.match(/\w+$/)?.[0] ?? "";
  const AutoComplete = ({ words }) => {
      const getCandidates = (prefix) => {
          const maxTotal = 10, result = [];
          for (let word of words) {
              if (word.startsWith(prefix.toLowerCase()))
                  result.push(word);
              if (result.length >= maxTotal)
                  break;
          }
          return result;
      };
      const prefix = van.state("");
      const candidates = van.derive(() => getCandidates(prefix.val));
      // Resetting selectedIndex to 0 whenever candidates change
      const selectedIndex = van.derive(() => (candidates.val, 0));
      const onkeydown = (e) => {
          if (e.key === "ArrowDown") {
              selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0;
              e.preventDefault();
          }
          else if (e.key === "ArrowUp") {
              selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1;
              e.preventDefault();
          }
          else if (e.key === "Enter") {
              const candidate = candidates.val[selectedIndex.val] ?? prefix.val;
              const target = e.target;
              target.value += candidate.substring(prefix.val.length);
              target.setSelectionRange(target.value.length, target.value.length);
              prefix.val = lastWord(target.value);
              e.preventDefault();
          }
      };
      const oninput = (e) => prefix.val = lastWord(e.target.value);
      return div({ class: "root" }, textarea({ onkeydown, oninput }), (dom) => {
          if (dom && candidates.val === candidates.oldVal) {
              // If the candidate list doesn't change, we don't need to re-render the
              // suggestion list. Just need to change the selected candidate.
              dom.querySelector(`[data-index="${selectedIndex.oldVal}"]`)
                  ?.classList?.remove("selected");
              dom.querySelector(`[data-index="${selectedIndex.val}"]`)
                  ?.classList?.add("selected");
              return dom;
          }
          return SuggestionList({ candidates: candidates.val, selectedIndex: selectedIndex.val });
      });
  };
  fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt")
      .then(r => r.text())
      .then(t => t.split("\n"))
      .then(words => {
      van.add(document.getElementById("demo-auto-complete-stateful-binding"), p("Enter English words below with auto completion. Use ↓ and ↑ to change selection, and ↵ to select."), p(a({ href: "https://github.com/first20hours/google-10000-english/blob/master/20k.txt" }, "Dictionary Source")), AutoComplete({ words }));
  });
}

{
  const lastWord = (text) => text.match(/\w+$/)?.[0] ?? "";
  const AutoComplete = ({ words }) => {
      const maxTotalCandidates = 10;
      const getCandidates = (prefix) => {
          const result = [];
          for (let word of words) {
              if (word.startsWith(prefix.toLowerCase()))
                  result.push(word);
              if (result.length >= maxTotalCandidates)
                  break;
          }
          return result;
      };
      const prefix = van.state("");
      const candidates = van.derive(() => getCandidates(prefix.val));
      // Resetting selectedIndex to 0 whenever candidates change
      const selectedIndex = van.derive(() => (candidates.val, 0));
      const SuggestionListItem = ({ index }) => pre({ class: () => index === selectedIndex.val ? "text-row selected" : "text-row" }, () => candidates.val[index] ?? "");
      const suggestionList = div({ class: "suggestion" }, Array.from({ length: 10 }).map((_, index) => SuggestionListItem({ index })));
      const onkeydown = (e) => {
          if (e.key === "ArrowDown") {
              selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0;
              e.preventDefault();
          }
          else if (e.key === "ArrowUp") {
              selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1;
              e.preventDefault();
          }
          else if (e.key === "Enter") {
              const candidate = candidates.val[selectedIndex.val] ?? prefix.val;
              const target = e.target;
              target.value += candidate.substring(prefix.val.length);
              target.setSelectionRange(target.value.length, target.value.length);
              prefix.val = lastWord(target.value);
              e.preventDefault();
          }
      };
      const oninput = (e) => prefix.val = lastWord(e.target.value);
      return div({ class: "root" }, textarea({ onkeydown, oninput }), suggestionList);
  };
  fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt")
      .then(r => r.text())
      .then(t => t.split("\n"))
      .then(words => {
      van.add(document.getElementById("demo-auto-complete-derived-props"), p("Enter English words below with auto completion. Use ↓ and ↑ to change selection, and ↵ to select."), p(a({ href: "https://github.com/first20hours/google-10000-english/blob/master/20k.txt" }, "Dictionary Source")), AutoComplete({ words }));
  });
}

{
  const toDataArray = data => {
    const hasPrimitive = !data.every(r => typeof r === "object")
    const keys = [...new Set(
      data.flatMap(r => typeof r === "object" ? Object.keys(r) : []))]
    return [
      (hasPrimitive ? ["Value"] : []).concat(keys),
      ...data.map(r =>
        (typeof r === "object" ? (hasPrimitive ? [""] : []) : [r]).concat(
          keys.map(k => r[k] ?? "")
        )),
    ]
  }

  const table = data => {
    const dataArray = toDataArray(data)
    return van.tags.table(
      thead(tr(th("(index)"), dataArray[0].map(k => th(k)))),
      tbody(dataArray.slice(1).map((r, i) => tr(td(i), r.map(c => td(c))))),
    )
  }

  const plot = (data, chartType, options) => {
    if (data[0].constructor === Object) data = toDataArray(data)
    else if (typeof data[0] === "number")
      data = [["", "Value"], ...data.map((d, i) => [i + 1, d])]
    const dom = div({class: "chart"})
    setTimeout(() => new google.visualization[chartType](dom).draw(
      google.visualization.arrayToDataTable(data), options))
    return dom
  }

  const Tree = ({obj, indent = ""}) =>
    (indent ? div : pre)(Object.entries(obj).map(([k, v]) => {
      if (v?.constructor !== Object && !Array.isArray(v))
        return div(indent + "🟰 ", van.tags.b(k + ": "), v)
      const expanded = van.state(false)
      let treeDom
      const onclick = van.derive(() => expanded.val ?
        () => (treeDom.remove(), expanded.val = !expanded.val) :
        () => (treeDom = result.appendChild(Tree({obj: v, indent: indent + "  "}),
          expanded.val = !expanded.val)))
      const result = div(
        indent,
        van.tags.a({onclick},
          () => expanded.val ? "➖ " : "➕ ",
          van.tags.b(k + ":"),
          () => expanded.val ? "" : " {…}",
        ),
      )
      return result
    }))

  const ValueView = expr => {
    try {
      const value = eval(`(${expr})`)
      if (value instanceof Element) return value
      if (value?.constructor === Object || Array.isArray(value)) return Tree({obj: value})
      return pre(String(value))
    } catch (e) {
      return pre({class: "err"}, e.message + "\n" + e.stack)
    }
  }

  const Output = ({id, expr}) => div({class: "row"},
    pre({class: "left"}, `Out[${id}]:`),
    div({class: "break"}),
    div({class: "right"}, ValueView(expr)),
  )

  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const Input = ({id}) => {
    const run = () => {
      textareaDom.setAttribute("readonly", true)
      runDom.disabled = true
      const newTextDom = van.add(textareaDom.closest(".console"), Output({id, expr: textareaDom.value}))
        .appendChild(Input({id: id + 1}))
        .querySelector("textarea")
      newTextDom.focus()
      setTimeout(() => newTextDom.scrollIntoView({block: "center", inline: "nearest"}), 10)
    }
    const runDom = button({class: "run", onclick: run}, "Run")
    const onkeydown = async e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault()
        run()
      }
    }
    const textareaDom = textarea({id, type: "text", onkeydown, oninput: autoGrow,
      rows: 1, placeholder: 'Enter JS expression here:'})
    return div({class: "row"},
      pre({class: "left"}, `In[${id}]:`), runDom, div({class: "break"}),
      div({class: "right"}, textareaDom),
    )
  }

  const Console = () => div({class: "console"}, Input({id: 1}))

  const Snippet = str => {
    const copyToClipboard = e => navigator.clipboard.writeText(str)
      .then(() => {
        const msgDom = van.tags.i("Copied!")
        e.target.after(msgDom)
        setTimeout(() => msgDom.remove(), 1000)
      }, () => {
        const msgDom = van.tags.i("Copy failed: " + e.message)
        e.target.after(msgDom)
        setTimeout(() => msgDom.remove(), 1000)
      })
    return str.includes("\n") ? div(
      van.tags.a({onclick: copyToClipboard}, "📋"), pre(str),
    ) : span(
      code(str), van.tags.a({onclick: copyToClipboard}, "📋")
    )
  }

  google.charts.load('current', {packages: ['corechart']})
  google.charts.setOnLoadCallback(() =>
    van.add(document.getElementById("demo-js-console"),
      div("JavaScript Console. Please enter JS expression here, and type ⌘ + ↵ or ^ + ↵ to evaluate:"),
      div("You can assign variables in format like 'x = 3 + 5'."),
      p("Try the following commands:", ul(
        li(Snippet("{a: 1, b: {c: 2, d: 3}}")),
        li(Snippet("table([{a: 1, b: 2}, {b: 2, c: 3}])")),
        li("Any valid JSON string, e.g.: ", Snippet('{"name":"John","pets":[{"name":"Fluffy","species":"cat"},{"name":"Buddy","species":"dog"}]}')),
        li(Snippet('plot([2, 5, 3], "LineChart")')),
        li(Snippet('plot([{Year:"2020",Sales:1000,Expenses:400},{Year:"2021",Sales:1170,Expenses:460},{Year:"2022",Sales:660,Expenses:1120},{Year:"2023",Sales:1030,Expenses:540}], "LineChart", {legend:{position:"bottom"}})')),
        li("The chart shown in the home page:", Snippet(`plot([
  ["Framework", "Size", {role: "style"}, {role: "annotation"}],
  ["VanJS", 1, "#f44336", "VanJS-1.5.0 1kB"],
  ["Solid", 8.1, "#b7b7b7", "Solid-1.8.12 8.1kB"],
  ["jQuery", 29.7, "#b7b7b7", "jQuery-3.7.1 29.7kB"],
  ["Vue", 40, "#b7b7b7", "Vue-3.4.15 40kB"],
  ["ReactDOM", 42, "#b7b7b7", "ReactDOM-18.2.0 42kB"],
  ["Angular", 104, "#b7b7b7", "Angular-17.1.0 104kB"],
], "BarChart", {
  legend: {position: "none"},
  hAxis: {gridlines: {count: 0}, textPosition: "none"},
  annotations: {alwaysOutside: true},
})`)),
        li("More chart types supported in ", van.tags.a({href: "https://developers.google.com/chart/interactive/docs"}, "Google Charts")),
      )),
      Console()
    )
  )
}
