import React from 'react';
import Link from 'next/link';

type Props = {
  username: string | undefined
}
const SwitchUser: React.FunctionComponent<Props> = (props) => {
  const {username} = props
  return (
    <>
      {
        username ?
          <div className='switch-user'>
            <span className='username'>{username}</span>
            <Link href={'/users/sign_in?return_url=/'}><a>切换用户</a></Link>
          </div> :
          <div className='switch-user'>
            <Link href={'/users/sign_in?return_url=/'}><a className='login'>登录</a></Link>
          </div>

      }
      <style jsx>{`
        .switch-user {
          position: absolute;
          z-index: 200;
          top: 20px;
          right: 20px;
          color: #399c9c;
        }
        .switch-user .username{
          margin-right: 20px;
        }
        .switch-user a{
         color: #ccc
        }
        .switch-user .login {
          color: #399c9c;
        }
      `}</style>
    </>
  )
}

export default SwitchUser
