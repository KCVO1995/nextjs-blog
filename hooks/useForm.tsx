import React, {ReactChild, useCallback, useState} from 'react';
import axios, {AxiosError} from 'axios';

type Fields<T> = {
  label: string
  type: 'text' | 'password' | 'textarea'
  key: keyof T
}[]

type useFormOptions<T> = {
  initFormData: T
  fields: Fields<T>
  className: string
  submit: {
    url: string
    submitSuccess: () => void
  }
  button: ReactChild
}

export function useForm<T>(options: useFormOptions<T>) {
  const {initFormData, submit, fields, button, className} = options
  const [formData, setFormData] = useState(initFormData)
  const [formErrors, setFormErrors] = useState(() => {
    const formErrors: { [key in keyof T]?: string[] } = {}
    for (const key in initFormData) {
      if (initFormData.hasOwnProperty(key)) formErrors[key] = []
    }
    return formErrors
  })

  const setSignUpData = (key: keyof T, value: string | number) => {
    setFormData({...formData, [key]: value})
  }

  const _submit = useCallback(e => {
    e.preventDefault()
    axios.post(submit.url, formData).then(() => {
      submit.submitSuccess()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      if (e.response.status === 422) {
        setFormErrors(data)
      } else if (e.response.status === 401) {
        alert('请登录')
        window.location.href = `/users/sign_in?return_url=${encodeURIComponent(window.location.href)}`
      }
    })
  }, [formData, submit])

  const form = (
    <>
      <form onSubmit={_submit}>
        {
          fields.map((field, index) =>
            field.type === 'textarea' ?
              <div className={'block-' + className} key={index}>
                <label>{field.label}</label>
                <textarea value={formData[field.key].toString()}
                          onChange={e => setSignUpData(field.key, e.target.value)}/>
                <span>{formErrors[field.key].join(', ')}</span>
              </div> :
              <div className={'block-' + className} key={index}>
                <label>{field.label}</label>
                <input type={field.type} value={formData[field.key].toString()}
                       onChange={e => setSignUpData(field.key, e.target.value)}/>
                <span>{formErrors[field.key].join(', ')}</span>
              </div>
          )
        }
        {button}
      </form>
      <style jsx>{`
        .block-sign-up,
        .block-sign-in {
          color: #399c9c;
          margin-bottom: 20px;
          position:relative;
        }

        .block-sign-up label,
        .block-sign-in label {
          display: inline-block;
          width: 4.5em;
        }

        .block-sign-up input,
        .block-sign-in input {
          border: none;
          border-bottom: 1px solid #399c9c;
          color: #333;
        }
        
        .block-sign-up span,
        .block-sign-in span {
          position: absolute;
          top: 22px;
          font-size: 12px;
          right: 0;
          color: #ccc;
        }
      `}</style>
    </>
  )
  return {form}
}

