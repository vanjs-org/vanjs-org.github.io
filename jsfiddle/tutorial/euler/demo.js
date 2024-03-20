const {math, mi, mn, mo, mrow, msup} = van.tags("http://www.w3.org/1998/Math/MathML")

const Euler = () => math(
  msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"),
)

van.add(document.body, Euler())
