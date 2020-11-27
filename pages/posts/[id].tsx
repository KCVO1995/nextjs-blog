import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getPost, getPostIds} from '../../lib/posts';

type Props = {
  post: Post
}

const post: NextPage<Props> = props => {
  const {title, date, content} = props.post
  return (
    <div>
      <h2>{title}</h2>
      <p>日期：{new Date(date).toDateString()}</p>
      <article>{content}</article>
    </div>
  )
}

export default post

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds()
  const paths = ids.map(id => '/posts/' + encodeURIComponent(id))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.id) {
    const post = await getPost(params.id.toString())
    return {
      props: { post: JSON.parse(JSON.stringify(post)) }
    }
  } else return { props: {} }
}
