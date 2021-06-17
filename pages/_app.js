import Head from "next/head";
import { CookiesProvider } from "react-cookie";

import '../styles/globals.css'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <CookiesProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
    )
}

export default MyApp
