import Botkit from 'botkit'
import Message from '../schema/Message'
import User from '../schema/User'
import Team from '../schema/Team'
import getTeam from '../lib/getTeam'

const standuply = async () => {
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

  // let teams = [
  //   { name: "Mapmagic" },
  //   { name: "JobThai" },
  //   { name: "TN2017" }
  // ]

  const team = await getTeam()
  console.log(team[0].question[0].question);

  let mmg_qa = []
  team[0].question.forEach(e => {
    mmg_qa.push({ question: e.question, answer: '' })
  })
  console.log(mmg_qa);


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

  controller.on('rtm_open', async (bot, message) => {
    // user.map(async (each) => {
    //   await bot.api.im.open({user: each.userID}, (err, res) => {
    //     bot.api.chat.postMessage({channel: res.channel.id, as_user: true, text: 'สวัสดีจ้า ได้เวลามาส่ง Daily กันแล้ว เมื่อวานทำอะไรบ้าง?'})
    //   })
    // })
    await team.forEach(async (t) => {
      console.log(t);
      
      await t.member.forEach( async (m) => {
        if (m) {
          console.log(m);
          
          await bot.api.im.open({ user: m.userId  }, (err, res) => {
            bot.api.chat.postMessage({ channel: res.channel.id, as_user: true, text: mmg_qa[0].question })
          })
        }
      })
    })
    

    // User.find({}, (err, result) => {
    //   console.log(result);
    // })
  })


  controller.hears(
    [('.*')], ['direct_message', 'direct_mention', 'mention'],
    (bot, message) => {
      if (!first_qa) {
        first_qa = message.text
      }
      console.log(message);

      // user.map((each) => {
      //   if (message.user === each.userID && each.message.length < 3) {
      bot.startConversation(message, function (err, convo) {
        mmg_qa.forEach((q, i) => {
          if (i > 0) {
            convo.addQuestion(q.question, function (response, convo) {
              q.answer = response.text
              console.log()

              convo.next();
            }, {}, 'default')
          }
        })
        convo.on('end', function (convo) {
          bot.reply(message, 'ขอบคุณที่ส่ง Daily นะจ๊ะ อย่าลืมไปกรอก Timecard ใน my.thinknet.com ด้วยนะคะ')
        })
      })
      //       })

      //       convo.on('end', function (convo) {
      //         user.map((each) => {
      //           if (message.user === each.userID && each.message.length < 3) {
      //             if (convo.status === 'completed') {
      //               const doc = new Message({
      //                 user: each.username,

      //                 message: [
      //                   {
      //                     question: 'เมื่อวานทำอะไรบ้าง?',
      //                     answer: first_qa
      //                   },
      //                   {
      //                     question: qa[0].question,
      //                     answer: qa[0].answer
      //                   },
      //                   {
      //                     question: qa[1].question,
      //                     answer: qa[1].answer
      //                   }]
      //               })
      //               doc.save()
      //               each.message = [
      //                 {
      //                   question: 'เมื่อวานทำอะไรบ้าง?',
      //                   answer: first_qa
      //                 },
      //                 {
      //                   question: qa[0].question,
      //                   answer: qa[0].answer
      //                 },
      //                 {
      //                   question: qa[1].question,
      //                   answer: qa[1].answer
      //                 }
      //               ]
      //               bot.reply(message, 'ขอบคุณที่ส่ง Daily นะจ๊ะ อย่าลืมไปกรอก Timecard ใน my.thinknet.com ด้วยนะคะ')
      //               console.log(doc);
      //             }
      //           }
      //         })

      //       })
      //     })
      //   }
      // })

    }
  )
}

export default standuply
