const FilteredCountries = () => {
  const countries = [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana",
    "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
  ]

  const base = vanX.reactive({filter: ""})
  const derived = vanX.reactive({
    filteredCountries: vanX.calc(
      () => countries.filter(c => c.toLowerCase().includes(base.filter.toLowerCase()))),
  })
  return div(
    div("Countries in South America. Filter: ",
      input({type: "text", value: () => base.filter, oninput: e => base.filter = e.target.value})),
    vanX.list(ul, derived.filteredCountries, v => li(v)),
  )
}
