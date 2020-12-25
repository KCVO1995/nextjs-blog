import {NextPage} from 'next';
import React from 'react';
import {useForm} from '../../hooks/useForm';
import {useRouter} from 'next/router';

const New: NextPage = () => {
  const router = useRouter()
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    button: <button className='publish-post-button' type='submit'>发布</button>,
    className: 'post',
    fields: [
      {label: '文章标题', type: 'text', placeholder: '请输入标题', key: 'title'},
      {label: '文章内容', type: 'textarea', placeholder: '请输入内容', key: 'content'}
    ],
    submit: {
      url: '/api/v1/posts',
      submitSuccess: (res) => {
        alert('发布成功')
        router.push(`/posts/${res.data.id}`).then()
      }
    }
  })

  return (
    <>
      <div className='page'>
        <div className='container'>
          {form}
        </div>
      </div>
      <style global jsx>{`
        .publish-post-button {
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
        .page {
          width: 100%;
          min-height: 100vh;
          z-index: 100;
          padding-top: 30px;
        }

        .page .container {
          z-index: 100;
          position: relative;
          background: #fff;
          width: 768px;
          margin: 0 auto;
        }

        @media (max-width: 500px) {
          .page {
            padding: 30px 20px 0;
          }

          .page .container {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

export default New
