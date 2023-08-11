import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="empty-cart-sec">
    <div className="empty-cart-card-container">
      <img
        src="https://res.cloudinary.com/djr2g813p/image/upload/v1684911343/cooking_1_z3hajz.png"
        alt="empty cart"
      />
      <h1 className="empty-cart-heading"> No Order Yet! </h1>
      <p className="empty-cart-paragraph">
        Your cart is empty. Add something from the menu.
      </p>
      <Link className="empty-cart-link" to="/">
        <button className="empty-cart-btn" type="button">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)

export default EmptyCart
