import axios, {AxiosError} from 'axios';
import {NextPage} from 'next';
import React from 'react';
import {useRouter} from 'next/router';
import {useForm} from '../../hooks/useForm';

const signUp: NextPage = () => {
  const router = useRouter()
  const submit = (formData: typeof initFormData) => {
    axios.post('/api/v1/users', formData).then(() => {
      alert('成功注册')
      router.push('/users/sign_in').then()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      console.log(data, 'data error')
      setFormErrors(data)
    })
  }

  const initFormData = {username: '', password: '', passwordConfirmation: ''}
  const {form, setFormErrors} = useForm({
    initFormData,
    submit,
    button: <button type='submit'>发布</button>,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ]
  })

  return (
    <>
     <h2>用户注册</h2>
      {form}
    </>
  )
}

export default signUp
