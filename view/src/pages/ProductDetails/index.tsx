import styles from './styles.module.scss'
import { Layout } from "../../components/layouts"
import { useEffect, useState } from 'react'
import { IProduct } from '../../global/interfaces'
import { RepositoryProduct } from '../../repository/Products'
import { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

const selectedProductIds: number[]  = []
const stored = localStorage.getItem('selectedProductIds')?.split(',').map(Number)
stored && stored[0] !== 0 && stored.forEach(id => selectedProductIds.push(id))

const selectedProductQtds: number[]  = []
const storedQtds = localStorage.getItem('selectedProductQtds')?.split(',').map(Number)
storedQtds && storedQtds[0] !== 0 && storedQtds.forEach(id => selectedProductQtds.push(id))

const ProductDetails = () => {
  const [cart, setCart] = useState<number[]>()
  const [product, setProduct] = useState<IProduct>()
  const [amountOfProduct, setAmountOfProduct] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const repositoryProduct = new RepositoryProduct()

    const getProductById = async () => {
      const productId = Number((window as any).location.pathname.split('/')[2])
      const [product] = await repositoryProduct.getById(productId)
      setProduct(product)
    }

    saveToLocalStorage(selectedProductIds)
    setCart(selectedProductIds)

    getProductById()
  }, [cart])

  async function amountOfProductMiddleware(value: number, productId?: number) {
    const repositoryProduct = new RepositoryProduct()
    if (productId) {
      const [products] = await repositoryProduct.getById(productId)
      value > 0 && value <= products.quantidade && setAmountOfProduct(value)
    }
  }

  function addToCart(e: MouseEvent, id: number) {
    e.preventDefault()
    if (id) {
      selectedProductQtds.push(amountOfProduct)
      selectedProductIds.push(Number(id))
      setCart([...selectedProductIds])
    }
    (window as any).location.reload()
  }

  function removeFromCart(e: MouseEvent, id: number) {
    e.preventDefault()
    if (id) {
      selectedProductQtds.splice(selectedProductIds.indexOf(id), 1)
      selectedProductIds.splice(selectedProductIds.indexOf(id), 1)
      setCart([...selectedProductIds])
    }
    (window as any).location.reload()
  }

  function saveToLocalStorage(Cart: number[]) {
    localStorage.setItem('selectedProductIds', Cart.toString())
    localStorage.setItem('selectedProductQtds', selectedProductQtds.toString())
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.productDetailsCard}>
          <div className={styles.productImage}>
            <img src={product?.image} alt="product name" />
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productName}>
              {product?.title}
            </div>
            <div className={styles.productPrice}>
              {product?.preco}
            </div>
            <Link to='/carrinho'>
              <button
                className={styles.buyBtn}
              >
                Comprar agora
              </button>
            </Link>
            {cart?.indexOf(Number(product?.id)) === -1 ?
            <button
              className={styles.addToCartBtn}
              onClick={e => addToCart(e, Number(product?.id))}
            >
              Adicionar ao carrinho
            </button> :
            <button
              className={styles.removeToCartBtn}
              onClick={e => removeFromCart(e, Number(product?.id))}
            >
              Remover do carrinho
            </button>}
            <label htmlFor='quantidade'>Quantidade:</label>
            <input
              type="number"
              id="quantidade"
              value={amountOfProduct}
              onChange={e => amountOfProductMiddleware(Number(e.target.value), Number(product?.id))}
              placeholder='quantidade'
            />
          </div>
        </div>
        <div className={styles.horizontalRange} />
      </div>
    </Layout>
  )
}

export default ProductDetails