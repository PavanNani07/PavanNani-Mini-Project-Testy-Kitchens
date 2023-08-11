/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillLeftSquare, AiFillRightSquare} from 'react-icons/ai'
import {MdSort} from 'react-icons/md'

import Loader from 'react-loader-spinner'

import RestaurantsItem from '../RestaurantsItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    option: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    option: 'Highest',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class Restaurants extends Component {
  state = {
    restaurantsDetailsList: [],
    limit: 9,
    activePage: 1,
    activeSortBy: sortByOptions[0].option,
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  onGettingRestaurantsData = restaurantsList => {
    const updatedData = restaurantsList.map(each => ({
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      groupByTime: each.group_by_time,
      hasOnlineDelivery: each.has_online_delivery,
      hasTableBooking: each.has_table_booking,
      id: each.id,
      imageUrl: each.image_url,
      isDeliveringNow: each.is_delivering_now,
      location: each.location,
      menuType: each.menu_type,
      name: each.name,
      opensAt: each.opens_at,
      userRating: {
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      },
    }))
    // console.log(updatedData)
    this.setState({
      restaurantsDetailsList: updatedData,
      status: apiStatus.success,
    })
  }

  getRestaurantsData = async () => {
    this.setState({status: apiStatus.progress})
    const token = Cookies.get('jwt_token')
    const {limit, activePage, activeSortBy} = this.state
    const offset = (activePage - 1) * limit
    // console.log(activeSortBy)
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortBy}`
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
      this.onGettingRestaurantsData(data.restaurants)
    }
  }

  onChangeOption = event => {
    // console.log(event.target.value)
    this.setState({activeSortBy: event.target.value}, this.getRestaurantsData)
  }

  onIncrement = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsData)
    }
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsData)
    }
  }

  renderSuccessView = () => {
    const {restaurantsDetailsList, activePage, activeSortBy} = this.state
    return (
      <div className="restaurants-sec">
        <h1 className="popular-heading">Popular Restaurants </h1>
        <div className="sort-sec">
          <p className="paragraph">
            Select Your favourite restaurant special dish and make your day
            happy....
          </p>
          <div className="sort-container">
            <MdSort className="sort-icon" />
            <p> Sort by </p>
            <select
              id="selectId"
              value={activeSortBy}
              className="select"
              onChange={this.onChangeOption}
            >
              {sortByOptions.map(each => (
                <option value={each.option} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr width="100%" />
        <ul className="restaurants-ul-container" type="none">
          {restaurantsDetailsList.map(each => (
            <RestaurantsItem key={each.id} itemDetails={each} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            onClick={this.onDecrement}
            className="pagination-btn"
            type="button"
            testid="pagination-left-button"
          >
            <AiFillLeftSquare className="react-icon" />
          </button>
          <p>
            <span className="active-page-no" testid="active-page-number">
              {activePage}
            </span>
            of 20
          </p>
          <button
            onClick={this.onIncrement}
            className="pagination-btn"
            type="button"
            testid="pagination-right-button"
          >
            <AiFillRightSquare className="react-icon" />
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#f7931e" height={50} width={50} />
    </div>
  )

  renderRestaurantsOnApi = () => {
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
    return <> {this.renderRestaurantsOnApi()} </>
  }
}

export default Restaurants
