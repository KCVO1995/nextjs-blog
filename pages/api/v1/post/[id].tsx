import {NextApiHandler} from 'next';
import {withSession} from '../../../../lib/withSession';
import getDatabaseConnection from '../../../../lib/getDatabaseConnection';
import {Post} from '../../../../src/entity/Post';

const Posts: NextApiHandler = async (req, res) => {
  const connection = await getDatabaseConnection()
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')
  if (req.method === 'DELETE') {
    const user = req.session.get('currentUser')
    if (!user) {
      res.status(401)
      res.end()
      return
    }
    const {id} = req.query
    await connection.manager.delete(Post, id)
    res.statusCode = 200
    res.write(JSON.stringify({
      message: 'ok'
    }))
    res.end()
  }
}

export default withSession(Posts)
