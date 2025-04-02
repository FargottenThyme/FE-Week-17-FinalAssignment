import formatDate from "../formatDate"
import type { Item } from "../types"

type Props = {
    item: Item
    setItemId: (newValue: number) => void
    setIsDisabled: (newValue: boolean) => void
    setSelectedProduct: (newValue: string) => void
    setSelectedReceive: (newValue: string) => void
    setSelectedExpire: (newValue: string) => void
}

export default function TableRow({ item, setItemId, setIsDisabled, setSelectedProduct, setSelectedReceive, setSelectedExpire }: Props) {
    const onClickSelectItem = () => {
        console.log(item)
        setItemId(item.id)
        setSelectedProduct(item.name)
        setSelectedReceive(item.receivedDate)
        setSelectedExpire(item.expireDate)
        setIsDisabled(false)
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.brand}</td>
            <td>{item.size} oz.</td>
            <td>$ {item.price}</td>
            <td>{formatDate(item.receivedDate)}</td>
            <td>{formatDate(item.expireDate)}</td>
            <td><button type="button" className="btn btn-secondary border-dark rounded-lg mx-1"
                onClick={onClickSelectItem}>Edit</button></td>
        </tr>
    )
}