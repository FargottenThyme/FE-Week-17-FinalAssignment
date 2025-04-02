import { CInvent } from "../types"


type Props = {
    item: CInvent
    cInventory: CInvent[]
}

export function DelBtn({ item, cInventory }: Props) {
    const onClickDelete = async () => {
        const response = await fetch("http://localhost:3000/inventory/" + item.id, {
            method: "DELETE"
        })
        const temp = [...cInventory]
        const id = temp.indexOf(item)
        temp.splice(id, 1)
        console.log(temp)

    }

    return (
        <button className="btn btn-danger border-dark text-dark rounded-lg mx-1"
            type="button" id={`delBtnFor${item.id}`} onClick={onClickDelete}>Remove</button>
    )
}