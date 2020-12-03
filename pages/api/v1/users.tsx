import {NextApiHandler} from 'next';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const connection = await getDatabaseConnection()
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')
  const user = new User(username.trim(), password)
  user.passwordConfirmation = passwordConfirmation
  user.connection = connection
  await user.validate()

  if (user.hasError()) {
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  } else {
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}

export default Users
