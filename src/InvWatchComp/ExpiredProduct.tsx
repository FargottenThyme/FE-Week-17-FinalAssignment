import { compareDates } from "../compareDates"
import { CInvent } from "../types"
import { DelBtn } from "./DelBtn"

type Props = {
    cInventory: CInvent[]
    loading: boolean
    selectedDate: string
}

export default function ExpiredProduct({ cInventory, loading, selectedDate }: Props) {
    return (
        <>
            {loading ? <h3 className="text-white text-center">Loading...</h3> :
                cInventory.map((item: CInvent) => {

                    if (compareDates(item.expireDate, selectedDate)) {

                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.size} oz.</td>
                                <td>$ {item.price}</td>
                                <td>{item.receivedDate}</td>
                                <td>{item.expireDate}</td>
                                <td><DelBtn item={item} cInventory={cInventory} /></td>
                            </tr>
                        )
                    }
                })}
        </>
    )
}