import Botkit from 'botkit'
import Message from '../schema/Message'

const standuply = () => {
const controller = Botkit.slackbot({ debug: false })
  controller
    .spawn({
      token: 'xoxb-358220335298-oI6NrchdfMrF1MjcEiP50V8S'
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
  let first_qa
  let qa = [
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
  
  
    bot.api.chat.postMessage({channel: 'DAHVC0PKN', as_user: true, reply_broadcast: true, text: 'สวัสดีค่ะ ได้เวลามาส่ง Daily กันแล้ว เมื่อวานทำอะไรไปบ้าง?'}, (err, res) => {
      console.log(res)
      
    })
  })
  
  
  controller.hears(
    [('.*')], ['direct_message', 'direct_mention', 'mention'],
    (bot, message) => {
      if(!first_qa) {
        first_qa = message.text
      }
      user.map((each) => {
        if (message.user === each.userID && each.message.length < 3) {
          bot.startConversation(message, function(err,convo){
            qa.forEach(q => {
              convo.addQuestion(q.question, function(response,convo){
                convo.say('Cool, you said: ' + response.text)
                q.answer = response.text
                console.log(qa)
      
                convo.next();
              }, {}, 'default')
            })
      
            convo.on('end', function (convo) {
              if(convo.status === 'completed') {
                  const doc = new Message({
                    user: message.user,
                    message: [
                      {
                      question: 'เมื่อวานทำอะไรบ้าง?',
                      answer: first_qa
                    },
                    {
                      question: qa[0].question,
                      answer: qa[0].answer
                    },
                    {
                      question: qa[1].question,
                      answer: qa[1].answer
                    }]
                  })
                  doc.save()
      
                  console.log(doc);
              }
          });
          })
        }
      })
      
    }
  )
}

export default standuply
