import axios, {AxiosError} from 'axios';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';
import {useForm} from '../../hooks/useForm';

const signIn: NextPage<{user: User}> = (props) => {
  const submit = (formData: typeof initFormData) => {
    axios.post('/api/v1/sessions', formData).then(() => {
      alert('登录成功')
      window.location.reload()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      setFormErrors(data)
    })
  }

  const initFormData = {username: '', password: ''}
  const {form, setFormErrors} = useForm({
    initFormData,
    submit,
    button: <button type='submit'>发布</button>,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ]
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
      user: JSON.parse(JSON.stringify(user))
    }
  }
})

