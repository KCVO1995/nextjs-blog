import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import {usePager} from '../../hooks/usePager';

type Props = {
  posts: Post[]
  pathname: string
  count: number
  page: number
  totalPage: number
}

const PostsIndex: NextPage <Props> = (props) => {
  const {posts, count, page, totalPage, pathname} = props
  const {pager} = usePager({page, totalPage, pathname})
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
        {pager}
      </footer>
    </div>
  )
}

export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const page = context.query.page && parseInt(context.query.page.toString()) || 1
  const pageSize = context.query.pageSize && parseInt(context.query.pageSize.toString()) || 1
  const [posts, count] = await connection.manager.findAndCount('Post', {skip: (page - 1) * pageSize, take: pageSize})
  const url = context.resolvedUrl
  const index = url.indexOf('?')
  const pathname = index < 0  ? url : url.substr(0, index)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      pathname,
      count,
      page,
      totalPage: Math.ceil(count / pageSize)
    }
  }
}
