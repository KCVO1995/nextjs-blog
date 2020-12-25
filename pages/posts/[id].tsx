import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Header from '../../components/Header';
import formatTime from '../../lib/formatTime';
import marked from 'marked';
import axios from 'axios';
import {useRouter} from 'next/router';

type Props = {
  post: Post
}

const post: NextPage<Props> = props => {
  const {title, updatedAt, content, id} = props.post
  const router =useRouter()
  // TODO 404

  const editPost = (id: number) => {
    router.push(`/posts/new?id=${id}`).then()
  }

  const deletePost = (id: number) => {
    if (confirm('是否要删除此文章')) {
      axios.delete(`/api/v1/post/${id}`).then(() => {
        alert('删除成功')
        router.push('/').then()
      }, e => {console.log('删除失败')})
    }
  }
  return (
    <>
      <div className='page'>
        <Header username='' navs={[{text: '目录', path: '/'}]}/>
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

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id.toString())
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}
