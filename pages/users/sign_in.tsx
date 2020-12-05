import axios, {AxiosError} from 'axios';
import {GetServerSideProps, NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';

type SignData = {
  username: string
  password: string
  [key: string]: string
}

const signIn: NextPage<{user: User}> = (props) => {
  const [formData, setFormData] = useState({username: '', password: ''})
  const [errorData, setErrorData] = useState({username: [], password: []})
  const setSignUpData = (key: string, value: string) => {
    const data: SignData  = {...formData}
    data[key] = value
    setFormData(data)
  }
  const submit = useCallback(e => {
    e.preventDefault()
    axios.post('/api/v1/sessions', formData).then(() => {
      alert('登录成功')
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
      <form onSubmit={submit}>
        <div>
          <label>
            <span>用户名</span>
            <input type="text" value={formData.username} onChange={e => setSignUpData('username', e.target.value)}/>
          </label>
          <span>{errorData.username?.join(', ')}</span>
        </div>
        <div>
          <label>
            <span>密码</span>
            <input type="password" value={formData.password} onChange={e => setSignUpData('password', e.target.value)}/>
          </label>
          <span>{errorData.password?.join(',')}</span>
        </div>
        <button type='submit'>提交</button>
      </form>
    </>
  )
}

export default signIn

// @ts-ignore
export const getServerSideProps: GetServerSideProps =  withSession(async (context) => {
// @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
})

