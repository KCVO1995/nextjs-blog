import axios, {AxiosError} from 'axios';
import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';

type SignData = {
  username: string
  password: string
  [key: string]: string
}

const signUp: NextPage = () => {
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
      alert('成功')
    }, (e: AxiosError) => {
      const {response: {data}} = e
      setErrorData(data)
    })
  }, [formData])
  return (
    <>
     <h2>用户登录</h2>
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

export default signUp
