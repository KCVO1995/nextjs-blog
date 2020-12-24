import React from 'react';
import Link from 'next/link';
import _ from 'lodash'

type Options = {
  page: number
  totalPage: number
  pathname: string
  urlMaker?: (n: number) => string
}


export function usePager(options: Options) {
  const {page, totalPage, pathname, urlMaker: _urlMaker} = options
  const defaultUrlMaker = (n: number) => pathname + '?page=' + n
  const urlMaker = _urlMaker || defaultUrlMaker
  const numbers = []
  numbers.push(1)
  for (let i = page - 2; i <= page + 2; i++) {
    numbers.push(i)
  }
  numbers.push(totalPage)
  const pagerNumbers = _.uniq(numbers).filter(item => item > 0 && item <= totalPage)
    .reduce((result, n) => n - (result[result.length - 1] || 0) === 1 ? result.concat(n) : result.concat(-1, n), [])
  const pager = (
    <div className='pager'>
      <div className='container-pager'>
        {page > 1 && <Link href={urlMaker(page - 1)}><a>&lt;</a></Link>}
        {pagerNumbers.map((n, index) => n === -1 ?
          <span key={index}>...</span> :
          n === page ?
            <span key={index} className="current-page">{n}</span> :
            <Link key={index} href={urlMaker(n)}><a>{n}</a></Link>
        )}
        {page < totalPage && <Link href={urlMaker(page + 1)}><a>&gt;</a></Link>}
      </div>
      {/*<span>第 {page}/{totalPage} 页</span>*/}
      <style jsx>{`
        .pager {
          display: flex;
        }

        .pager span {
          margin-left: 20px;
        }

        .container-pager {
          margin: 0 -8px
        }

        .container-pager > a, .container-pager span {
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgb(195,225,225);
          color: white;
          margin: 0 8px
        }

        .container-pager > a {
          text-decoration: none
        }

        .current-page {
          color: red
        }
      `}
      </style>
    </div>
  )
  return {pager}
}
