import React, { ReactChild, useCallback, useState} from 'react';
import axios, {AxiosError} from 'axios';

type Fields<T> = {
  label: string
  type: 'text' | 'password' | 'textarea'
  key: keyof T
}[]

type useFormOptions<T> = {
  initFormData: T
  fields: Fields<T>
  submit: {
    url: string
    submitSuccess: () => void
  }
  button: ReactChild
}

export function useForm<T> (options: useFormOptions<T>) {
  const {initFormData, submit, fields, button} = options
  const [formData, setFormData] = useState(initFormData)
  const [formErrors, setFormErrors] = useState(() => {
    const formErrors: { [key in keyof T]?: string[] } = {}
    for (const key in initFormData) {
      if (initFormData.hasOwnProperty(key)) formErrors[key] = []
    }
    return formErrors
  })

  const setSignUpData = (key: keyof T, value: string | number) => {
    setFormData({ ...formData, [key]: value })
  }

  const _submit = useCallback(e => {
    e.preventDefault()
    axios.post(submit.url, formData).then(() => {
      submit.submitSuccess()
    }, (e: AxiosError) => {
      const {response: {data}} = e
      setFormErrors(data)
    })
  }, [formData, submit])

  const form = (
    <form onSubmit={_submit}>
      {
        fields.map((field, index) =>
          field.type === 'textarea' ?
            <div key={index}>
              <label>{field.label}</label>
              <textarea value={formData[field.key].toString()} onChange={e => setSignUpData(field.key, e.target.value)} />
              <span>{formErrors[field.key].join(', ')}</span>
            </div> :
            <div key={index}>
              <label>{field.label}</label>
              <input type={field.type} value={formData[field.key].toString()} onChange={e => setSignUpData(field.key, e.target.value)}/>
              <span>{formErrors[field.key].join(', ')}</span>
            </div>
        )
      }
      {button}
    </form>
  )
  return {form}
}

