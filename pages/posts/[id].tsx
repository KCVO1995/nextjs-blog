import React, {useEffect, useState} from 'react';
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
  const {user, comments: propComments} = props
  const {title, updatedAt, content, id} = props.post
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const router = useRouter()

  useEffect(() => {
    setComments(propComments)
  }, [])

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
    setCommentText('')
    axios.post(`/api/v1/comment`, {postId: id, comment: commentText}).then(res => {
      const array = [...comments]
      array.unshift(res.data)
      setComments(array)
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
          <textarea placeholder={'请留下你的评论'} value={commentText} onChange={e => setCommentText(e.target.value)}/>
          <button onClick={postComment}>提交</button>
          <ul className='comment-list'>
            {
              comments.map(comment => <li className='comment' key={comment.id}>
                <span>{comment.user.username}： </span>
                <span>{comment.content}</span>
                <time>{formatTime(new Date(comment.createdAt))}</time>
              </li>)
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
          width: 768px;
          position: relative;
          z-index: 200;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 5px;
          background: #fff;
          padding: 50px;
          box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
          margin: 0 auto 30px;
        }

        .comment-container textarea {
          border-radius: 8px;
          padding: 15px;
          width: 100%;
          height: 100px;
          font-size: 15px;
          resize: none;
          border: 1px solid #ddd;
        }

        .comment-container button {
          width: 50%;
          height: 30px;
          background: #fff;
          border: 1px solid #399c9c;
          border-radius: 3px;
          color: #399c9c;
          cursor: pointer;
          margin: 20px auto 0;
        }

        .comment-list {
          text-align: left;
        }

        .comment-list .comment {
          border-radius: 8px;
          padding: 15px;
          width: 100%;
          border: 1px solid #ddd;
          margin-top: 15px;
          height: 60px;
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-content: center;
        }

        .comment-list .comment time {
          position: absolute;
          right: 10px;
          top: -10px;
          font-size: 12px;
          color: #999;
          background:#fff;
        }


        @media (max-width: 500px) {
          article {
            width: 90vw;
            margin: 20px auto;
            padding: 20px;
          }

          .comment-container {
            width: 90vw;
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
  const comments = await connection.manager.find(Comment, {
    where: {post},
    relations: ['user'],
    order: {createdAt: 'DESC'}
  });
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
