import { Button } from '../../components/common/button'
import { Input } from '../../components/common/input'
import { Range } from '../../components/common/range'

import styles from './styles.module.scss'

import { Link, Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Form } from '@unform/web'
import { ILogin } from '../../global/interfaces'
import { Message } from '../../components/common/message'
import { UsersRepository } from '../../repository/Users'

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [userExist, setUserExist] = useState(false)
  const [invalidUser, setInvalidUser] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = async (data: ILogin) => {
    const user = new UsersRepository()
    const [isValid] = await user.verifiyLogin(data.email, data.password)
    setUserExist(isValid ? true : false)
    setInvalidUser(isValid ? false : true)

    setEmail(data.email)
    isValid && localStorage.setItem('userId', isValid.id.toString());
  }

  return (
    <>
      <div id={styles.loginContainer}>
        <div id={styles.logoContainer}>
          <span>M</span>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            register={register("email")}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            register={register("password")}
            placeholder="Senha"
            required
          />

          <Link to="/signup">Cadastrar-se</Link>
          <Button type="submit" btnName="Entrar"/>
          
          {userExist && <Redirect to={email === 'admin@gmail.com' ? '/admin' : '/'} />}
          {invalidUser && <Message type='error'>Usuário invalido</Message>}
        </Form>
      </div>
      <Range />
    </>
  )
}

export default Login