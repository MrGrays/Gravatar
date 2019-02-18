import CustomMessageListAvatar from './components/CustomMessageListAvatar'
import * as request from 'request'

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
    if (account) {
      request.get(`https://account.turtlechatrooms.com/api/metadata/${account}`, (e, r, b) => {
        b = JSON.parse(b)
        let avatar = b.avatar ? b.avatar : ''
        return `https://www.gravatar.com/avatar/${avatar}?d=${settings.default}&r=${settings.rating}`
      })
    } else {
      return `https://www.gravatar.com/avatar/?d=${settings.default}&r=${settings.rating}`
    }
  }
})