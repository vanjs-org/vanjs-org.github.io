import van from "./van-latest.min.js";
const { a, div, p, pre, textarea } = van.tags;
const SuggestionList = ({ candidates, selectedIndex }) => div({ class: "suggestion" }, candidates.map((s, i) => pre({
    "data-index": i,
    class: i === selectedIndex ? "text-row selected" : "text-row",
}, s)));
const lastWord = (text) => { var _a, _b; return (_b = (_a = text.match(/\w+$/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ""; };
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
    const candidates = van.state(getCandidates(""));
    prefix.onnew(p => candidates.val = getCandidates(p));
    const selectedIndex = van.state(0);
    candidates.onnew(() => selectedIndex.val = 0);
    const suggestionList = van.bind(candidates, selectedIndex, (candidates, selectedIndex, dom, oldCandidates, oldSelectedIndex) => {
        var _a, _b, _c, _d;
        if (dom && candidates === oldCandidates) {
            // If the candidate list doesn't change, we don't need to re-render the
            // suggetion list. Just need to change the selected candidate.
            (_b = (_a = dom.querySelector(`[data-index="${oldSelectedIndex}"]`)) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove("selected");
            (_d = (_c = dom.querySelector(`[data-index="${selectedIndex}"]`)) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add("selected");
            return dom;
        }
        return SuggestionList({ candidates, selectedIndex });
    });
    const onkeydown = (e) => {
        var _a;
        if (e.key === "ArrowDown") {
            selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0;
            e.preventDefault();
        }
        else if (e.key === "ArrowUp") {
            selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1;
            e.preventDefault();
        }
        else if (e.key === "Enter") {
            const candidate = (_a = candidates.val[selectedIndex.val]) !== null && _a !== void 0 ? _a : prefix.val;
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
    van.add(document.body, p("Enter English words below with auto completion. Use ↓ and ↑ to change selection, and ↵ to select."), p(a({ href: "https://github.com/first20hours/google-10000-english/blob/master/20k.txt" }, "Dictionary Source")), AutoComplete({ words })).querySelector("textarea").focus();
});
