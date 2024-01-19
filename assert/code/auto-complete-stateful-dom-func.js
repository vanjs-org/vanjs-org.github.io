import van from "./van-latest.min.js";
const { a, div, p, pre, textarea } = van.tags;
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
    van.add(document.body, p("Enter English words below with auto completion. Use ↓ and ↑ to change selection, and ↵ to select."), p(a({ href: "https://github.com/first20hours/google-10000-english/blob/master/20k.txt" }, "Dictionary Source")), AutoComplete({ words })).querySelector("textarea").focus();
});
