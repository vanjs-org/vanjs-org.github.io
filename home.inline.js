google.charts.load('current', {packages: ['corechart']})

const libs = [
  ["VanJS", "1.2.5", 0.9, 1.7],
  ["Solid", "1.7.12", 8, 22.7],
  ["jQuery", "3.7.1", 29.7, 85.1],
  ["Vue", "3.3.4", 34.7, 97.1],
  ["ReactDOM", "18.2.0", 42, 130.2],
  ["Angular", "16.2.7", 85.8, 271.6],
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
