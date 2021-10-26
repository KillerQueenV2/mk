import { IUser } from "../../global/interfaces"
import GetUsers from "./getUsers"

export default async function VerifyIfExistUser (username: string, password: string) {
  const users = await GetUsers()
  const foundUser = users.find((user: IUser) => {
    return user.nome.toLowerCase() === username.toLowerCase() && user.senha === password
  })
  
  return foundUser ? true : false
}