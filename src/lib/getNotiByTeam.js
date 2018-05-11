import Team from '../schema/Team'

const getTeams = async (teamId) => {
  const teams = await Team.find({'_id': teamId}).exec()
  return teams[0]
}

export default getTeams