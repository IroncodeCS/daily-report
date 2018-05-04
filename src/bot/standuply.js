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
    // bot.reply({
    //   type: 'message',
    //   user: 'U9B5AAHL5',
    //   channel: 'DAHFDJK7A'}, 'hello')
  })

let user = [
  { userID: 'U9B5AAHL5', message: [], countReply: 1 },
  { userID: 'U46BQPT17', message: [], countReply: 1 },
  { userID: 'U5M5CBHHT', message: [], countReply: 1 },
  { userID: 'U5U3AG39N', message: [], countReply: 1 },
  { userID: 'U5URS9RD3', message: [], countReply: 1 },
  { userID: 'U5VH733B8', message: [], countReply: 1 },
  { userID: 'U63037BNG', message: [], countReply: 1 },
  { userID: 'U6FN98N2V', message: [], countReply: 1 },
  { userID: 'U6Y4SH2MQ', message: [], countReply: 1 },
  { userID: 'U7CFXMT3P', message: [], countReply: 1 },
  { userID: 'U8CKPEFND', message: [], countReply: 1 },
  { userID: 'U9B5AAHL5', message: [], countReply: 1 },
  { userID: 'U9J9ABKS7', message: [], countReply: 1 },
  { userID: 'U9SPR8AKY', message: [], countReply: 1 },
  { userID: 'UAJBN6770', message: [], countReply: 1 },
]
let qa = [
  {
    question: 'เมื่อวานทำอะไรคะ?',
    answer: ''
  },
  {
    question: 'วันนี้จะทำอะไรบ้าง?',
    answer: ''
  },
  {
    question: 'ติดปัญหาอะไรมั้ย?',
    answer: ''
  }
]

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
    bot.startConversation(message, function(err,convo){
      qa.forEach(q => {
        convo.addQuestion(q.question, function(response,convo){
          convo.say('Cool, you said: ' + response.text)
          q.answer = response.text
          console.log(qa);

          convo.next();
        }, {}, 'default')

      });
    })
  }
)