import User from '../schema/User'

const getUser = async () => {
  const users = await User.find().exec()
  return users
}

export default getUser