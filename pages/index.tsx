import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';

type Props = {
  posts: Post[]
}



const Index: NextPage <Props> = (props) => {
  const {posts} = props
  return (
    <div>
      <h2>文字列表</h2>
      {
        posts.map(post =>
          <Link key={post.id} href={'/posts/' + post.id}>
            <a>
              <li>{post.title}-创建于{new Date(post.createdAt).toDateString()}</li>
            </a>
          </Link>
        )
      }
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}
