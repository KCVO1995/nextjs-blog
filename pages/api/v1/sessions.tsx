import {NextApiHandler} from 'next';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Sessions: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')

  const {username, password} = req.body
  console.log('username', username)
  console.log('password', password)
  const errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]}
  const connection = await getDatabaseConnection()
  const user = await connection.manager.findOne(User, { username })

  if (user) {
    const passwordDigest = md5(password)
    if (user.passwordDigest === passwordDigest) {
      res.statusCode = 200
      res.write(JSON.stringify(user))
    } else {
      res.statusCode = 422
      errors.password.push('用户名或密码不匹配')
      res.write(JSON.stringify(errors))
    }
  } else {
    res.statusCode = 422
    errors.username.push('用户名不存在')
    res.write(JSON.stringify(errors))
  }

  res.end()
}

export default Sessions
