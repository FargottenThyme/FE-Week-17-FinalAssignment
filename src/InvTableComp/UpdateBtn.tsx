import { Inventory } from "../types"

type Props = {
    formData: Inventory
    isDisabled: boolean
    inventoryData: Inventory[]
    setDoUpdate: (newValue: boolean) => void
    setInventoryData: (newValue: Inventory[]) => void
    resetUpdater: () => void
}

export default function UpdateBtn({ formData, isDisabled, inventoryData, setDoUpdate, setInventoryData, resetUpdater }: Props) {
    const tempData = [...inventoryData]
    const onclickUpdate = () => {
        console.log(JSON.stringify(formData))
        if (formData.productId !== -1) {
            async () => {
                await fetch("http://localhost:3000/inventory/" + formData.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                })
            }
            const updatedInventory = tempData.map(item => {
                if (item.id === formData.id) {
                    return formData
                } else {
                    return item
                }
            })
            setInventoryData(updatedInventory)
            setDoUpdate(true);
            resetUpdater();
            
        }
        
    }

    return (
        <button type="button" className="btn btn-secondary border-dark rounded-lg mx-1"
            id={`updateBtn`} onClick={onclickUpdate} disabled={isDisabled} >Update</button>
    )

}