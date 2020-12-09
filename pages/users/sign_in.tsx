import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';
import {useForm} from '../../hooks/useForm';
import queryString from 'querystring'

const signIn: NextPage<{user: User}> = (props) => {
  const {form} = useForm({
    initFormData: {username: '', password: ''},
    button: <button type='submit'>发布</button>,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    submit: {
      url: '/api/v1/sessions',
      submitSuccess: () => {
        alert('登录成功')
        const parsed = queryString.parse(location.search.substr(1))
        if (parsed.return_url) window.location.href = parsed.return_url as string
        else window.location.reload()
      }
    }
  })

  return (
    <>
     <h2>用户登录</h2>
      { props.user && <strong>当前登录用户：{props.user.username}</strong> }
      {form}
    </>
  )
}

export default signIn

export const getServerSideProps: GetServerSideProps =  withSession(async (context: GetServerSidePropsContext) => {
// @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || {}))
    }
  }
})

