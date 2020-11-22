import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import axios from 'axios'

type Post = {
  id: string,
  title: string,
  date: string
}


const posts: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    axios.get('/api/v1/posts').then(res => {
      if (res.data.length === 0) setIsEmpty(true)
      setPosts(res.data)
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h2>文字列表</h2>
      {
        isLoading ? (<div>加载中...</div>) :
          isEmpty ? (<div>暂无数据</div>) :
            posts.map(post => {
              return (<div key={post.id}>{post.title}</div>)
            })
      }
    </div>
  )
}

export default posts
