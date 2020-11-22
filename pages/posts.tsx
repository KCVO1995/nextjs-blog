import {GetStaticProps, NextPage} from 'next';
import React from 'react';
import {getPosts} from '../lib/posts';

type Props = {
  posts: Post[]
}

const posts: NextPage<Props> = (props) => {
  const posts = props.posts
  return (
    <div>
      <h2>文字列表</h2>
      {posts.map(post => (<div key={post.id}>{post.title}</div>))}
    </div>
  )
}

export default posts

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {posts: JSON.parse(JSON.stringify(posts))} // will be passed to the page component as props
  }
}

