// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: 'bb519c4f-3183-4264-809e-9d95fae2e38f', // 加密的密钥
    cookieName: 'next_blog',
    cookieOptions: {
      secure: false
    },
  })
}
