import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {useForm} from '../../hooks/useForm';
import {useRouter} from 'next/router';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import {is} from '@babel/types';

type Props = {
  editPost: Post
  isEdit: boolean
}
const New: NextPage<Props> = (props) => {
  const {isEdit, editPost} = props
  const router = useRouter()
  const initFormData = {
    title: editPost.title ? editPost.title : '',
    content: editPost.content ? editPost.content : ''
  }
  const {form} = useForm({
    initFormData,
    button: <button className='publish-post-button' type='submit'>{isEdit ? '编辑文章' : '发布文章'}</button>,
    className: 'post',
    fields: [
      {label: '文章标题', type: 'text', placeholder: '请输入标题', key: 'title'},
      {label: '文章内容', type: 'textarea', placeholder: '请输入内容', key: 'content'}
    ],
    submit: {
      url: isEdit ? `/api/v1/post/${editPost.id}` : '/api/v1/posts',
      method: isEdit ? 'put' : 'post',
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

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.query
  if (!id) {
    return {
      props: {isEdit: false, editPost: {}}
    }
  }
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, id.toString())
  return {
    props: {
      editPost: JSON.parse(JSON.stringify(post)),
      isEdit: true
    }
  }
}
