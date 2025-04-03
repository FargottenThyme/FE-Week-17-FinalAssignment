import { compareDates } from "../compareDates"
import { Inventory, Item } from "../types"
import { DelBtn } from "./DelBtn"

type Props = {
    itemData: Item[]
    isLoading: boolean
    selectedDate: string
        inventoryData: Inventory[]
        setInventoryData: (newValue: Inventory[]) => void
}

export default function WatchList({ itemData, isLoading, selectedDate, inventoryData, setInventoryData }: Props) {
    return (
        <>
            {isLoading ? <h3 className="text-white text-center">Loading...</h3> : 
                itemData.map((item: Item) => {
                    
                    if (!compareDates(item.expireDate, selectedDate)) {
                    return (
                        <tr key={item.id} >
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.size} oz.</td>
                            <td>$ {item.price}</td>
                            <td>{item.receivedDate}</td>
                            <td>{item.expireDate}</td>
                            <td><DelBtn item={item} inventoryData={inventoryData} setInventoryData={setInventoryData} /></td>
                        </tr>
                    )}
                })}
        </>
    )
}