import { useState } from 'react'

import { Button } from '../../components/common/button'
import { Input } from '../../components/common/input'
import { Range } from '../../components/common/range'

import styles from './styles.module.scss'

import { Link, Redirect, } from 'react-router-dom'
import { Form } from '@unform/web'
import { useForm } from "react-hook-form"

import { IUser } from '../../global/interfaces'
import { Message } from '../../components/common/message'
import { UsersRepository } from '../../repository/Users'

const Signup: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [emailExist, setEmailExist] = useState(false)
  const [userId, setUserId] = useState(false)

  const onSubmit = async (data: IUser) => {
    const user = new UsersRepository()
    const isEmailExist = await user.verifyIfExist(data.email)
    setEmailExist(isEmailExist)
    const id = isEmailExist ? 0 : await user.post(data.nome, data.email, data.cpf, data.senha)
    setUserId(id ? true : false)
  }

  return (
    <>
      <div id={styles.loginContainer}>
        <div id={styles.logoContainer}>
          <span>M</span>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" name="nome" register={register("nome")} placeholder="Usuário" required />
          <Input type="email" name="email" register={register("email")} placeholder="Email" required />
          <Input type="text" name="cpf" register={register("cpf")} placeholder="CPF" maxLength={14} mask required />
          <Input type="password" name="senha" register={register("senha")}  placeholder="Senha" required />
          <Link to="/login">Fazer login</Link>
          <Button type="submit" btnName="Cadastrar-se"/>
        </Form>
        {emailExist && <Message type="error">Email já cadastrado</Message>}
        {userId && <Redirect to='/login' />}
      </div>
      <Range />
    </>
  )
}

export default Signup