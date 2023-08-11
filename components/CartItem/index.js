import './index.css'
import {AiFillMinusSquare, AiFillPlusSquare, AiFillDelete} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import TestyContext from '../../context/TestyContext'

const CartItem = ({cartItemDetails}) => {
  const {id, name, imageUrl, cost, quantity} = cartItemDetails

  return (
    <TestyContext.Consumer>
      {value => {
        const {onIncreaseQuantity, onDecreaseQuantity, onDeleteCartItem} = value

        const onIncrement = () => {
          onIncreaseQuantity(cartItemDetails)
        }

        const onDecrement = () => {
          if (quantity > 1) {
            onDecreaseQuantity(cartItemDetails)
          } else {
            onDeleteCartItem(id)
          }
        }

        return (
          <li className="cart-item">
            <div className="cart-item-details-container" testid="cartItem">
              <div className="cart-item-img-container">
                <img className="cart-img" src={imageUrl} alt={name} />
                <h1 className="cart-heading"> {name} </h1>
              </div>
              <div className="plus-minus-count-container">
                <button
                  testid="decrement-quantity"
                  onClick={onDecrement}
                  type="button"
                  className="minus-btn"
                >
                  <AiFillMinusSquare />
                </button>
                <p testid="item-quantity"> {quantity}</p>
                <button
                  testid="increment-quantity"
                  onClick={onIncrement}
                  type="button"
                  className="plus-btn"
                >
                  <AiFillPlusSquare />
                </button>
              </div>
              <div className="rupees-const-container">
                <FaRupeeSign />
                <p testid="item-price"> {cost * quantity} </p>
              </div>
              <div className="delete-cart-container">
                <button
                  onClick={() => onDeleteCartItem(id)}
                  className="delete-btn"
                  type="button"
                >
                  <AiFillDelete className="delete-icon" />
                </button>
              </div>
            </div>
          </li>
        )
      }}
    </TestyContext.Consumer>
  )
}

export default CartItem
