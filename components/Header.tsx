import React from 'react';
import Link from 'next/link';

type nav = {
  text: string
  path: string
}
type Props = {
  username?: string
  navs?: nav[]
}
const Header: React.FunctionComponent<Props> = props => {
  const {username, navs} = props
  return (
    <>
      <header>
        <div className='container'>
          {
            username ? <h1>Welcome {username}</h1>
              : <h1>Welcome</h1>
          }
          <nav>
            {
              navs.map((item, index) => <Link key={index} href={item.path}><a>{item.text}</a></Link>)
            }
          </nav>
        </div>
      </header>
      <style jsx>{`

        @keyframes goHeight {
          from {
            height: 50px;
          }
          to {
            height: 120px;
          }
        }

        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        header {
          z-index: 100;
          position: relative;
          margin: auto 0;
          padding-top: 130px;
          height: 250px;
        }

        header .container {
          will-change: height;
          animation: goHeight 600ms forwards;
          border-radius: 8px;
          margin: 0 auto;
          background: #399c9c;
          padding: 0 50px;
          color: white;
          max-width: 768px;
          width: 768px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif, 'hei';
        }

        header .container nav,
        header .container h1 {
          opacity: 0;
          animation: show 700ms 600ms forwards;
          font-weight: normal;
        }

        header .container nav a {
          margin-left: 10px;
        }

        @media (max-width: 500px) {
          @keyframes goHeight {
            from {
              height: 50px;
            }
            to {
              height: 100px;
            }
          }
          header {
            padding-top: 50px;
            height: 150px;
          }

          header .container {
            width: 90vw;
            height: 100px;
            justify-content: center;
            flex-direction: column;
          }

          header .container h1 {
            font-size: 28px;
            margin: 10px;
          }
        }
      `}</style>
    </>
  )

}

export default Header
