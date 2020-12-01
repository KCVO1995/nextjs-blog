import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import { UAParser } from 'ua-parser-js';
import getDatabaseConnection from '../lib/getDatabaseConnection';

type Browser = {
  name: string
  major: string
  version: string
}

type Props = {
  browser: Browser
}



const Index: NextPage <Props> = (props) => {
  const {browser} = props
  return (
    <div>你的浏览器是1111: {browser.name}</div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async context => {
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  const connection = await getDatabaseConnection()
  console.log(connection, 'connection')
  console.log(result, 'result')
  return {
    props: {
      browser: result.browser
    }
  }
}
