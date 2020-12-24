import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useEffect} from 'react';
import {UAParser} from 'ua-parser-js';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {Post} from '../src/entity/Post';
import SwitchUser from '../components/switchUser'
import getDatabaseConnection from '../lib/getDatabaseConnection';
import {usePager} from '../hooks/usePager';
import {useRouter} from 'next/router';
import Link from 'next/link';

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
  const formatTime = (date: Date) => {
    let y = date.getFullYear().toString()
    let m = (date.getMonth() + 1).toString()
    let d = date.getDay().toString()
    let h = date.getHours().toString()
    let min = date.getMinutes().toString()
    let s = date.getSeconds().toString()
    m = m.length === 1 ? '0' + m : m
    d = d.length === 1 ? '0' + d : d
    h = h.length === 1 ? '0' + h : h
    min = min.length === 1 ? '0' + min : min
    s = s.length === 1 ? '0' + s : s
    return `${y}-${m}-${d} ${h}:${min}:${s}`
  }
  return (
    <>
      <div className="global">
        <SwitchUser username={user.username}/>
        <header>
          <div className='container'>
            <h1>Welcome {user.username}</h1>
            <nav><Link href={'/posts/new'}><a>新增文章</a></Link></nav>
          </div>
        </header>
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

        @keyframes goHeight {
          from {
            height: 50px;
          }
          to {
            height: 120px;
          }
        }

        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .global header {
          z-index: 100;
          position: relative;
          margin: auto 0;
          padding-top: 130px;
          height: 250px;
        }

        .global header .container {
          will-change: height;
          animation: goHeight 600ms forwards;
          border-radius: 8px;
          margin: 0 auto;
          background: #399c9c;
          padding: 0 50px;
          color: white;
          max-width: 768px;
          width: 768px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif, 'hei';
        }

        .global header .container nav,
        .global header .container h1 {
          opacity: 0;
          animation: show 700ms 600ms forwards;
          font-weight: normal;
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
          @keyframes goHeight {
            from {
              height: 50px;
            }
            to {
              height: 100px;
            }
          }
          .global header {
            padding-top: 50px;
            height: 150px;
          }

          .global header .container {
            width: 90vw;
            height: 100px;
            justify-content: center;
            flex-direction: column;
          }

          .global header .container h1 {
            font-size: 28px;
            margin: 10px;
          }

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

