import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';

type Props = {
  posts: Post[]
  count: number
  page: number
}

const PostsIndex: NextPage <Props> = (props) => {
  const {posts, count, page} = props
  return (
    <div>
      <h2>文字列表 {count}</h2>
      {
        posts.map(post =>
          <Link key={post.id} href={'/posts/' + post.id}>
            <a>
              <li>{post.title}------创建于{new Date(post.createdAt).toDateString()}</li>
            </a>
          </Link>
        )
      }
      <footer>
        <span>第 {page} 页，</span>
        <span>总 {count} 篇</span>
        <div>
          <Link href={'?page=' + (page - 1)}><a>上一页</a></Link>
          /
          <Link href={'?page=' + (page + 1)}><a>下一页</a></Link>
        </div>
      </footer>
    </div>
  )
}

export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const page = context.query.page && parseInt(context.query.page.toString()) || 1
  console.log(page, 'page')
  const pageSize = context.query.pageSize && parseInt(context.query.pageSize.toString()) || 2
  const [posts, count] = await connection.manager.findAndCount('Post', {skip: (page - 1) * pageSize, take: pageSize})
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      page
    }
  }
}
