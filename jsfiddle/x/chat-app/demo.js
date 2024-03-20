const {div, li, span, ul} = van.tags

const serverState = {
  friends: [
    {name: "Aria Smith", online: true},
    {name: "Evelyn Parker", online: true},
    {name: "Liam Johnson", online: true},
    {name: "Mateo Brown", online: true},
    {name: "Ethan Wilson", online: false},
    {name: "Jackson Garcia", online: false},
    {name: "Lucas Anderson", online: false},
    {name: "Mia Thomas", online: false},
    {name: "Nora Martinez", online: false},
    {name: "Zoe Davis", online: false},
  ],
  messages: [],
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function* serverStateUpdates() {
  yield serverState
  while (true) {
    await sleep(2000)
    const friend = serverState.friends[Math.floor(Math.random() * serverState.friends.length)]
    friend.online = !friend.online
    serverState.friends.sort((a, b) => a.online !== b.online ?
      (a.online ? -1 : 1) :
      a.name.localeCompare(b.name))
    serverState.messages.push(`${friend.name} has gone ${friend.online ? "online" : "offline"}`)
    if (serverState.messages.length > 5) serverState.messages.shift()
    yield serverState
  }
}


const ChatApp = () => {
  const appState = vanX.reactive({friends: [], messages: []})
  ;(async () => {for await (const state of serverStateUpdates()) vanX.replace(appState, state)})()

  return div({class: "container"},
    div({class: "friend-list"},
      vanX.list(ul, appState.friends, ({val: v}) => li(
        span({class: () => ["status-indicator", v.online ? "online" : "offline"].join(" ")}), " ",
        () => v.name,
      )),
    ),
    vanX.list(div({class: "chat-messages"}), appState.messages, s => div({class: "message"}, s)),
  )
}

van.add(document.body, ChatApp())
