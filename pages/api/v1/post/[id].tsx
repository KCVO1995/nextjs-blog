import {NextApiHandler} from 'next';
import {withSession} from '../../../../lib/withSession';
import getDatabaseConnection from '../../../../lib/getDatabaseConnection';
import {Post} from '../../../../src/entity/Post';

const Posts: NextApiHandler = async (req, res) => {
  const connection = await getDatabaseConnection()
  res.setHeader('Content-Type', 'application/json; char-set=utf-8')
  const user = req.session.get('currentUser')
  if (!user) {
    res.status(401)
    res.end()
    return
  }
  if (req.method === 'DELETE') {
    const {id} = req.query
    await connection.manager.delete(Post, id)
    res.statusCode = 200
    res.write(JSON.stringify({
      message: 'ok'
    }))
    res.end()
  }
  if (req.method === 'PUT') {
    const {id} = req.query
    const {title, content} = req.body
    const post = await connection.manager.findOne(Post, id.toString())
    post.title = title
    post.content = content
    await connection.manager.save(Post, post)
    res.statusCode = 200
    res.write(JSON.stringify({
      id: post.id
    }))
    res.end()
  }
}

export default withSession(Posts)
