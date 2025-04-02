import { useEffect, useState } from "react"
import { Inventory, Product } from "./types"
import formatDate from "./formatDate"

export default function InvEnter() {

    const d = new Date().toISOString()
    const todayDate = formatDate(d.slice(0, 10))

    const [products, setProducts] = useState<Product[]>([])
    const [inventory, setInventory] = useState<Inventory[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [selectedProduct, setSelectedProduct] = useState<number>()
    const [selectedExpire, setSelectedExpire] = useState("")


    useEffect(() => {
        const asyncFunction = async () => {
            setLoading(true)
            const response = await fetch("http://localhost:3000/inventory")
            const data = await response.json()
            setInventory(data)
            setLoading(false)
        }
        asyncFunction()
    }, [])

    useEffect(() => {
        const asyncFunction = async () => {
            setLoading(true)
            const response = await fetch("http://localhost:3000/product")
            const data = await response.json()
            setProducts(data)
            setLoading(false)
        }
        asyncFunction()
    }, [])

    return (
        <>
            <div className="col"></div>
            <div className="col-sm-8">
                <div className="card mx-auto rounded border-dark">
                    <div className="card-header bg-dark text-light">
                        <h2 className="text-center">Add Inventory</h2>
                    </div>
                    <div className="card-body bg-secondary" style={{ height: '100vh', overflow: 'auto' }} >
                        <div className="card mx-auto rounded border-dark bg-dark text-white">
                            <div className="row justify-content-center">
                                <div className="col-8">
                                    <form className="m-3">
                                        <div className="form-row justify-content-between text-center h4">
                                            <div className="col mx-3 pb-4">
                                                <div className="form-group">
                                                    <label className="me-2">Product to Add:</label>
                                                    <select className="form-control text-secondary text-center" defaultValue={-1} id="productSelect"
                                                        onChange={(e) => setSelectedProduct(parseInt(e.target.value))}>
                                                        <option value={-1}>---</option>
                                                        <option value={0}>Bologna</option>
                                                        <option value={1}>Chopped Ham</option>
                                                        <option value={2}>Cotto Salami</option>
                                                        <option value={3}>Ham</option>
                                                        <option value={4}>Turkey</option>
                                                        <option value={5}>Roast Beef</option>
                                                        <option value={6}>Hot Dog</option>
                                                        <option value={7}>Beef Hot Dog</option>
                                                        <option value={8}>Bun Length Hot Dog</option>
                                                        <option value={9}>Turkey Hot Dog</option>
                                                        <option value={10}>Hickory Bacon</option>
                                                        <option value={11}>Applewood Bacon</option>
                                                        <option value={12}>Turkey Bacon</option>
                                                        <option value={13}>Mac and Pea Salad</option>
                                                        <option value={14}>Potato Salad</option>
                                                        <option value={15}>Chicken Salad</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col mx-3 pb-4">
                                                <div className="form-group">
                                                    <label className="me-2">Expire Date:</label>
                                                    <input type="date" id="expireSelect" defaultValue={todayDate} onChange={(e) => setSelectedExpire(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col mx-3 pb-4">
                                                <div className="form-submit">
                                                    <button type="button">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </>
    )
}