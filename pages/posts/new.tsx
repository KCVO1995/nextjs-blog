import {NextPage} from 'next';
import React from 'react';
import {useForm} from '../../hooks/useForm';
import {useRouter} from 'next/router';

const New: NextPage = () => {
  const router = useRouter()
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    button: <button type='submit'>发布</button>,
    fields: [
      {label: '文章标题', type: 'text', key: 'title'},
      {label: '文章内容', type: 'textarea', key: 'content'}
    ],
    submit: {
      url: '/api/v1/posts',
      submitSuccess: () => {
        alert('发布成功')
        router.push('/posts').then()
      }
    }
  })

  return (
    <>
      <h2>发帖</h2>
      {form}
    </>
  )
}

export default New
