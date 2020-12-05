import {NextApiHandler} from 'next';
import {SignIn} from '../../../src/model/SignIn';
import {withSession} from '../../../lib/withSession';

const Sessions: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')
  const {username, password} = req.body
  const session =  req.session
  const signIn = new SignIn(username, password)
  await signIn.validate()
  if (signIn.hasError()) {
    res.statusCode = 422
    res.write(JSON.stringify(signIn.errors))
  } else {
    session.set('currentUser', signIn.user)
    await session.save()
    res.statusCode = 200
    res.write(JSON.stringify(signIn.user))
  }

  res.end()
}

export default withSession(Sessions)
