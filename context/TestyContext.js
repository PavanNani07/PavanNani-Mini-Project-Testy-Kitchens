import React from 'react'

const TestyContext = React.createContext({
  isHomeTextColorChanged: true,
  onChangeHomeTextColor: () => {},
  isCartTextColorChanged: false,
  onChangeCartTextColor: () => {},
  cartsList: [],
  onAddToCart: () => {},
  onIncreaseQuantity: () => {},
  onDecreaseQuantity: () => {},
  onRemoveAll: () => {},
  onDeleteCartItem: () => {},
})

export default TestyContext
