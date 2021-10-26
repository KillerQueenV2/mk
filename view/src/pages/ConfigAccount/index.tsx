import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '../../components/common/button'
import { UsersRepository } from '../../repository/Users'

import styles from './styles.module.scss'

export default function ConfigAccount() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  
  const userId = Number(localStorage.getItem('userId'))
  const [changedData, setChangedData] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = new UsersRepository()
      const [getUser] = await user.getById(userId)

      setNome(getUser.nome)
      setEmail(getUser.email)
      setCpf(getUser.cpf)
      setSenha(getUser.senha)
    }
    getCurrentUser()
  }, [userId])

  function updateUserdata() {
    const user = new UsersRepository()
    user.put({ nome, email, cpf, senha }, userId).then(userId => {
      setChangedData(userId ? true : false)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Informações da sua conta</h2>
        <input
          value={nome}
          className={styles.customInput}
          type='text'
          name='nome'
          onChange={e => setNome(e.target.value)}
          placeholder='Nome'
        />
        <input
          value={email}
          className={styles.customInput}
          type='email'
          name='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          value={cpf}
          className={styles.customInput}
          type='text'
          name='cpf'
          onChange={e => setCpf(e.target.value)}
          placeholder='CPF'
        />
        <input
          value={senha}
          className={styles.customInput}
          type='text'
          name='senha'
          onChange={e => setSenha(e.target.value)}
          placeholder='Nova senha'
        />
        <br />
        <Button
          type='button'
          btnName='Salvar'
          onClick={updateUserdata}
        />
        {changedData && <Redirect to='/' />}
      </div>
    </div>
  )
}