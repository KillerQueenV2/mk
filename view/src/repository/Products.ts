import { IProduct } from "../global/interfaces";
import BASE_URL from "../global/API";

export class RepositoryProduct {
  private API = `${BASE_URL}/products`

  public getAll (): Promise<IProduct[]> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    return data
  }

  public getById (id: number): Promise<IProduct[]> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    const productById = data.then(product => product.filter((product: IProduct) => product.id === id))
    return productById
  }

  public post (title: string, image: string, preco: string): Promise<number> {
    const response = fetch(this.API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, image, preco })
    })
    const data = response.then(data => data.json())
    const productId = data.then(data => data.id)
    return productId
  }

  public patch (payload: Object) {
    const response = fetch(this.API, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = response.then(data => data.json())
    const productId = data.then(data => data.id)
    return productId
  }

  public verifyIfExist (productName: string): Promise<boolean> {
    const response = fetch(this.API)
    const data = response.then(data => data.json())
    const isExist = data.then(({ email }) => {
      return email.indexOf(productName) !== -1
    })
    return isExist
  }
}