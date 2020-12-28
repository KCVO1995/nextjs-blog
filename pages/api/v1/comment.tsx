import {NextApiHandler} from 'next';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';
import {Post} from '../../../src/entity/Post';
import {Comment} from '../../../src/entity/Comment';
import {withSession} from '../../../lib/withSession';

const CommentApi: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json; char-set=utf-8')
    const {comment: commentText, postId} = req.body
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne(Post, postId)
    const user = req.session.get('currentUser')
    if (!user) { // 是否登录
      res.status(401)
      res.end()
      return
    }
    if (!post) { // 文章是否存在
      res.statusCode = 400
      res.write(JSON.stringify({
        errors: ['文章不存在']
      }))
      res.end()
    }
    if (!commentText) {
      res.statusCode = 400
      res.write(JSON.stringify({
        errors: ['文章内容不能为空']
      }))
      res.end()
    }
    const comment = new Comment(commentText, user, post)
    await connection.manager.save(comment)
    res.statusCode = 200
    res.write(JSON.stringify(comment))
    res.end()
  }
}

export default withSession(CommentApi)
