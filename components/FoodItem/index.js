/* eslint-disable react/no-unknown-property */
import {FaRupeeSign} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import {BsPatchPlus, BsPatchMinus} from 'react-icons/bs'

import TestyContext from '../../context/TestyContext'

import './index.css'

const FoodItem = props => {
  const {
    foodItemDetails,
    onIncreaseFIQuantity,
    onDecreaseFIQuantity,
    onDisplayQBar,
  } = props
  const {name, imageUrl, cost, rating, quantity} = foodItemDetails

  return (
    <TestyContext.Consumer>
      {value => {
        const {
          onAddToCart,
          onIncreaseQuantity,
          onDecreaseQuantity,
          onDeleteCartItem,
        } = value

        const onClickAddToCart = () => {
          onAddToCart(foodItemDetails)
          onDisplayQBar(foodItemDetails)
        }
        const onIncrement = () => {
          onIncreaseFIQuantity(foodItemDetails)
          onIncreaseQuantity(foodItemDetails)
        }

        const onDecrement = () => {
          if (foodItemDetails.quantity === 1) {
            onDeleteCartItem(foodItemDetails.id)
            onDecreaseFIQuantity(foodItemDetails)
          } else {
            onDecreaseFIQuantity(foodItemDetails)
            onDecreaseQuantity(foodItemDetails)
          }
        }
        const renderQuantityBar = () => (
          <div className="quantity-bar">
            <button
              testid="decrement-count"
              className="fi-minus-btn"
              onClick={onDecrement}
              type="button"
            >
              <BsPatchMinus className="fi-ai-icon" />
            </button>
            <p className="active-count-text" testid="active-count">
              {quantity}
            </p>
            <button
              testid="increment-count"
              className="fi-plus-btn"
              onClick={onIncrement}
              type="button"
            >
              <BsPatchPlus className="fi-ai-icon" />
            </button>
          </div>
        )

        return (
          <li className="food-item-card" testid="foodItem">
            <div className="food-item-container">
              <img className="food-img" src={imageUrl} alt={name} />
              <div className="food-item-text-container">
                <h1 className="food-item-heading"> {name} </h1>
                <div className="food-item-cost-container">
                  <FaRupeeSign />
                  <p> {cost} </p>
                </div>
                <div className="food-item-star-container">
                  <AiFillStar className="fi-star" color="#FFCC00" />
                  <p className="fi-rating-text"> {rating} </p>
                </div>
                {quantity >= 1 ? (
                  renderQuantityBar()
                ) : (
                  <button
                    onClick={onClickAddToCart}
                    className="add-btn"
                    type="button"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      }}
    </TestyContext.Consumer>
  )
}

export default FoodItem
