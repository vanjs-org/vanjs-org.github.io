google.charts.load('current', {packages: ['corechart']})

const libs = [
  ["VanJS", "0.12.4", 0.8, 1.3],
  ["Preact", "10.15.1", 4.3, 10.9],
  ["jQuery", "3.7.0", 29.7, 85.4],
  ["ReactDOM", "18.2.0", 42, 130.5],
  ["Angular", "1.8.3", 62.3, 180.9],
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
