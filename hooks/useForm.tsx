import React, { ReactChild, useCallback, useState} from 'react';

type Fields<T> = {
  label: string
  type: 'text' | 'password' | 'textarea'
  key: keyof T
}[]

type useFormOptions<T> = {
  initFormData: T
  fields: Fields<T>
  submit: (formData: T) => void
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
    submit(formData)
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
  return {form, setFormErrors}
}

