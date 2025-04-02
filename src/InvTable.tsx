import { useEffect, useState } from "react"
import OptionBrand from "./InvTableComp/OptionBrand"
import OptionExpireDate from "./InvTableComp/OptionExpireDate"
import OptionName from "./InvTableComp/OptionName"
import OptionPrice from "./InvTableComp/OptionPrice"
import OptionReceiveDate from "./InvTableComp/OptionReceiveDate"
import OptionSize from "./InvTableComp/OptionSize"
import TableRow from "./InvTableComp/TableRow"
import UpdateBtn from "./InvTableComp/UpdateBtn"
import type { Inventory, Item, Product } from "./types"

// Loads the Table and button panel data
export default function InvTable() {

    // Constants and non-state objects
    const today = new Date();
    const getDateFormat = (d: Date) => {
        const x = d.toISOString();
        const y = x.slice(0, 10);
        return y;
    }
    const now = getDateFormat(today)
    // State objects
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
    const [productData, setProductData] = useState<Product[]>([]);
    const [itemData, setItemData] = useState<Item[]>([]);
    const [itemId, setItemId] = useState(-1);

    const [option, setOption] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [doUpdate, setDoUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedProduct, setSelectedProduct] = useState("---");
    const [selectedReceive, setSelectedReceive] = useState(now);
    const [selectedExpire, setSelectedExpire] = useState(now);

    const [isDisabled, setIsDisabled] = useState(true)

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
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
            // setIsLoading(false);
        }
        setDoUpdate(false);
        fetchInventory();
    }, [doUpdate])

    useEffect(() => { // If error message changes, logs to the console.
        if (errorMessage !== "") {
            console.log(errorMessage);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (inventoryData !== undefined || productData !== undefined) {
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
            setItemData(data);
            setIsLoading(false);
        }
    }, [inventoryData])

    const resetUpdater = () => {
        setIsDisabled(true)
        setItemId(-1)
    }

    // tempItemInfo declaration and clarification
    let tempItemInfo: Item = { id: -1, productId: -1, name: "", brand: "", size: -1, price: -1, receivedDate: "", expireDate: "" }
    if (tempItemInfo.id === -1 && itemData !== undefined && itemId !== -1) {
        tempItemInfo = itemData[itemId];
    }

    // Placeholder and Default vars
    const defaultProduct = ((tempItemInfo.name === "") ? "---" : tempItemInfo.name);
    const defaultProductDisplay = ((defaultProduct === "---") ? "---" : `Current: ${defaultProduct}`)
    const defaultReceive = ((tempItemInfo.receivedDate === "") ? now : tempItemInfo.receivedDate);
    const defaultExpire = ((tempItemInfo.expireDate === "") ? now : tempItemInfo.expireDate);
    const findProductId = () => {
        const x = ((selectedProduct === "---") ? undefined : productData.find((product) => product.name === selectedProduct))
        const y = x?.id
        if (y !== undefined) {
            return y
        } else {
            return -1
        }
    }

    // Form select and input data
    const [formData, setFormData] = useState<Inventory>({ id: -1, productId: -1, receivedDate: now, expireDate: now })

    useEffect(() => {
        if (itemId !== -1) {
            setFormData({ id: itemId, productId: findProductId(), receivedDate: selectedReceive, expireDate: selectedExpire });
        }
    }, [itemId])







    // Page render
    return (
        <>
            <div className="col-sm-7">
                <div className="card rounded mx-auto border-dark">
                    <div className="card-header bg-dark text-light">
                        <h2 className="text-center">Current Inventory</h2>
                    </div>
                    <div className="card-body bg-secondary"
                        style={{ height: '100vh', overflow: 'auto' }} >
                        {isLoading ? <h3 className="text-white text-center">Loading...</h3> :
                            <table className="table table-striped table-dark table-responsive table-bordered" id="invTable">
                                <thead className="thead-secondary">
                                    <tr className="text-white">
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Size {`(oz.)`}</th>
                                        <th scope="col">Price/Unit</th>
                                        <th scope="col">Received</th>
                                        <th scope="col">Expiration</th>
                                        <th scope="col">Update?</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    {itemData.map((item) => <TableRow key={`row${item.id}`} item={item} setItemId={setItemId}
                                        setIsDisabled={setIsDisabled} setSelectedProduct={setSelectedProduct} setSelectedReceive={setSelectedReceive} setSelectedExpire={setSelectedExpire} />)}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card border-dark" style={{ height: '100vh', overflow: 'auto' }} >
                    <div className="card-header bg-warning text-dark">
                        <h2 className="text-center">View Options</h2>
                    </div>
                    <div className="card-body bg-secondary">
                        <OptionName option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <OptionBrand option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <OptionSize option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <OptionPrice option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <OptionReceiveDate option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <OptionExpireDate option={option} setOption={setOption} itemData={itemData} setItemData={setItemData} resetUpdater={resetUpdater} />
                        <br />
                        {isLoading ? <h3 className="text-white text-center">Loading...</h3> :
                            <div className="card card-body bg-dark text-white">
                                <form className="m-3">
                                    <div className="form-row justify-content-between text-center h5">
                                        <div className="col mx-3 pb-4">
                                            <div className="form-group">
                                                <label className="me-2">Product to Change:</label>
                                                <select className="form-control text-secondary text-center" defaultValue={defaultProduct} id="productSelect"
                                                    onChange={(e) => setSelectedProduct(e.target.value)} disabled={isDisabled} >
                                                    <option id="placeholder" value={defaultProduct} >{defaultProductDisplay}</option>
                                                    <option value="Bologna">Bologna</option>
                                                    <option value="Chopped Ham">Chopped Ham</option>
                                                    <option value="Cotto Salami">Cotto Salami</option>
                                                    <option value="Ham">Ham</option>
                                                    <option value="Turkey">Turkey</option>
                                                    <option value="Roast Beef">Roast Beef</option>
                                                    <option value="Hot Dog">Hot Dog</option>
                                                    <option value="Beef Hot Dog">Beef Hot Dog</option>
                                                    <option value="Bun Length Hot Dog">Bun Length Hot Dog</option>
                                                    <option value="Turkey Hot Dog">Turkey Hot Dog</option>
                                                    <option value="Hickory Bacon">Hickory Bacon</option>
                                                    <option value="Applewood Bacon">Applewood Bacon</option>
                                                    <option value="Turkey Bacon">Turkey Bacon</option>
                                                    <option value="Mac and Pea Salad">Mac and Pea Salad</option>
                                                    <option value="Potato Salad">Potato Salad</option>
                                                    <option value="Chicken Salad">Chicken Salad</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col mx-3 pb-4">
                                            <div className="form-group">
                                                <label className="me-2">Date Received:</label>
                                                <input key={`receive${itemId}`} type="date" id="receiveSelect" defaultValue={defaultReceive} onChange={(e) => setSelectedReceive(e.target.value)} disabled={isDisabled} />
                                            </div>
                                        </div>
                                        <div className="col mx-3 pb-4">
                                            <div className="form-group">
                                                <label className="me-2">Expiration Date:</label>
                                                <input key={`expire${itemId}`} type="date" id="expireSelect" defaultValue={defaultExpire} onChange={(e) => setSelectedExpire(e.target.value)} disabled={isDisabled} />
                                            </div>
                                        </div>
                                        <div className="col mx-3 pb-4">
                                            <div className="form-group">
                                                <UpdateBtn formData={formData} isDisabled={isDisabled} inventoryData={inventoryData} setDoUpdate={setDoUpdate} setInventoryData={setInventoryData} resetUpdater={resetUpdater} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>

                </div>

            </div>
        </>

    )
}