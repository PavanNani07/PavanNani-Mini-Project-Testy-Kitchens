import {Link} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import TestyContext from '../../context/TestyContext'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'
import EmptyCart from '../EmptyCart'
import './index.css'

const Cart = () => (
  <TestyContext.Consumer>
    {value => {
      const {cartsList, onRemoveAll} = value
      const totalAmount = cartsList.reduce(
        (acc, each) => acc + each.cost * each.quantity,
        0,
      )

      const onClickRemoveAllItems = () => {
        onRemoveAll()
      }

      const onClickPlaceOrder = () => {
        onRemoveAll()
      }

      const getCartItemSection = () => (
        <div className="cart-item-details-section">
          <div className="cart-item-section">
            <div className="cart-table-header">
              <p className="table-heading"> Item </p>
              <p className="table-heading"> Quantity </p>
              <p className="price-heading"> Price </p>
              <div className="remove-all-container">
                <button
                  onClick={onClickRemoveAllItems}
                  className="remove-all-btn"
                  type="button"
                >
                  Remove All
                </button>
              </div>
            </div>
            <hr width="100%" />
            <ul type="none" className="cart-ul">
              {cartsList.map(each => (
                <CartItem
                  key={each.id}
                  cartItemDetails={each}
                  testid="cartItem"
                />
              ))}
            </ul>
            <hr width="100%" />
            <div className="order-container">
              <h1 className="order-heading">Order Total:</h1>
              <div className="amount-container">
                <FaRupeeSign />
                <p testid="total-price" className="amount-paragraph">
                  {totalAmount}
                </p>
              </div>
            </div>
            <Link className="place-ord-link" to="/payment">
              <button
                onClick={onClickPlaceOrder}
                className="place-order-btn"
                type="button"
              >
                Place Order
              </button>
            </Link>
          </div>
          <Footer />
        </div>
      )

      const getEmptyCartView = () => <EmptyCart />

      return (
        <div className="cart-page">
          <Header />
          {cartsList.length === 0 ? getEmptyCartView() : getCartItemSection()}
        </div>
      )
    }}
  </TestyContext.Consumer>
)

export default Cart
