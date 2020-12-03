import {NextApiHandler} from 'next';
import {SignIn} from '../../../src/model/SignIn';

const Sessions: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')
  const {username, password} = req.body
  console.log('username', username)
  console.log('password', password)
  const signIn = new SignIn(username, password)
  await signIn.validate()
  if (signIn.hasError()) {
    res.statusCode = 422
    res.write(JSON.stringify(signIn.errors))
  } else {
    res.statusCode = 200
    res.write(JSON.stringify(signIn.user))
  }

  res.end()
}

export default Sessions
