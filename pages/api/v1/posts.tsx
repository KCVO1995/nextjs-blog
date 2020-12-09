import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {withSession} from '../../../lib/withSession';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';


const Posts: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body
    const user = req.session.get('currentUser')
    if (!user) {
      res.status(401)
      res.end()
      return
    }
    const post = new Post(title, content, user)
    const connection = await getDatabaseConnection()
    await connection.manager.save(post)
    res.json(post)
  }
}

export default withSession(Posts)
