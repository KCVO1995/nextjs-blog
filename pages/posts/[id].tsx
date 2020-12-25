import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Header from '../../components/Header';
import formatTime from '../../lib/formatTime';
import marked from 'marked';

type Props = {
  post: Post
}

const post: NextPage<Props> = props => {
  const {title, createdAt, updatedAt, content} = props.post
  return (
    <>
      <div className='page'>
        <Header username='' navs={[{text: '目录', path: '/'}]}/>
        <article>
          <time>{formatTime(new Date(updatedAt))}</time>
          <h1>{title}</h1>
          <div className='markdown-body' dangerouslySetInnerHTML={{__html: marked(content)}} />
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

        article time {
          display: block;
          margin-bottom: 10px;
          color: #ccc;
        }

        article h1 {
          color: #1e1e1e;
          margin-bottom: 30px;
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
