import { useEffect, useState } from "react";
import { Inventory } from "./types";

export default function InvEnter() {

    // Sets the current date
    const today = new Date();
    const getDateFormat = (d: Date) => {
        const x = d.toISOString();
        const y = x.slice(0, 10);
        return y;
    }
    const now = getDateFormat(today)

    // State objects
    const [inventoryData, setInventoryData] = useState<Inventory[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [updateInventory, setUpdateInventory] = useState<boolean>(false)

    const [selectedProduct, setSelectedProduct] = useState<number>(-1)
    const [selectedExpire, setSelectedExpire] = useState(now)


    // Use effect fetching inventoryData for use in the newItemId
    useEffect(() => {
        const asyncFunction = async () => {
            setIsLoading(true)
            const response = await fetch("http://localhost:3000/inventory")
            const data = await response.json()
            setInventoryData(data)
            setIsLoading(false)
            setUpdateInventory(false)
        }
        asyncFunction()
    }, [updateInventory])

    const newItemId = inventoryData.length

    // Declares the form data for use in the "POST"
    const formData: Inventory = { id: newItemId, productId: selectedProduct, receivedDate: now, expireDate: selectedExpire }

    // When button is clicked, first checks if a product is selected.
    // Next, Posts to the inventory database and alerts a success.
    async function handleClick() {
        if(selectedProduct !== -1) {
            console.log(JSON.stringify(formData))
        console.log(formData)
        await fetch("http://localhost:3000/inventory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        alert(`Added to Inventory!`)
        } else {
            alert("Please Select a Product!");
        }
        
    }

    return (
        <>
            {isLoading ? <h3 className="text-white text-center" style={{height: '100vh', overflow: 'auto' }}>Loading...</h3> :
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
                                                            <select className="form-control text-secondary text-center" value={selectedProduct} id="productSelect"
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
                                                            <input type="date" id="expireSelect" value={selectedExpire} onChange={(e) => setSelectedExpire(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col mx-3 pb-4">
                                                        <div className="form-submit">
                                                            <button type="button" className="btn btn-success border-light rounded-lg mx-1" onClick={handleClick}>Add</button>
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
            }
        </>
    )
}