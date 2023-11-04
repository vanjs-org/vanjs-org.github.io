const {a, b, button, div, h1, li, p, span, ul} = van.tags

const Game = () => {
  const time = van.state(60), score = van.state(0), inGame = van.state(false), items = vanX.reactive([])
  const fps = 60, height = 400, frameFns = Array(fps * time.val).fill().map(() => [])
  let curFrame = 0

  const Item = ({val: v}, deleter) => {
    const x = Math.floor(Math.random() * (document.body.clientWidth - 42)), y = van.state(0)
    let deleted = false
    v.removing = false
    van.derive(() => v.removing && nextFrames(0.3 * fps).then(() => (deleted = true, deleter())))
    ;(async () => {
      do { await nextFrames(1) } while (!deleted && (y.val += v.speed) <= height)
      if (!v.removing) deleter()
    })()
    return span({
      class: "item",
      style: () => `left: ${x}px; bottom: ${y.val}px; opacity: ${v.removing ? 0 : 1};`,
      onclick: () => inGame.val && !v.removing &&
        frameFns[curFrame].push(() => (v.removing = v.msg, v.action())),
    }, v.icon, () => v.removing ? span({class: "msg " + (v.bad ? "bad": "good")}, v.removing) : "")
  }

  const itemTypes = [
    {icon: "👍", speed: 5, secs: 1, msg: "+1", action: () => ++score.val},
    {icon: "🚀", speed: 10, secs: 5, msg: "+10", action: () => score.val += 10},
    {icon: "👎", speed: 3, secs: 1, msg: "-5", bad: true, action: () => score.val -= 5},
    {icon: "🐌", speed: 5, secs: 10, msg: "Slowed", action: () => items.forEach(it => it.speed /= 2)},
    {icon: "💣", speed: 3, secs: 1, msg: "BOOM!", bad: true, action: () =>
      items.forEach(it => it.removing = "BOOM!")},
  ]

  const begin = () => {
    setInterval(() => {
      if (!inGame.val) return
      for (const fn of frameFns[curFrame]) fn()
      ++curFrame % 60 === 0 && --time.val
      curFrame === frameFns.length && end()
    }, 1000 / fps)
    inGame.val = true
    itemTypes.forEach(async type => {
      while (1) {
        await nextFrames(Math.floor(Math.random() * fps * type.secs * 2) + 1)
        items.push({...type})
      }
    })
  }
  const end = () => (alert("Your score: " + score.val), location.reload())
  const nextFrames = n => new Promise(r => frameFns[curFrame + n]?.push(r))

  return div({class: "root"},
    span({class: "time"}, "Time: ", time), span({class: "score"}, "Score: ", score),
    vanX.list(() => div({class: "board"}), items, Item),
    div({class: "panel"},
      button({onclick: () => curFrame ? inGame.val = !inGame.val : begin()},
        () => inGame.val ? "Pause" : "Start",
      ),
    ),
  )
}

van.add(document.body,
  h1("Emoji Pops"),
  p(b("Game rules: "), "Click emojis to pop:"),
  ul(
    li("👍: ", span({class: "good"}, "+1"), ". Score +1."),
    li("🚀: ", span({class: "good"}, "+10"), ". Score +10."),
    li("👎: ", span({class: "bad"}, "-5"), ". Score -5."),
    li("🐌: ", span({class: "good"}, "Slowed"), ". Slow all emojis on the board."),
    li("💣: ", span({class: "bad"}, "BOOM!"), ". All emojis disappear."),
  ),
  Game(),
  div({class: "footer"}, "Powered by ", a({href: "https://vanjs.org/"}, b("VanJS")), " and ", a({href: "https://vanjs.org/x"}, b("VanX"))),
)
