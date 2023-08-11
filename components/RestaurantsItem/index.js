/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantsItem = props => {
  const {itemDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = itemDetails
  const {rating, totalReviews} = userRating
  // console.log(itemDetails)
  return (
    <Link className="item-link" to={`/restaurant/${id}`}>
      <li className="list-item">
        <div className="item-container" testid="restaurant-item">
          <img alt="restaurant" className="image" src={imageUrl} />
          <div className="item-text-container">
            <h1 className="item-name"> {name} </h1>
            <p className="cuisine"> {cuisine} </p>
            <div className="rating-container">
              <AiFillStar color="#FFCC00" height="12px" width="12px" />
              <p className="rating">
                {rating} ({totalReviews})
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantsItem
