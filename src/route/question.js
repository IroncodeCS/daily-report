import Team from '../schema/Team'

const getIndexIfObjWithAttr = function (array, attr, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}


const question = (server) => {
  server.post('/add-question', async (req, res) => {
    const { question, _id } = req.body
    const result = await Team.findOne({ _id }).exec()
    const questionNew = result.question
    var d = new Date()
    const idNew = d.getTime()
    const questionObj = {
      id: idNew,
      question
    }
    questionNew.push(questionObj)
    await Team.update({
      _id,
    }, { question: questionNew }).exec()
    const resultOnNewDate = await Team.findById(_id).exec()
    res.json({ resultOnNewDate })
  })

  server.post('/update-question', async (req, res) => {
    const { question_id, question, team_id } = req.body
    const result = await Team.findOne({ _id: team_id }).exec()
    const questionNew = result.question
    const index = getIndexIfObjWithAttr(questionNew, 'id', question_id)
    questionNew[index].question = question
    await Team.update({
      _id: team_id,
    }, { question: questionNew }).exec()
    const resultOnNewDate = await Team.findById(team_id).exec()
    res.json(resultOnNewDate)
  })

  server.post('/delete-question', async (req, res) => {
    const { question_id, team_id } = req.body
    const result = await Team.findOne({ _id: team_id }).exec()
    const questionNew = result.question
    const index = getIndexIfObjWithAttr(questionNew, 'id', question_id)
    questionNew.splice(index, 1)
    await Team.update({
      _id: team_id,
    }, { question: questionNew }).exec()
    const resultOnNewDate = await Team.findById(team_id).exec()
    res.json(resultOnNewDate)
  })
}

export default question