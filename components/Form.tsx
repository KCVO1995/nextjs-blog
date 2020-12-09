import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  fields: {
    label: string
    type: 'text' | 'password' | 'textarea'
    value: string | number
    errors: string[]
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  }[]
  submit: FormEventHandler
  button: ReactChild
}

const Form: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <form onSubmit={props.submit}>
        {
          props.fields.map((field, index) =>
            field.type === 'textarea' ?
              <div key={index}>
                <label>{field.label}</label>
                <textarea value={field.value} onChange={field.onChange} />
                <span>{field.errors.join(', ')}</span>
              </div> :
              <div key={index}>
                <label>{field.label}</label>
                <input type={field.type} value={field.value} onChange={field.onChange}/>
                <span>{field.errors.join(', ')}</span>
              </div>
          )
        }
        {props.button}
      </form>
    </>
  )
}

export default Form
