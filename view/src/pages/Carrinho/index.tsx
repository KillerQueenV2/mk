import { useEffect, useState } from 'react'
import { IProduct } from '../../global/interfaces'
import { RepositoryProduct } from '../../repository/Products'
import styles from './styles.module.scss'
import { Button } from '../../components/common/button'
import { Link } from 'react-router-dom'

export default function Carrinho() {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>()
  const productsId = localStorage.getItem('selectedProductIds')?.split(',').map(Number)

  useEffect(() => {
    async function getProduct() {
      const product = new RepositoryProduct()
      const products = await product.getAll()
      const selectedProducts = productsId?.map(id => {
        const [product] = products.filter(product => product.id === id)
        return product
      })
      setSelectedProducts(selectedProducts)
    }

    getProduct()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preco</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts?.map(product => (
              <tr key={Math.random() * product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={localStorage.getItem('userId') ? '/carrinho/finalizar-compra' : '/login'}>
          <Button type='button' btnName='Confirmar compra' />
        </Link>
      </div>
    </div>
  )
}