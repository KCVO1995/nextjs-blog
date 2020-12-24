import '../assets/style/reset.css'
import type {AppProps} from 'next/app'
import {UAParser} from 'ua-parser-js';
import React from 'react';
// @ts-ignore
import ReactCanvasNest from "react-canvas-nest";

function MyApp({Component, pageProps}: AppProps) {
  const device = new UAParser().getDevice().type
  const config = {
    count: device === 'mobile' ? 35 : 70,
    follow: device !== 'mobile',
    pointColor: '195,225,225',
    pointR: device === 'mobile' ? 6 : 10,
    pointOpacity: 1,
    lineColor: '195,225,225',
    lineWidth: 3,
    mouseDist: 30000
  }
  return (
    <>
      <ReactCanvasNest className='canvasNest' config={config} style={{zIndex: 10}}/>
      <Component {...pageProps} />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
