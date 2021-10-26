export interface IProduct {
  id: number
  title: string
  image: string
  preco: string
  quantidade: number
}

export interface ILogin {
  user: string
  password: string
}

export interface IUser {
  id: number
  nome: string
  cpf: string
  email: string
  senha: string
}

export interface ILogin {
  email: string
  password: string
}

export interface ISignup extends ILogin {
  email: string
  cpf: string
}