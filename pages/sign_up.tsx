import axios from 'axios';
import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';

type SignData = {
  username: string
  password: string
  passwordConfirmation: string
  [key: string]: string
}

const signUp: NextPage = () => {
  const [formData, setFormData] = useState({username: '', password: '', passwordConfirmation: ''})
  const setSignUpData = (key: string, value: string) => {
    const data: SignData  = {...formData}
    data[key] = value
    setFormData(data)
  }
  const submit = useCallback(e => {
    e.preventDefault()
    axios.post('/users', formData).then(() => {

    }, () => {
      alert('失败了')
    })
  }, [])
  return (
    <>
      <div>
        { JSON.stringify(formData) }
      </div>
     <h2>用户注册</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            <span>用户名</span>
            <input type="text" value={formData.username} onChange={e => setSignUpData('username', e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            <span>密码</span>
            <input type="password" value={formData.password} onChange={e => setSignUpData('password', e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            <span>验证密码</span>
            <input type="password" value={formData.passwordConfirmation} onChange={e => setSignUpData('passwordConfirmation', e.target.value)}/>
          </label>
        </div>
        <button type='submit'>提交</button>
      </form>
    </>
  )
}

export default signUp
