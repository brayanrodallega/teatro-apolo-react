import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import MovieFilter from '../components/MovieFilter'
import Movies from './Movies'



function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <MovieFilter />
      <Movies />
      <Footer />
    </>
  )
}

export default Home