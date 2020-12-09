import {NextPage} from 'next';
import React from 'react';
import axios, {AxiosError} from 'axios';
import {useForm} from '../../hooks/useForm';

const New: NextPage = () => {
  const submit = (formData: typeof initFormData) => {
    alert('发布')
    axios.post('/api/v1/posts', formData).then(() => {
      alert('发布成功')
      // window.location.reload()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      setFormErrors(data)
    })
  }

  const initFormData = {title: '', content: ''}
  const {form, setFormErrors} = useForm({
    initFormData,
    submit,
    button: <button type='submit'>发布</button>,
    fields: [
          {label: '文章标题', type: 'text', key: 'title'},
          {label: '文章内容', type: 'textarea', key: 'content'}
        ]
  })

  return (
    <>
      <h2>发帖</h2>
      {form}
    </>
  )
}

export default New
