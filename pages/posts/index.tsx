import {GetStaticProps, NextPage} from 'next';
import React from 'react';
import {getPosts} from '../../lib/posts';
import Link from 'next/link';

type Props = {
  posts: Post[]
}

const index: NextPage<Props> = (props) => {
  const posts = props.posts
  return (
    <div>
      <h2>文字列表</h2>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={'/posts/' + post.id}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default index

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {posts: JSON.parse(JSON.stringify(posts))} // will be passed to the page component as props
  }
}

