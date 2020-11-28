import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {
  const manager = connection.manager
  const posts = await manager.find(Post)
  if (posts.length === 0) {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8,9].map(n => new Post(`我都第 ${n} 篇文章`, `这是我写得第 ${n} 篇文章，写得很好`) )
    await manager.save(data)
    console.log('数据填充成功')
  }
  await connection.close()
}).catch(error => console.log(error));
