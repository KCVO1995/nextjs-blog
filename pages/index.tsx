import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {Post} from '../src/entity/Post';
import SwitchUser from '../components/switchUser'
import getDatabaseConnection from '../lib/getDatabaseConnection';
import {usePager} from '../hooks/usePager';
import {useRouter} from 'next/router';
import Header from '../components/Header';
import formatTime from '../lib/formatTime';

type Props = {
  user: User
  posts: Post[]
  count: number
  page: number
  totalPage: number
  pathname: string
}

const Index: NextPage<Props> = (props) => {
  const {posts, page, totalPage, pathname, user} = props
  const {pager} = usePager({page, totalPage, pathname})
  const router = useRouter()
  return (
    <>
      <div className="global">
        <SwitchUser username={user.username}/>
        <Header navs={[{text: '新增文章', path: '/posts/new'}]} username={user.username}/>
        <main className='list'>
          { // TODO 列表是反向的
            posts.map(post =>
              <article key={post.id} onClick={() => router.push(`/posts/${post.id}`)} className='item'>
                <div className='content'>
                  <span>{formatTime(new Date(post.createdAt))}</span>
                  <h1>{post.title}</h1>
                </div>
              </article>
            )
          }
        </main>
        <footer>{pager}</footer>
      </div>
      <style jsx>{`
        .global {
          min-height: 100vh;
          width: 100%;
        }

        .global main {
          position: relative;
          z-index: 100;
          width: 768px;
          margin: 0 auto;
        }

        .global main article {
          cursor: pointer;
          height: 120px;
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px 50px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .global main article:last-child {
          margin-bottom: 30px;
        }

        .global main article:hover {
          box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
        }

        .global main article .content {
          width: 100%;
        }

        .global main article .content span {
          color: #ccc;
          font-size: 14px
        }

        .global main article .content h1 {
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
        }

        .global footer {
          position: relative;
          margin-bottom: 30px;
          z-index: 100;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 500px) {
          .global main {
            width: 90vw;
          }

          .global main article {
            height: 100px;
            margin-top: 20px;
            padding: 20px 30px;
          }

          .global main article h1 {
            font-size: 22px
          }

          .global main article span {
            font-size: 12px
          }
        }
      `}</style>
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  const connection = await getDatabaseConnection()
  const page = context.query.page && parseInt(context.query.page.toString()) || 1
  const pageSize = context.query.pageSize && parseInt(context.query.pageSize.toString()) || 5
  const [posts, count] = await connection.manager.findAndCount('Post', {skip: (page - 1) * pageSize, take: pageSize})
  const url = context.resolvedUrl
  const index = url.indexOf('?')
  const pathname = index < 0 ? url : url.substr(0, index)
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || {})),
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(count / pageSize),
      pathname,
      count,
      page,
    }
  }
})

