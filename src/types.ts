export type Product = {
    id: number
    name: string
    brand: string
    size_oz: number
    price: number
  }

export type Inventory = {
    id: number
    productId: number
    receivedDate: string
    expireDate: string
}

export type Item = {
  id: number
  productId: number
  name: string
  brand: string
  size: number
  price: number
  receivedDate: string
  expireDate: string
}