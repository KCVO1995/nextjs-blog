import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';

type Props = {
  post: Post
}

const post: NextPage<Props> = props => {
  const {title, createdAt, updatedAt, content} = props.post
  return (
    <div>
      <h2>{title}</h2>
      <p>发布于：{new Date(createdAt).toDateString()}</p>
      <p>编辑于：{new Date(updatedAt).toDateString()}</p>
      <article>{content}</article>
    </div>
  )
}

export default post

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id.toString())
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    }
  }
}
