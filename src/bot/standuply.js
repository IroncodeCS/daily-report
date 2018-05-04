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
    { userID: 'U9B5AAHL5', message: [], username: 'Narongchai Khamchuen (Opal)' },
    { userID: 'U46BQPT17', message: [], username: 'Naruepat Payachai (Set)' },
    { userID: 'U5M5CBHHT', message: [], username: 'Patcharapon Wangtiyong (Wiw)' },
    { userID: 'U5U3AG39N', message: [], username: 'Poobet Jaiklam (Boot)' },
    { userID: 'U5URS9RD3', message: [], username: 'Sarayut Khamkhiao (Nai)' },
    { userID: 'U5VH733B8', message: [], username: 'Banyawat Kaewsamer (Tew)' },
    { userID: 'U63037BNG', message: [], username: 'Watchapon Junopat (Joe)' },
    { userID: 'U6FN98N2V', message: [], username: 'Suttiluk Boonruang (Ped)' },
    { userID: 'U6Y4SH2MQ', message: [], username: 'Kamolpop Kuadsantia (Ice)' },
    { userID: 'U7CFXMT3P', message: [], username: 'Chonlatit Inkaew (Karn)' },
    { userID: 'U8CKPEFND', message: [], username: 'Jirapon Tewin (Fai)' },
    { userID: 'U9R936664', message: [], username: 'Chaowakrit' },
    { userID: 'U9J9ABKS7', message: [], username: 'Chayangkoon Dokhom(Byte)' },
    { userID: 'U9SPR8AKY', message: [], username: 'Tapanee Maneetorn (Amp)' },
    { userID: 'UAJBN6770', message: [], username: 'Phatchareeporn Chanaphim (Biw)' },
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
  
  
    user.map(async (each) => {
      await bot.api.im.open({user: each.userID}, (err, res) => {
        bot.api.chat.postMessage({channel: res.channel.id, as_user: true, text: 'สวัสดีจ้า ได้เวลามาส่ง Daily กันแล้ว เมื่อวานทำอะไรบ้าง?'})
      })
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
                q.answer = response.text
                console.log(qa)
      
                convo.next();
              }, {}, 'default')
            })
      
            convo.on('end', function (convo) {
              user.map((each) => {
                if (message.user === each.userID && each.message.length < 3){
                  if(convo.status === 'completed') {
                    const doc = new Message({
                      user: each.username,
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
                    each.message = [
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
                      }
                    ]
                    bot.reply(message, 'ขอบคุณที่ส่ง Daily นะจ๊ะ')
                    console.log(doc);
                }
                }
              })
              
          })
          })
        }
      })
      
    }
  )
}

export default standuply
