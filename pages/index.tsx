import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import { UAParser } from 'ua-parser-js';
import getDatabaseConnection from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';

type Browser = {
  name: string
  major: string
  version: string
}

type Props = {
  browser: Browser
  posts: Post[]
}



const Index: NextPage <Props> = (props) => {
  const {posts} = props
  return (
    <div>
      {
        posts.map(post => {
          console.log('post', post)
          return (<li>{post.title}-{post.createdAt}</li>)
        })
      }
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async context => {
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      browser: result.browser
    }
  }
}
