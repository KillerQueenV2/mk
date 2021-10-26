import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { IProduct } from '../global/interfaces'

import axios from 'axios'
import ApiURL from '../global/apiURL'

export type ProductsContextType = {
  products: IProduct[]
  setProducts: Dispatch<SetStateAction<IProduct[]>>
  isLoaded: boolean
  setIsLoaded: (state: boolean) => void
}

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  setProducts: text => console.warn('no Product text'),
  isLoaded: false,
  setIsLoaded: (state: boolean) => console.warn('no state set')
})

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const response = await axios(`${ApiURL}/products`)
        const data = response.data
        setProducts(data)
        setIsLoaded(true)
      } catch(e) {
        console.error(e)
      }
    }

    fetchProductsData()
  }, [])
  
  return (
    <ProductsContext.Provider value={{products, setProducts, isLoaded, setIsLoaded}}>
      {children}
    </ProductsContext.Provider>
  )
}