import CustomMessageListAvatar from './components/CustomMessageListAvatar.vue'
import CustomStateBrowser from './components/CustomStateBrowser.vue'

kiwi.plugin('gravatar', function(kiwi) {
  kiwi.replaceModule('components/MessageListAvatar', CustomMessageListAvatar)
  kiwi.replaceModule('components/StateBrowser', CustomStateBrowser)

  const settings = kiwi.state.setting('gravatar')
  if (!settings.default) settings.default = 'mp'
  if (!settings.rating) settings.rating = 'g'

  kiwi.on('irc.wholist', function (event, net) {
    event.users.forEach((user) => {
      getAvatarURL(user.account, (url) => {
        kiwi.state.addUser(net, {
          nick: user.nick,
          avatar: url
        })
      })
    })
  })

  kiwi.on('irc.account', function (event, net) {
    getAvatarURL(event.account, (url) => {
      kiwi.state.addUser(net, {
        nick: event.nick,
        account: event.account,
        avatar: url
      })
    })
  })

  function getAvatarURL(account, cb) {
    if (account) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        let md = JSON.parse(xhr.responseText)
        let avatar = md.avatar ? md.avatar : ''
        cb(`https://www.gravatar.com/avatar/${avatar}?d=${settings.default}&r=${settings.rating}`)
      })
      xhr.open('GET', `https://account.turtlechatrooms.com/api/metadata/${account}`)
      xhr.send()
    } else {
      cb(`https://www.gravatar.com/avatar/?d=${settings.default}&r=${settings.rating}`)
    }
  }
})