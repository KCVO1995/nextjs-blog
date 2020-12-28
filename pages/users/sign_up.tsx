import {NextPage} from 'next';
import React from 'react';
import {useRouter} from 'next/router';
import {useForm} from '../../hooks/useForm';
import Link from 'next/link';
import Head from 'next/head';

const signUp: NextPage = () => {
  const router = useRouter()
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    button: <button className='publish-button' type='submit'>注册</button>,
    className: 'sign-up',
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ],
    submit: {
      url: '/api/v1/users',
      method: 'post',
      submitSuccess: () => {
        alert('成功注册')
        router.push('/users/sign_in').then()
      }
    },
  })

  return (
    <>
      <Head><title>注册</title></Head>
      <div className='global'>
        <div className='container'>
          <h2>用户注册</h2>
          {form}
          <span className='tip'>
            已有账号，立即
            <Link href={'/users/sign_in'}>
              <a> 登录</a>
            </Link>
          </span>
        </div>
      </div>
      <style global jsx>{`
        .publish-button {
          width: 100%;
          height: 30px;
          background: #fff;
          border: 1px solid #399c9c;
          border-radius: 3px;
          color: #399c9c;
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .global {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100Vh;
        }

        .container {
          z-index: 100;
          border: 1px solid #399c9c;
          border-radius: 8px;
          margin: 0 auto;
          padding: 50px;
          position: relative;
        }

        .container:after {
          filter: blur(5px);
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -1;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.8)
        }

        .container h2 {
          color: #399c9c;
          margin-bottom: 20px;
        }

        .container .tip {
          color: #bbb;
          font-size: 14px;
          display: block;
          margin-top: 10px;
        }

        .container .tip a {
          color: #399c9c
        }
      `}</style>
    </>
  )
}

export default signUp
