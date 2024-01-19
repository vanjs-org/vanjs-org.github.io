div({class: "root"}, textarea({onkeydown, oninput}), dom => {
  if (dom && candidates.val === candidates.oldVal) {
    // If the candidate list doesn't change, we don't need to re-render the
    // suggetion list. Just need to change the selected candidate.
    dom.querySelector(`[data-index="${selectedIndex.oldVal}"]`)
      ?.classList?.remove("selected")
    dom.querySelector(`[data-index="${selectedIndex.val}"]`)
      ?.classList?.add("selected")
    return dom
  }
  return SuggestionList({candidates: candidates.val, selectedIndex: selectedIndex.val})
})
