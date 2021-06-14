import Head from 'next/head'
import NavBar from '/components/navBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page technical test" />
      </Head>
      <NavBar/>
      <div className="container">
        <p>Home de la pagina</p>
      </div>
    </>
  )
}
