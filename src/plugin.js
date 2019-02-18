import CustomMessageListAvatar from './components/CustomMessageListAvatar'

kiwi.plugin('gravatar', function(kiwi) {
  kiwi.replaceModule('components/MessageListAvatar', CustomMessageListAvatar)

  const settings = kiwi.state.setting('gravatar')
  if (!settings.default) settings.default = 'mp'
  if (!settings.rating) settings.rating = 'g'

  kiwi.on('irc.wholist', function (event, net) {
    event.users.forEach((user) => {
      kiwi.state.addUser(net, {
        nick: user.nick,
        avatar: getAvatarURL(user.account)
      })
    })
  })

  kiwi.on('irc.account', function (event, net) {
    if (event.account) {
      kiwi.state.addUser(net, {
        nick: event.nick,
        account: event.account,
        avatar: getAvatarURL(event.account)
      })
    }
  })

  function getAvatarURL(account) {
    let url = `https://www.gravatar.com/avatar/?d=${settings.default}&r=${settings.rating}`
    if (account) {
      let req = new XMLHttpRequest()
      req.addEventListener('load', () => {
        md = JSON.parse(this.responseText)
        let avatar = md.avatar ? md.avatar : ''
        url = `https://www.gravatar.com/avatar/${avatar}?d=${settings.default}&r=${settings.rating}`
      })
      req.open('GET', `https://account.turtlechatrooms.com/api/metadata/${account}`)
      req.send()
    }
    return url
  }
})