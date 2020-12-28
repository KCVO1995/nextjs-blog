import React, {useState} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import {Comment} from '../../src/entity/Comment';
import Header from '../../components/Header';
import formatTime from '../../lib/formatTime';
import marked from 'marked';
import axios from 'axios';
import {useRouter} from 'next/router';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';
import SwitchUser from '../../components/switchUser';
import Head from 'next/head';

type Props = {
  post: Post
  user: User
  comments: Comment[]
}

const post: NextPage<Props> = props => {
  const {user, comments} = props
  const {title, updatedAt, content, id} = props.post
  const [commentText, setCommentText] = useState('')
  const router = useRouter()

  const editPost = (id: number) => {
    router.push(`/posts/new?id=${id}`).then()
  }

  const deletePost = (id: number) => {
    if (confirm('是否要删除此文章')) {
      axios.delete(`/api/v1/post/${id}`).then(() => {
        alert('删除成功')
        router.push('/').then()
      }, () => {
        console.log('删除失败')
      })
    }
  }
  const postComment = () => {
    axios.post(`/api/v1/comment`, {postId: id, comment: commentText}).then(res => {
      console.log(res)
    }, () => {
      console.log('删除失败')
    })
  }
  return (
    <>
      <Head><title>文章详情页</title></Head>
      <div className='page'>
        <SwitchUser username={user.username}/>
        <Header title='文章详情' navs={[{text: '目录', path: '/'}]}/>
        <article>
          <div className='time'>
            <time>{formatTime(new Date(updatedAt))}</time>
            <div className='action'>
              <svg onClick={editPost.bind(null, id)} className='icon' aria-hidden='true'>
                <use xlinkHref='#icon-edit'/>
              </svg>
              <svg onClick={deletePost.bind(null, id)} className='icon' aria-hidden='true'>
                <use xlinkHref='#icon-delete'/>
              </svg>
            </div>
          </div>
          <h1>{title}</h1>
          <div className='markdown-body' dangerouslySetInnerHTML={{__html: marked(content)}}/>
        </article>
        <div className='comment-container'>
          <textarea value={commentText} onChange={e => setCommentText(e.target.value)}/>
          <button onClick={postComment}>提交</button>
          <ul>
            {
              comments.map(comment => <li key={comment.id}>{comment.content}</li> )
            }
          </ul>
        </div>
      </div>
      <style jsx>{`
        .page {
          width: 100%;
          min-height: 100vh;
          z-index: 100;
        }

        article {
          border: 1px solid #ddd;
          position: relative;
          border-radius: 5px;
          background: #fff;
          padding: 50px;
          z-index: 100;
          width: 768px;
          margin: 30px auto;
        }

        article {
          box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
        }

        article .time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        article .time time {
          color: #ccc;
        }

        article .time svg {
          cursor: pointer;
          width: 20px;
          height: 20px;
          margin-left: 10px;
        }

        article h1 {
          color: #1e1e1e;
          margin-bottom: 30px;
        }

        .comment-container {
          position: relative;
          z-index: 200;
        }

        @media (max-width: 500px) {
          article {
            width: 90vw;
            margin: 20px auto;
            padding: 20px;
          }

        }
      `}</style>
    </>
  )
}

export default post
// TODO 自己改自己的博客

// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id.toString())
  const comments = await connection.manager.find(Comment, {post})
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      comments: JSON.parse(JSON.stringify(comments)),
      user
    }
  }
})
