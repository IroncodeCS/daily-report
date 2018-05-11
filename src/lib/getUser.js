import User from '../schema/User'

const getUser = async (team_id) => {
  const users = await User.find().exec()
  return users
}

export default getUser