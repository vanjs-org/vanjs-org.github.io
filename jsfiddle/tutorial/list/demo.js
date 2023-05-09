const {li, ul} = van.tags

const List = ({items}) => ul(items.map(it => li(it)))

van.add(document.body, List({items: ["Item 1", "Item 2", "Item 3"]}))
