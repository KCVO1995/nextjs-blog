import React, {ReactChild, useCallback, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';

type Fields<T> = {
  label: string
  type: 'text' | 'password' | 'textarea'
  placeholder?: string
  key: keyof T
}[]

type useFormOptions<T> = {
  initFormData: T
  fields: Fields<T>
  className: string
  submit: {
    url: string
    submitSuccess: (res: AxiosResponse) => void
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
    axios.post(submit.url, formData).then((res) => {
      submit.submitSuccess(res)
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

  // @ts-ignore
  const form = (
    <>
      <form onSubmit={_submit}>
        {
          fields.map((field, index) =>
            field.type === 'textarea' ?
              <div className={'block-' + className} key={index}>
                <label>{field.label}</label>
                <textarea value={formData[field.key].toString()}
                          placeholder={field.placeholder}
                          onChange={e => setSignUpData(field.key, e.target.value)}/>
                <span>{formErrors[field.key].join(', ')}</span>
              </div> :
              <div className={'block-' + className} key={index}>
                <label>{field.label}</label>
                <input type={field.type} value={formData[field.key].toString()}
                       autoFocus={true}
                       placeholder={field.placeholder}
                       onChange={e => setSignUpData(field.key, e.target.value)}/>
                <span>{formErrors[field.key].join(', ')}</span>
              </div>
          )
        }
        {button}
      </form>
      <style jsx>{`
        .block-post {
          margin-bottom: 30px;

        }

        .block-post label {
          display: none;
        }

        .block-post input {
          border: none;
          border-bottom: 1px solid #399c9c;
          height: 50px;
          font-size: 32px;
          width: 100%;
          padding-bottom: 10px;
          padding-left: 15px;
        }

        .block-post textarea {
          border-radius: 8px;
          padding: 15px;
          width: 100%;
          height: 70vh;
          font-size: 15px;
          resize: none;
          border: 1px solid #399c9c;
        }

        @media (max-width: 500px) {
          .block-post textarea {
          }
          .block-post input {
            height: 40px;
            font-size: 24px;
          }
        }

        .block-sign-up,
        .block-sign-in {
          color: #399c9c;
          margin-bottom: 20px;
          position: relative;
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

