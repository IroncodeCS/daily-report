import Botkit from 'botkit'

var controller = Botkit.slackbot({ debug: false })
controller
  .spawn({
    token: 'xoxb-358220335298-yAFWYRh4DsGJIoo7w5MiLhDi'
  })
  .startRTM((err, bot) => {
    if (err) {
      throw new Error(err)
    }
    bot.reply({
      type: 'message',
      user: 'U9B5AAHL5',
      channel: 'DAHFDJK7A'}, 'hello')
  })

let user = [{ userID: 'U9B5AAHL5', message: [], countReply: 1 }]

controller.on('rtm_open', (bot, message) => {
  // console.log('eieiei');
  // bot.reply({
  //   type: 'message',
  //   user: 'U9B5AAHL5',
  //   channel: 'DAHFDJK7A'}, 'hello')
  // // bot.reply(message, 'test')
  bot.api.chat.postMessage({channel: 'DAHFDJK7A', as_user: true, reply_broadcast: true, text: '666'}, (err, res) => {
    console.log(res);
    
  })
})


controller.hears(
  [('.*')], ['direct_message', 'direct_mention', 'mention'],
  (bot, message) => {
    console.log(message);
    if (message.user === user[0].userID) {
      switch (user[0].countReply) {
        case 1:
          bot.reply(message, 'วันนี้จะทำอะไรบ้าง?')
          user[0].countReply++
          break;

        case 2:
          bot.reply(message, 'งานที่ทำอยู่ติดปัญหาอะไรบ้าง?')
          user[0].countReply++
          break;

        default:
          break;
      }

    }
  }
)