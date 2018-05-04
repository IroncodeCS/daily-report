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

let user = [{ userID: 'U9B5AAHL5', message: [], countReply: 1 }]
controller.hears(
  [('.*')], ['direct_message', 'direct_mention', 'mention'],
  (bot, message) => {
    console.log(message);
    if (message.user === user[0].userID) {
      switch (user[0].countReply) {
        case 1:
          bot.reply(message, 'วันนี้จะทำอะไรบ้าง?')
          count++
          break;

        case 2:
          bot.reply(message, 'งานที่ทำอยู่ติดปัญหาอะไรบ้าง?' )
          count++
          break;

        default:
          break;
      }

    }
  }
)