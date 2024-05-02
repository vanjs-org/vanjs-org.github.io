const FilteredCountries = () => {
  const countries = [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana",
    "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
  ]

  const data = vanX.reactive({filter: ""})
  const derived = vanX.reactive({
    filteredCountries: vanX.calc(
      () => countries.filter(c => c.toLowerCase().includes(data.filter.toLowerCase()))),
  })
  return div(
    div("Countries in South America. Filter: ",
      input({type: "text", value: () => data.filter, oninput: e => data.filter = e.target.value})),
    vanX.list(ul, derived.filteredCountries, v => li(v)),
  )
}
