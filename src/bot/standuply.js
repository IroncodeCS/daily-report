import Botkit from 'botkit'

var controller = Botkit.slackbot({ debug: false })
controller
  .spawn({
    token: 'xoxb-358220335298-yAFWYRh4DsGJIoo7w5MiLhDi'
  })
  .startRTM(function (err) {
    if (err) {
      throw new Error(err)
    }
  })

let user = [{ userID: 'U9B5AAHL5', message: [], countReply: 0 }]
controller.hears(
  [('.*')], ['direct_message', 'direct_mention', 'mention'],
  (bot, message) => {
    console.log(message);
    if (message.user === user[0].userID) {
      switch (user[0].countReply) {
        case value:
          
          break;
      
        default:
          break;
      }
      bot.reply(message, '' + user[0].countReply)
      count++
    }
  }
)