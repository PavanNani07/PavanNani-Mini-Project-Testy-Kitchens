import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import TestyContext from './context/TestyContext'
import Cart from './components/Cart'
import Payment from './components/Payment'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    cartsList: [],
    isHomeTextColorChanged: true,
    isCartTextColorChanged: false,
  }

  componentDidMount() {
    this.getDataFromLocalStorage()
  }

  saveDataToLocalStorage = () => {
    const {cartsList} = this.state
    const data = JSON.stringify(cartsList)
    localStorage.setItem('cartData', data)
  }

  getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(storedData)
    // console.log(parsedData)
    if (parsedData !== null) {
      this.setState(prevState => ({
        cartsList: [...prevState.cartsList, ...parsedData],
      }))
    }
  }

  onAddToCart = foodItemDetails => {
    // console.log(foodItemDetails)
    const {cartsList} = this.state
    const isItemExist = cartsList.every(each => each.id !== foodItemDetails.id)
    if (isItemExist === true) {
      const newFoodItem = {
        ...foodItemDetails,
        quantity: 1,
      }
      this.setState(
        prevState => ({
          cartsList: [...prevState.cartsList, newFoodItem],
        }),
        this.saveDataToLocalStorage,
      )
    }
  }

  onIncreaseQuantity = cartItemDetails => {
    const {cartsList} = this.state
    const updatedQuantityList = cartsList.map(eachItem => {
      if (eachItem.id === cartItemDetails.id && cartItemDetails.quantity >= 1) {
        return {
          ...cartItemDetails,
          quantity: cartItemDetails.quantity + 1,
        }
      }
      return eachItem
    })

    this.setState({
      cartsList: updatedQuantityList,
    })
  }

  onDecreaseQuantity = cartItemDetails => {
    const {cartsList} = this.state
    const updatedQuantityList = cartsList.map(eachItem => {
      if (eachItem.id === cartItemDetails.id && cartItemDetails.quantity > 1) {
        return {
          ...cartItemDetails,
          quantity: cartItemDetails.quantity - 1,
        }
      }
      return eachItem
    })

    this.setState({
      cartsList: updatedQuantityList,
    })
  }

  onRemoveAll = () => {
    localStorage.removeItem('cartData')
    this.setState({cartsList: []})
  }

  onDeleteCartItem = id => {
    // const {cartsList} = this.state
    const storedData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(storedData)
    const updatedList = parsedData.filter(eachItem => eachItem.id !== id)
    const stringifyData = JSON.stringify(updatedList)
    localStorage.setItem('cartData', stringifyData)

    this.setState({cartsList: updatedList})
  }

  onChangeHomeTextColor = () => {
    this.setState({
      isCartTextColorChanged: false,
      isHomeTextColorChanged: true,
    })
  }

  onChangeCartTextColor = () => {
    this.setState({isCartTextColorChanged: true, isHomeTextColorChanged: false})
  }

  render() {
    const {
      cartsList,
      isHomeTextColorChanged,
      isCartTextColorChanged,
    } = this.state
    return (
      <TestyContext.Provider
        value={{
          onAddToCart: this.onAddToCart,
          cartsList,
          onIncreaseQuantity: this.onIncreaseQuantity,
          onDecreaseQuantity: this.onDecreaseQuantity,
          onRemoveAll: this.onRemoveAll,
          onDeleteCartItem: this.onDeleteCartItem,
          onChangeHomeTextColor: this.onChangeHomeTextColor,
          isHomeTextColorChanged,
          onChangeCartTextColor: this.onChangeCartTextColor,
          isCartTextColorChanged,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <Route component={NotFound} />
        </Switch>
      </TestyContext.Provider>
    )
  }
}

export default App
