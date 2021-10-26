import styles from "./styles.module.scss";

import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";

interface CardProps {
  image: string
  title: string
  price: string
  id: number
}

const selectedProductIds: number[]  = []
const stored = localStorage.getItem('selectedProductIds')?.split(',').map(Number)
stored && stored[0] !== 0 && stored.forEach(id => selectedProductIds.push(id))

const selectedProductQtds: number[]  = []
const storedQtds = localStorage.getItem('selectedProductQtds')?.split(',').map(Number)
storedQtds && storedQtds[0] !== 0 && storedQtds.forEach(id => selectedProductQtds.push(id))

export function Card(props: CardProps) {
  const [cart, setCart] = useState<number[]>()
  
  useEffect(() => {
    saveToLocalStorage(selectedProductIds)
    setCart(selectedProductIds)
  }, [cart])

  function addToCart(e: SyntheticEvent, id: number) {
    e.preventDefault()
    selectedProductQtds.push(1)
    selectedProductIds.push(id)
    setCart([...selectedProductIds]);
    (window as any).location.reload()
  }

  function removeFromCart(e: SyntheticEvent, id: number) {
    e.preventDefault()
    selectedProductQtds.splice(selectedProductIds.indexOf(id), 1)
    selectedProductIds.splice(selectedProductIds.indexOf(id), 1)
    setCart([...selectedProductIds]);
    (window as any).location.reload()
  }

  function saveToLocalStorage(Cart: number[]) {
    localStorage.setItem('selectedProductIds', Cart.toString())
    localStorage.setItem('selectedProductQtds', selectedProductQtds.toString())
  }

  return (
    <div className={styles.card}>
      <Link to={`/productDetails/${props.id}`}>
        <div className={styles.productImage}>
          <img src={props.image} alt="product" />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>{props.title}</div>
          <div className={styles.productPrice}>{props.price}</div>
          {cart?.indexOf(props.id) === -1 ?
          <button onClick={e => addToCart(e, props.id)} className={styles.addToCart}>
            <MdAddShoppingCart />
          </button> :
          <button onClick={e => removeFromCart(e, props.id)} className={styles.removeFromCart}>
            <MdRemoveShoppingCart />
          </button>}
        </div>
      </Link>
    </div>
  );
}

