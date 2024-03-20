const {table, tbody, thead, td, th, tr} = van.tags

const Table = ({head, data}) => table(
  head ? thead(tr(head.map(h => th(h)))) : [],
  tbody(data.map(row => tr(
    row.map(col => td(col)),
  ))),
)

van.add(document.body, Table({
  head: ["ID", "Name", "Country"],
  data: [
    [1, "John Doe", "US"],
    [2, "Jane Smith", "CA"],
    [3, "Bob Johnson", "AU"],
  ],
}))
