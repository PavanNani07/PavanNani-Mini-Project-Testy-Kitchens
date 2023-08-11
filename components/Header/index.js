import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ImHome} from 'react-icons/im'
import {BsCart4} from 'react-icons/bs'
import {MdLogout} from 'react-icons/md'

import TestyContext from '../../context/TestyContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <TestyContext.Consumer>
      {value => {
        const {
          cartsList,
          onChangeHomeTextColor,
          isHomeTextColorChanged,
          onChangeCartTextColor,
          isCartTextColorChanged,
        } = value

        const onClickChangeColor = () => {
          onChangeHomeTextColor()
        }

        const onClickChangeCartTextColor = () => {
          onChangeCartTextColor()
        }

        return (
          <div className="header-container">
            <div className="header-sub-sec">
              <Link to="/" className="link">
                <div className="header-logo-container">
                  <img
                    alt="website logo"
                    className="header-website-logo"
                    src="https://res.cloudinary.com/djr2g813p/image/upload/v1684482099/Frame_274_elgwxc.jpg"
                  />

                  <h1 className="header-website-heading"> Testy Kitchens </h1>
                </div>
              </Link>
              <ul className="header-ul-container" type="none">
                <Link to="/" className="link">
                  <li
                    onClick={onClickChangeColor}
                    className={
                      isHomeTextColorChanged ? 'color-home-text' : 'home-text'
                    }
                  >
                    Home
                  </li>
                </Link>

                <Link to="/" className="link">
                  <li
                    onClick={onClickChangeColor}
                    className={
                      isHomeTextColorChanged ? 'color-home-icon' : 'home-icon'
                    }
                  >
                    <ImHome />
                  </li>
                </Link>
                <Link to="/cart" className="link">
                  <li
                    onClick={onClickChangeCartTextColor}
                    className={
                      isCartTextColorChanged ? 'color-cart-text' : 'cart-text'
                    }
                  >
                    Cart
                    {cartsList.length >= 1 && (
                      <span className="span-ele"> {cartsList.length} </span>
                    )}
                  </li>
                </Link>
                <Link to="/cart" className="link">
                  <li
                    onClick={onClickChangeCartTextColor}
                    className={
                      isCartTextColorChanged ? 'color-cart-icon' : 'cart-icon'
                    }
                  >
                    <BsCart4 />
                    {cartsList.length >= 1 && (
                      <span className="span-ele"> {cartsList.length} </span>
                    )}
                  </li>
                </Link>
                <li className="logout-btn-container">
                  <button
                    onClick={onClickLogout}
                    type="button"
                    className="button"
                  >
                    Logout
                  </button>
                </li>
                <li className="logout-icon-container">
                  <button type="button" className="logout-icon">
                    <MdLogout />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )
      }}
    </TestyContext.Consumer>
  )
}

export default withRouter(Header)
