import {NextApiHandler} from 'next';
import {getPosts, getPost} from '../../../lib/posts';


const Posts: NextApiHandler = async (req, res) => {
  const files = await getPosts()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(files))
  res.end()
}

export const Post: NextApiHandler = async (req, res) => {
  const file = await getPost(req.query.id.toString())
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(file))
  res.end()
}

export default Posts
