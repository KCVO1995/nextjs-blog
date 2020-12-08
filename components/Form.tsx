import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  fields: {
    label: string
    type: 'text' | 'password'
    value: string | number
    errors: string[]
    onChange: ChangeEventHandler<HTMLInputElement>
  }[]
  submit: FormEventHandler
  button: ReactChild
}

const Form: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <form onSubmit={props.submit}>
        {
          props.fields.map((field,index) =>
            <div key={index}>
              <label>{field.label}</label>
              <input type={field.type} value={field.value} onChange={field.onChange}/>
              <span>{field.errors.join(', ')}</span>
            </div>)
        }
        {props.button}
      </form>
    </>
  )
}

export default Form
