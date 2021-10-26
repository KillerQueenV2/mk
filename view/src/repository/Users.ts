import { IUser } from "../global/interfaces";
import BASE_URL from "../global/API";

export class UsersRepository {
  private API = `${BASE_URL}/users`

  public getAll (): Promise<IUser[]> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    return data
  }

  public getById (id: number): Promise<IUser[]> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    const userById = data.then(user => user.filter((user: IUser) => user.id === id))
    return userById
  }

  public post (nome: string, email: string, cpf: string, senha: string): Promise<number> {
    const response = fetch(this.API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, cpf, senha })
    })
    const data = response.then(data => data.json())
    const userId = data.then(data => data.id)
    return userId
  }

  public put (payload: Object, id: number) {
    const response = fetch(`${this.API}/${id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = response.then(data => data.json())
    const userId = data.then(data => data.id)
    return userId
  }

  public verifiyLogin (email: string, senha: string): Promise<IUser[]> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    const isValid = data.then(userData => {
      return userData.filter((data: IUser) => {
        return data.email === email.toLowerCase() && data.senha === senha
      })
    })
    return isValid 
  }

  public verifyIfExist (userEmail: string): Promise<boolean> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    const emailList = data.then(responseData => {
      return responseData.map((data: IUser) => data.email)
    })
    const isExist = emailList.then(email => email.indexOf(userEmail) !== -1)
    return isExist
  }
}