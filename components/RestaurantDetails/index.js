/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign, FaGripLinesVertical} from 'react-icons/fa'
// import TestyContext from '../../context/TestyContext'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'

import Header from '../Header'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    foodItemsDetailsList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  onSuccessFullyFetchingData = fetchedData => {
    const updatedData = {
      costForTwo: fetchedData.cost_for_two,
      cuisine: fetchedData.cuisine,
      id: fetchedData.id,
      imageUrl: fetchedData.image_url,
      itemsCount: fetchedData.items_count,
      location: fetchedData.location,
      name: fetchedData.name,
      opensAt: fetchedData.opens_at,
      rating: fetchedData.rating,
      reviewsCount: fetchedData.reviews_count,
      foodItemsList: fetchedData.food_items.map(eachItem => ({
        cost: eachItem.cost,
        name: eachItem.name,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
        quantity: 0,
      })),
    }
    // console.log(updatedData)
    this.setState({
      restaurantDetails: updatedData,
      foodItemsDetailsList: updatedData.foodItemsList,
      status: apiStatus.success,
    })
  }

  getRestaurantDetails = async () => {
    this.setState({status: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
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
      this.onSuccessFullyFetchingData(data)
    }
  }

  onIncreaseFIQuantity = foodItemDetails => {
    const {foodItemsDetailsList} = this.state
    const updatedQList = foodItemsDetailsList.map(each => {
      if (each.id === foodItemDetails.id) {
        return {
          ...each,
          quantity: foodItemDetails.quantity + 1,
        }
      }
      return each
    })
    this.setState({foodItemsDetailsList: updatedQList})
  }

  onDecreaseFIQuantity = foodItemDetails => {
    const {foodItemsDetailsList} = this.state
    const updatedQList = foodItemsDetailsList.map(each => {
      if (each.id === foodItemDetails.id) {
        return {
          ...each,
          quantity: foodItemDetails.quantity - 1,
        }
      }
      return each
    })
    this.setState({foodItemsDetailsList: updatedQList})
  }

  onDisplayQBar = foodItemDetails => {
    //  console.log(foodItemDetails)
    const updatedDetails = {
      ...foodItemDetails,
      quantity: 1,
    }
    const {foodItemsDetailsList} = this.state
    const newFoodItemsList = foodItemsDetailsList.filter(
      each => each.id !== foodItemDetails.id,
    )
    this.setState({foodItemsDetailsList: [updatedDetails, ...newFoodItemsList]})
  }

  renderSuccessView = () => {
    const {restaurantDetails, foodItemsDetailsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantDetails
    return (
      <div className="restaurant-info-page">
        <div className="restaurant-info-card-container">
          <div className="restaurant-details-sec">
            <img className="card-img" src={imageUrl} alt="restaurant" />
            <div className="rd-text-container">
              <h1 className="rd-heading"> {name} </h1>
              <p className="rd-paragraph"> {cuisine} </p>
              <p className="rd-paragraph"> {location} </p>
              <div className="rating-and-cost-container">
                <div className="rd-rating-container">
                  <AiFillStar className="rd-star" />
                  <p className="rd-rating">{rating}</p>
                </div>
                <FaGripLinesVertical className="v-bar" />
                <div className="rd-cost-container">
                  <FaRupeeSign className="rd-rupees" />
                  <p className="rd-price"> {costForTwo} </p>
                </div>
              </div>
              <div className="rd-count-container">
                <p className="rd-review-text"> {reviewsCount}+ Rating</p>
                <p className="rd-cost-for-two-text"> Cost for two </p>
              </div>
            </div>
          </div>
        </div>
        <ul type="none" className="rd-ul-container">
          {foodItemsDetailsList.map(each => (
            <FoodItem
              key={each.id}
              foodItemDetails={each}
              foodItemInfo={foodItemsDetailsList}
              onDisplayQBar={this.onDisplayQBar}
              onIncreaseFIQuantity={this.onIncreaseFIQuantity}
              onDecreaseFIQuantity={this.onDecreaseFIQuantity}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="rd-loader-container">
      <Loader type="BallTriangle" color="red" height={100} width={100} />
    </div>
  )

  renderRestaurantInfoOnApiStatus = () => {
    const {status} = this.state
    // console.log(status)
    switch (status) {
      case apiStatus.progress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div
        className="restaurant-info-container"
        testid="restaurant-details-loader"
      >
        <Header />
        {this.renderRestaurantInfoOnApiStatus()}
      </div>
    )
  }
}

export default RestaurantDetails
