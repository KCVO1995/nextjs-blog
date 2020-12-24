import React from 'react';
import Link from 'next/link';

const SwitchUser: React.FunctionComponent = () => {
  return (
    <>
      <div className='switch-user'><Link href={'/users/sign_in?return_url=/'}><a>切换用户</a></Link></div>
      <style jsx>{`
        .switch-user {
          position: absolute;
          z-index: 200;
          top: 20px;
          right: 20px;
          color: #399c9c;
        }
      `}</style>
    </>
  )
}

export default SwitchUser
