import Team from '../schema/Team'

const getTeams = async () => {
  const teams = await Team.find().exec()
  return teams
}

export default getTeams