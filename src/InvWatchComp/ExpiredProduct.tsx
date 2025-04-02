import { compareDates } from "../compareDates"
import { Item } from "../types"
import { DelBtn } from "./DelBtn"

type Props = {
    itemData: Item[]
    isLoading: boolean
    selectedDate: string
}

export default function ExpiredProduct({ itemData, isLoading, selectedDate }: Props) {

    return (
        <>
            {isLoading ? <h3 className="text-white text-center">Loading...</h3> :
                itemData.map((item: Item) => {

                    if (compareDates(item.expireDate, selectedDate)) {

                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.size} oz.</td>
                                <td>$ {item.price}</td>
                                <td>{item.receivedDate}</td>
                                <td>{item.expireDate}</td>
                                <td><DelBtn item={item} itemData={itemData} /></td>
                            </tr>
                        )
                    }
                })}
        </>
    )
}