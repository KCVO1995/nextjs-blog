import {NextApiHandler} from 'next';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const connection = await getDatabaseConnection()
  res.setHeader('Content-Type', 'application/json')
  const user = new User(username.trim(), md5(password))
  user.password = password
  user.passwordConfirmation = passwordConfirmation
  user.connection = connection
  await user.validate()

  if (user.hasError()) {
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  } else {
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify({username, status: 'done'}))
  }
  res.end()
}

export default Users
