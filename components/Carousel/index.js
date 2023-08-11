/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class Carousel extends Component {
  state = {offersInfoList: [], status: apiStatus.initial}

  componentDidMount() {
    this.getCarouselDetails()
  }

  onGettingCarouselData = offersList => {
    const updatedData = offersList.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({
      offersInfoList: updatedData,
      status: apiStatus.success,
    })
  }

  getCarouselDetails = async () => {
    this.setState({status: apiStatus.progress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onGettingCarouselData(data.offers)
    }
  }

  renderCarouselView = () => {
    const {offersInfoList} = this.state
    // console.log(offersInfoList)
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 1000,
      arrows: false,
    }

    return (
      <ul type="none" className="carousel-ul-container">
        <Slider {...settings}>
          {offersInfoList.map(eachItem => (
            <li className="carousel-item" key={eachItem.id}>
              <img
                className="carousel-img"
                src={eachItem.imageUrl}
                alt="offer"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div className="offers-loader-container" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="orange" height={50} width={50} />
    </div>
  )

  renderCarouselViewOnApiStatus = () => {
    const {status} = this.state
    // console.log(status)
    switch (status) {
      case apiStatus.progress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderCarouselView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderCarouselViewOnApiStatus()}</>
  }
}

export default Carousel
