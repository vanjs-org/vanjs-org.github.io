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
