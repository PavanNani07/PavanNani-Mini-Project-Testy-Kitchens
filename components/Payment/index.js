import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'
import TestyContext from '../../context/TestyContext'

const Payment = () => (
  <TestyContext.Consumer>
    {value => {
      const {onChangeHomeTextColor} = value

      const onClickChangeColor = () => {
        onChangeHomeTextColor()
      }
      return (
        <div className="payment-successful-page">
          <Header />
          <div className="payment-card-container">
            <img
              src="https://res.cloudinary.com/djr2g813p/image/upload/v1684999765/Vector_dtkk1e.png"
              alt="payment"
            />
            <h1 className="payment-heading"> Payment Successful </h1>
            <p className="payment-paragraph">
              Thank you for ordering <br />
              Your payment is successfully completed.
            </p>
            <Link className="go-to-home-link" to="/">
              <button
                onClick={onClickChangeColor}
                className="go-to-home-btn"
                type="button"
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </TestyContext.Consumer>
)

export default Payment
