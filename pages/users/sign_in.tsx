import axios, {AxiosError} from 'axios';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';
import Form from '../../components/Form';

const signIn: NextPage<{user: User}> = (props) => {
  const [formData, setFormData] = useState({username: '', password: ''})
  const [errorData, setErrorData] = useState({username: [], password: []})
  const setSignUpData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }
  const submit = useCallback(e => {
    e.preventDefault()
    axios.post('/api/v1/sessions', formData).then(() => {
      alert('登录成功')
      window.location.reload()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      setErrorData(data)
    })
  }, [formData])

  return (
    <>
     <h2>用户登录</h2>
      {
        props.user && <strong>当前登录用户：{props.user.username}</strong>
      }
      <Form fields={[
        {label: '用户名', type: 'text', value: formData.username, errors: errorData.username,
          onChange(e) { setSignUpData('username', e.target.value) }},
        {label: '密码', type: 'password', value: formData.password, errors: errorData.password,
          onChange(e) { setSignUpData('password', e.target.value) }
        }
      ]} submit={submit} button={<button type='submit'>登录</button>}/>
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

