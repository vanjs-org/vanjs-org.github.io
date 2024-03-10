google.charts.load('current', {packages: ['corechart']})

const libs = [
  ["VanJS", "1.5.0", 1, 2],
  ["Solid", "1.8.12", 8.1, 23],
  ["jQuery", "3.7.1", 29.7, 85.1],
  ["Vue", "3.4.15", 40, 110.4],
  ["ReactDOM", "18.2.0", 42, 130.2],
  ["Angular", "17.1.0", 104, 310],
]

const renderSizeCompChart = gz => {
  new google.visualization.BarChart(document.getElementById("size-comp")).draw(
    google.visualization.arrayToDataTable(
      [["Framework", "Size", {role: "style"}, {role: "annotation"}]].concat(
        libs.map(([name, version, minGzSize, minSize]) => {
          const size = gz ? minGzSize : minSize
          return [name, size, name === "VanJS" ? "#f44336" : "#b7b7b7", `${name}-${version} ${size}kB`]
        })
      )
    ),
    {
      title: `Bundle Size Comparison (Minified${gz ? " + Gzipped" : ""})`,
      legend: {position: "none"},
      hAxis: {gridlines: {count: 0}, textPosition: "none"},
      annotations: {alwaysOutside: true},
    },
  )
}

const updateChart = () => renderSizeCompChart(document.getElementById("radioMinGz").checked)

google.charts.setOnLoadCallback(() => renderSizeCompChart(true))

const {button, span} = van.tags

const Counter = () => {
  const counter = van.state(0)
  return span(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, "👍"),
    button({onclick: () => --counter.val}, "👎"),
  )
}

van.add(document.getElementById("demo-counter"), Counter())
