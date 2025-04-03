import { Inventory, Item } from "../types"


type Props = {
    item: Item
    inventoryData: Inventory[]
    setInventoryData: (newValue: Inventory[]) => void
}

export function DelBtn({ item, inventoryData, setInventoryData }: Props) {
    const onClickDelete = async () => {
        const response = await fetch("http://localhost:3000/inventory/" + item.id, {
            method: "DELETE"
        })
        const temp = [...inventoryData]
        temp.splice(item.id, 1)
        setInventoryData(temp)

    }

    return (
        <button className="btn btn-danger border-dark text-dark rounded-lg mx-1"
            type="button" id={`delBtnFor${item.id}`} onClick={onClickDelete}>Remove</button>
    )
}