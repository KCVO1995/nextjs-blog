import {NextPage} from 'next';
import React from 'react';
import {usePosts} from '../hooks/usePosts';

const posts: NextPage = () => {
  const {isLoading, isEmpty, posts} = usePosts()
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
