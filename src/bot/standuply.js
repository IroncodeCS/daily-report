import Botkit from 'botkit'
import Message from '../schema/Message'
import User from '../schema/User'
import Team from '../schema/Team'

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
    })
  
  let user = [
    { userID: 'U9B5AAHL5', message: [], username: 'Narongchai Khamchuen (Opal)', team: ['MapMagic'] },
    { userID: 'U46BQPT17', message: [], username: 'Naruepat Payachai (Set)', team: ['JobThai','TN2017'] },
    { userID: 'U5M5CBHHT', message: [], username: 'Patcharapon Wangtiyong (Wiw)', team: ['JobThai'] },
    { userID: 'U5U3AG39N', message: [], username: 'Poobet Jaiklam (Boot)', team: ['JobThai'] },
    { userID: 'U5URS9RD3', message: [], username: 'Sarayut Khamkhiao (Nai)', team: ['MapMagic'] },
    { userID: 'U5VH733B8', message: [], username: 'Banyawat Kaewsamer (Tew)', team: ['MapMagic'] },
    { userID: 'U63037BNG', message: [], username: 'Watchapon Junopat (Joe)', team: ['JobThai'] },
    { userID: 'U6FN98N2V', message: [], username: 'Suttiluk Boonruang (Ped)', team: ['TN2017'] },
    { userID: 'U6Y4SH2MQ', message: [], username: 'Kamolpop Kuadsantia (Ice)', team: ['MapMagic'] },
    { userID: 'U7CFXMT3P', message: [], username: 'Chonlatit Inkaew (Karn)', team: ['MapMagic'] },
    { userID: 'U8CKPEFND', message: [], username: 'Jirapon Tewin (Fai)', team: ['MapMagic'] },
    { userID: 'U9R936664', message: [], username: 'Chaowakrit', team: ['MapMagic'] },
    { userID: 'U9J9ABKS7', message: [], username: 'Chayangkoon Dokhom(Byte)', team: ['MapMagic'] },
    { userID: 'U9SPR8AKY', message: [], username: 'Tapanee Maneetorn (Amp)', team: ['JobThai'] },
    { userID: 'UAJBN6770', message: [], username: 'Phatchareeporn Chanaphim (Biw)', team: ['TN2017'] },
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
    // user.map(async (each) => {
    //   await bot.api.im.open({user: each.userID}, (err, res) => {
    //     bot.api.chat.postMessage({channel: res.channel.id, as_user: true, text: 'สวัสดีจ้า ได้เวลามาส่ง Daily กันแล้ว เมื่อวานทำอะไรบ้าง?'})
    //   })
    // })
    
    bot.api.chat.postMessage({channel: "U9B5AAHL5", as_user: true, text: 'สวัสดีจ้า ได้เวลามาส่ง Daily กันแล้ว เมื่อวานทำอะไรบ้าง?'})
    user.forEach(e => {
      new User({
        userId: e.userID,
        user: e.username,
      }).save()
    })
    
    // User.find({}, (err, result) => {
    //   console.log(result);
    // })
  })
  
  
  controller.hears(
    [('.*')], ['direct_message', 'direct_mention', 'mention'],
    (bot, message) => {
      if(!first_qa) {
        first_qa = message.text
      }
      console.log(message);
      
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
                    bot.reply(message, 'ขอบคุณที่ส่ง Daily นะจ๊ะ อย่าลืมไปกรอก Timecard ใน my.thinknet.com ด้วยนะคะ')
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
