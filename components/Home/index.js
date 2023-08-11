import Header from '../Header'
import Restaurants from '../Restaurants'
import Footer from '../Footer'
import Carousel from '../Carousel'

import './index.css'

const Home = () => (
  <div className="home-page">
    <Header />
    <div className="carousel-sec">
      <Carousel />
      <div className="restaurant-sec">
        <Restaurants />
      </div>
    </div>
    <Footer />
  </div>
)

export default Home
