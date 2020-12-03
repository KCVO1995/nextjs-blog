import axios, {AxiosError} from 'axios';
import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/router';

type SignData = {
  username: string
  password: string
  passwordConfirmation: string
  [key: string]: string
}

const signUp: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({username: '', password: '', passwordConfirmation: ''})
  const [errorData, setErrorData] = useState({username: [], password: [], passwordConfirmation: []})
  const setSignUpData = (key: string, value: string) => {
    const data: SignData  = {...formData}
    data[key] = value
    setFormData(data)
  }
  const submit = useCallback(e => {
    e.preventDefault()
    axios.post('/api/v1/users', formData).then(() => {
      alert('成功注册')
      router.push('/users/sign_in').then()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      console.log(data, 'data error')
      setErrorData(data)
    })
  }, [formData])
  return (
    <>
     <h2>用户注册</h2>
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
        <div>
          <label>
            <span>确认密码</span>
            <input type="password" value={formData.passwordConfirmation} onChange={e => setSignUpData('passwordConfirmation', e.target.value)}/>
          </label>
          <span>{errorData.passwordConfirmation?.join(',')}</span>
        </div>
        <button type='submit'>提交</button>
      </form>
    </>
  )
}

export default signUp