import Head from 'next/head'
import NavBar, { NavBarAuth } from '/components/navBar'
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies, setCookie] = useCookies();
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page technical test" />
      </Head>
      {
        cookies.jwt ? 
        <NavBarAuth/>
        :
        <NavBar/>
      }
      <div className="container">
        <p>Home de la pagina</p>
      </div>
    </>
  )
}
