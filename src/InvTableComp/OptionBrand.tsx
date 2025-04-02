import sortData from "../sortData"
import { Item } from "../types"


type Props = {
    option: string
    setOption: (newValue: string) => void
    itemData: Item[]
    setItemData: (newValue: Item[]) => void
    resetUpdater: () => void
}

export default function OptionBrand( { option, setOption, itemData, setItemData, resetUpdater }: Props ) {
    const selectViewOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
        setItemData(sortData(itemData, event.target.value));
        resetUpdater();
    }

    return (
        <div className="text-white">
            <input className="mar-left" type="radio"
                    value="Brand" name="sort" checked={option === "Brand"}
                    onChange={selectViewOption} /> Sort by Brand <br />
        </div>
    )
}