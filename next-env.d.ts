/// <reference types="next" />
/// <reference types="next/types/global" />
import next from 'next'

type Post = {
  id: string,
  date: string,
  title: string,
  content: string
}

declare module "next"  {
  interface NextApiRequest {
    session: Session
  }
}
