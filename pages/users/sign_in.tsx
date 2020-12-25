import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {withSession} from '../../lib/withSession';
import {User} from '../../src/entity/User';
import {useForm} from '../../hooks/useForm';
import queryString from 'querystring'
import Link from 'next/link';

const signIn: NextPage<{ user: User }> = (props) => {

  const {form} = useForm({
    initFormData: {username: '', password: ''},
    button: <button className='publish-button' type='submit'>登录</button>,
    className: 'sign-in',
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    submit: {
      url: '/api/v1/sessions',
      method: 'post',
      submitSuccess: () => {
        alert('登录成功')
        const parsed = queryString.parse(location.search.substr(1))
        if (parsed.return_url) window.location.href = parsed.return_url as string
        else window.location.reload()
      }
    }
  })

  return (
    <>
      <div className='global'>
        <div className='container'>
          <h2>用户登录</h2>
          {form}
          <span className='tip'>
            尚无帐号，立即
            <Link href={'/users/sign_up'}>
              <a> 注册</a>
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

export default signIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
// @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || {}))
    }
  }
})

