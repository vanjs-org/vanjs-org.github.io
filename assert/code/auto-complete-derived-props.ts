import van from "./van-latest.min.js"

const {a, div, p, pre, textarea} = van.tags

const lastWord = (text: string) => text.match(/\w+$/)?.[0] ?? ""

const AutoComplete = ({words}: {readonly words: readonly string[]}) => {
  const maxTotalCandidates = 10

  const getCandidates = (prefix: string) => {
    const result: string[] = []
    for (let word of words) {
      if (word.startsWith(prefix.toLowerCase())) result.push(word)
      if (result.length >= maxTotalCandidates) break
    }
    return result
  }

  const prefix = van.state("")
  const candidates = van.derive(() => getCandidates(prefix.val))
  // Resetting selectedIndex to 0 whenever candidates change
  const selectedIndex = van.derive(() => (candidates.val, 0))

  const SuggestionListItem = ({index}: {index: number}) => pre(
    {class: () => index === selectedIndex.val ? "text-row selected" : "text-row"},
    () => candidates.val[index] ?? "",
  )

  const suggestionList = div({class: "suggestion"},
    Array.from({length: 10}).map((_, index) => SuggestionListItem({index})))

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0
      e.preventDefault()
    } else if (e.key === "ArrowUp") {
      selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1
      e.preventDefault()
    } else if (e.key === "Enter") {
      const candidate = candidates.val[selectedIndex.val] ?? prefix.val
      const target = <HTMLTextAreaElement>e.target
      target.value += candidate.substring(prefix.val.length)
      target.setSelectionRange(target.value.length, target.value.length)
      prefix.val = lastWord(target.value)
      e.preventDefault()
    }
  }

  const oninput = (e: Event) => prefix.val = lastWord((<HTMLTextAreaElement>e.target).value)

  return div({class: "root"}, textarea({onkeydown, oninput}), suggestionList)
}

fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt")
  .then(r => r.text())
  .then(t => t.split("\n"))
  .then(words => {
    van.add(document.body,
      p("Enter English words below with auto completion. Use ↓ and ↑ to change selection, and ↵ to select."),
      p(a({href: "https://github.com/first20hours/google-10000-english/blob/master/20k.txt"},
        "Dictionary Source")),
      AutoComplete({words}),
    ).querySelector("textarea")!.focus();
  })
