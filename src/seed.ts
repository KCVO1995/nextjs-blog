import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {User} from './entity/User';
import {Post} from './entity/Post';
import {Comment} from './entity/Comment';

createConnection().then(async connection => {
  const manager = connection.manager
  const users = await manager.find(User)
  const posts = await manager.find(Post)
  const comments = await manager.find(Comment)
  if (users.length === 0 && posts.length === 0 && comments.length === 0) {
    const user = new User('Jacky', '123456')
    await manager.save([user])
    const post = new Post('第一篇文章', '这是写得最好的文章', user)
    await manager.save([post])
    const comment = new Comment('第一个评论', user, post)
    await manager.save([comment])
  }
  await connection.close()
}).catch(error => console.log(error));
