import Head from 'next/head'
import NavBar from './components/navBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <p>Home de la pagina</p>
    </div>
  )
}
