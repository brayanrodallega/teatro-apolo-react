import Carousel from '../components/Carousel'
import MovieFilter from '../components/MovieFilter'
import Movies from './Movies'


function Home() {
  return (
    <>
      <Carousel />
      <MovieFilter />
      <Movies />
    </>
  )
}

export default Home