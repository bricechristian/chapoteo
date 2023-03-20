import Image from 'next/image'

import data from  "../../public/vocab.json"
import CardList from './components/CardList';

const Home = () => {

  return (
    <main className="relative">
      <h1 className="headline-stroke absolute inset-x-0 top-4 text-center">Chapoteo (Splash)</h1>
      <CardList data={data.words} />
    </main>
  )
}

export default Home;