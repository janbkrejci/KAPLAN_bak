import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Hlavní stránka" description="Home page" />

      <main className='p-4'>
        <h1 className='text-xl font-bold'>Vítejte v aplikaci KAPLAN</h1>
        <p className='mt-4'>
          Toto je hlavní stránka aplikace. Zde se budou zobrazovat různé informace a statistiky.
        </p>
      </main>

    </>
  )
}

export default HomePage
