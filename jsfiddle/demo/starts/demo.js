const {a, div, li, p, ul} = van.tags

const Stars = async repo => {
  const repoJson = await fetch(`https://api.github.com/repos/${repo}`).then(r => r.json())
  const pageNum = Math.floor((repoJson.stargazers_count - 1) / 100) + 1
  const starsJson = await fetch(
    `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${pageNum}`)
    .then(r => r.json())
  return div(
    p(repoJson.stargazers_count, " ⭐️:"),
    ul(
      starsJson.reverse().map(u => li(a({href: u.html_url}, u.login))),
    ),
  )
}

(async () => van.add(document.body, await Stars("vanjs-org/van")))()
