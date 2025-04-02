import { useEffect, useState } from "react"
import ExpiredProduct from "./InvWatchComp/ExpiredProduct"
import WatchList from "./InvWatchComp/WatchList"
import type { Inventory, Item, Product } from "./types"

export default function InvWatchlist() {

    // Sets the current date
    const today = new Date();
    const getDateFormat = (d: Date) => {
        const x = d.toISOString();
        const y = x.slice(0, 10);
        return y;
    }
    const now = getDateFormat(today)

    // State objects
    const [productData, setProductData] = useState<Product[]>([])
    const [inventoryData, setInventoryData] = useState<Inventory[]>([])
    const [itemData, setItemData] = useState<Item[]>([])
    const [selectedDate, setSelectedDate] = useState(now)

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // UseEffects and Arrow Functions
    useEffect(() => { // fetches the Product Data set
        const fetchProduct = async () => {
            try {

                const response = await fetch("http://localhost:3000/product");
                if (!response.ok) {
                    setErrorMessage(response.statusText);
                } else {
                    const data = await response.json();
                    setProductData(data);
                    console.log(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
            // setIsLoading(false)
        }
        fetchProduct();
    }, []);

    useEffect(() => { // fetches the Inventory Data set, when do update is changed
        const fetchInventory = async () => {
            try {
                const response = await fetch("http://localhost:3000/inventory");
                if (!response.ok) {
                    setErrorMessage(response.statusText);
                } else {
                    const data = await response.json();
                    setInventoryData(data);
                    console.log(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
            // setIsLoading(false);
        }
        fetchInventory();
    }, [])

    useEffect(() => { // If error message changes, logs to the console.
        if (errorMessage !== "") {
            console.log(errorMessage);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (inventoryData !== undefined && productData !== undefined) {
            setIsLoading(true)
            const data = inventoryData.map((i) => {
                const item = {
                    id: i.id,
                    productId: i.productId,
                    name: productData[i.productId]?.name,
                    brand: productData[i.productId]?.brand,
                    size: productData[i.productId]?.size_oz,
                    price: productData[i.productId]?.price,
                    receivedDate: i.receivedDate,
                    expireDate: i.expireDate
                }
                return item
            })
            console.log(data)
            setItemData(data);
            setIsLoading(false);
        }
    }, [inventoryData, selectedDate])


    return (
        <>
            <div className="col-sm-7">
                <div className="card mx-auto border-dark">
                    <div className="card-header bg-dark text-light">
                        <h2 className="text-center">Product Date Watchlist</h2>
                    </div>
                    <div className="card-body bg-secondary"
                        style={{ height: '100vh', overflow: 'auto' }} >
                        <label className="text-center text-white h5 me-2">Select Expiration Date to Compare:</label>
                        <input type="date" id="selectDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        {isLoading ? <h3 className="text-white text-center">Loading...</h3> :
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
                                        <WatchList itemData={itemData} isLoading={isLoading} selectedDate={selectedDate} />
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
                                        <ExpiredProduct itemData={itemData} isLoading={isLoading} selectedDate={selectedDate} />
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