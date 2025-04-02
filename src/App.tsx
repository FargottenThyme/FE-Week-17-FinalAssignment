import { useEffect, useState } from "react"
import type { Product, Inventory } from "./types"

export default function App() {
  const [product, setProduct] = useState<Product[]>( [] )
  const [inventory, setInventory] = useState<Inventory[]>( [] )

  /* const [loading, setLoading] = useState(false)
  *
  *  (into asyncFunction before response)
  *  setLoading(true)
  *  (into asyncFunction after setProduct)
  *  setLoading(false)
  * 
  *  (into return)
  *  { loading ? <p>Loading...</p>} :
  * 
  * 
  * No Response error caught with Try-Catch
  * Bad Resposne error caught with If-Check
  * 
  * 
  */

  // Render without Data, then with Data
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3000/Product")
      const data = await response.json()
      setProduct(data)
    }
    asyncFunction()
  }, [])
  // Runs only once, after the initial render
  // Twice in DEV mode

  return (
    <div>
      App
    </div>
  )
}
