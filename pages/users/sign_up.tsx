import {NextPage} from 'next';
import React from 'react';
import {useRouter} from 'next/router';
import {useForm} from '../../hooks/useForm';

const signUp: NextPage = () => {
  const router = useRouter()
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    button: <button type='submit'>发布</button>,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ],
    submit: {
      url: '/api/v1/users',
      submitSuccess: () => {
        alert('成功注册')
        router.push('/users/sign_in').then()
      }
    },
  })

  return (
    <>
     <h2>用户注册</h2>
      {form}
    </>
  )
}

export default signUp
