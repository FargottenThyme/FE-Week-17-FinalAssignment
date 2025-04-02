import { useEffect, useState } from "react"
import formatDate from "./formatDate"
import ExpiredProduct from "./InvWatchComp/ExpiredProduct"
import WatchList from "./InvWatchComp/WatchList"
import sortData from "./sortData"
import type { CInvent, Inventory, Product } from "./types"

export default function InvWatchlist() {
    const d = new Date().toISOString()
    const todayDate = formatDate(d.slice(0, 10))

    const [products, setProducts] = useState<Product[]>([])
    const [inventory, setInventory] = useState<Inventory[]>([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/inventory")
                if (!response.ok) {
                    setErrorMessage(response.statusText)
                } else {
                    const data = await response.json()
                    setInventory(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchInventory()

        const fetchProduct = async () => {
            setLoading(true)
            try {

                const response = await fetch("http://localhost:3000/product")
                if (!response.ok) {
                    setErrorMessage(response.statusText)
                } else {
                    const data = await response.json()
                    setProducts(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [])

    const cInventory: CInvent[] = inventory.map((item: Inventory) => {
        const newItem: CInvent = {
            id: item.id,
            productId: item.productId,
            name: products[item.productId]?.name,
            brand: products[item.productId]?.brand,
            size: products[item.productId]?.size_oz,
            price: products[item.productId]?.price,
            receivedDate: formatDate(item.receivedDate),
            expireDate: formatDate(item.expireDate)
        }
        return newItem
    })

    sortData(cInventory, "Expires")

    return (
        <>
            <div className="col-sm-7">
                <div className="card mx-auto border-dark">
                    <div className="card-header bg-dark text-light">
                        <h2 className="text-center">Product Date Watchlist</h2>
                    </div>
                    <div className="card-body bg-secondary"
                        style={{ height: '100vh', overflow: 'auto' }} >
                        {loading ? <h3 className="text-white text-center">Loading...</h3> :
                            <>
                                <table className="table table-striped table-dark table-responsive table-bordered" id="invTable">
                                    <thead>
                                        <tr className="text-white">
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Size {`(oz.)`}</th>
                                            <th scope="col">Price/Unit</th>
                                            <th scope="col">Received</th>
                                            <th scope="col">Expiration</th>
                                            <th scope="col">Remove?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <WatchList cInventory={cInventory} loading={loading} selectedDate={todayDate} />
                                    </tbody>
                                </table>
                                <br />
                                <div className="card card-header rounded bg-dark">
                                    <h3 className="text-center text-bold text-danger">Expired Product</h3>
                                </div>
                                <br />
                                <table className="table table-striped table-dark text-danger table-responsive table-bordered" id="expiredTable">
                                    <thead>
                                        <tr className="text-white">
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Size {`(oz.)`}</th>
                                            <th scope="col">Price/Unit</th>
                                            <th scope="col">Received</th>
                                            <th scope="col">Expiration</th>
                                            <th scope="col">Remove?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ExpiredProduct cInventory={cInventory} loading={loading} selectedDate={todayDate} />
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}