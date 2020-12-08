import axios, {AxiosError} from 'axios';
import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import Form from '../../components/Form';

const signUp: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({username: '', password: '', passwordConfirmation: ''})
  const [errorData, setErrorData] = useState({username: [], password: [], passwordConfirmation: []})
  const setSignUpData = (key: string, value: string) => {
    setFormData({...formData, [key]: value})
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
      <Form fields={[
        {label: '用户名', type: 'text', value: formData.username, errors: errorData.username,
          onChange(e) { setSignUpData('username', e.target.value) }},
        {label: '密码', type: 'password', value: formData.password, errors: errorData.password,
          onChange(e) { setSignUpData('password', e.target.value) }
        },
        {label: '确认密码', type: 'password', value: formData.passwordConfirmation, errors: errorData.passwordConfirmation,
          onChange(e) { setSignUpData('passwordConfirmation', e.target.value) }
        }
      ]} submit={submit} button={<button type='submit'>提交</button>}/>
    </>
  )
}

export default signUp
