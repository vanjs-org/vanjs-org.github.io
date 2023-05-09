import van from "./van-latest.min.js";
const { a, div, p, pre, textarea } = van.tags;
const lastWord = (text) => { var _a, _b; return (_b = (_a = text.match(/\w+$/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ""; };
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
    const candidates = van.state(getCandidates(""));
    prefix.onnew(p => candidates.val = getCandidates(p));
    const selectedIndex = van.state(0);
    candidates.onnew(() => selectedIndex.val = 0);
    const SuggestionListItem = ({ index }) => pre({ class: { deps: [selectedIndex], f: s => index === s ? "text-row selected" : "text-row" } }, van.bind(candidates, c => { var _a; return (_a = c[index]) !== null && _a !== void 0 ? _a : ""; }));
    const indices = [];
    for (let i = 0; i < 10; ++i)
        indices.push(i);
    const suggestionList = div({ class: "suggestion" }, indices.map(index => SuggestionListItem({ index })));
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
