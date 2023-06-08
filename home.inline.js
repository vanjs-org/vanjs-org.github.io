google.charts.load('current', {packages: ['corechart']})
google.charts.setOnLoadCallback(() => {
  new google.visualization.BarChart(document.getElementById("size-comp")).draw(
    google.visualization.arrayToDataTable([
      ['Framework', 'Size', {role: 'style'}, {role: 'annotation'}],
      ['VanJS', 1.3, '#f44336', 'VanJS-0.12.0 1.3kB'],
      ['Preact', 10.8, '#b7b7b7', 'Preact-10.13.1 10.8kB'],
      ['jQuery', 88.2, '#b7b7b7', 'jQuery-3.6.4 88.2kB'],
      ['ReactDom', 130.5, '#b7b7b7', 'ReactDom-18.2.0 130.5kB'],
      ['Angular', 180.9, '#b7b7b7', 'Angular-1.8.3 180.9kB'],
    ]),
    {
      title: "Bundle Size Comparison (Minimized)",
      legend: {position: "none"},
      hAxis: {gridlines: {count: 0}, textPosition: "none"},
      annotations: {alwaysOutside: true},
    },
  )
})
