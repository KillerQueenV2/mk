import { useState, useEffect } from 'react'
import { Button } from '../../components/common/button'

import styles from './styles.module.scss'

export default function CompletePurchase() {
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')

  function registerPurchase() {
    fetch('http://localhost:5000/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        endereco,
        telefone,
        cidade,
        userId: localStorage.getItem('userId'),
        selectedProductIds: localStorage.getItem('selectedProductIds'),
        selectedProductQtds: localStorage.getItem('selectedProductQtds')
      })
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Informações da sua conta</h2>
        <input
          value={endereco}
          className={styles.customInput}
          type='text'
          name='nome'
          onChange={e => setEndereco(e.target.value)}
          placeholder='Endereço'
          required
        />
        <input
          value={telefone}
          className={styles.customInput}
          type='text'
          name='email'
          onChange={e => setTelefone((e.target.value as string).replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3"))}
          maxLength={13}
          placeholder='Telefone'
          required
        />
        <input
          value={cidade}
          className={styles.customInput}
          type='text'
          name='cidade'
          onChange={e => setCidade(e.target.value)}
          placeholder='Cidade'
          required
        />
        <br />
        <Button
          type='submit'
          btnName='Finalizar compra'
          onClick={() => {
            registerPurchase()
            localStorage.setItem('comprou', 'true');
            (window as any).location.href = '/'
          }}
        />
      </div>
    </div>
  )
}