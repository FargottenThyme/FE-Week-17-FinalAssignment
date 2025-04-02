import { dateObj } from "./compareDates";
import { Item } from "./types";

export default function sortData(itemData: Item[], option: string) {
    const itemDataCopy = [...itemData]
    if (option === "Name") {
        itemDataCopy.sort((a, b) => {
            if (a.name !== b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        })
    }
    if (option === "Brand") {
        itemDataCopy.sort((a, b) => {
            if (a.brand !== b.brand) {
                return a.brand.localeCompare(b.brand);
            }
            return 0;
        })
    }
    if (option === "Size") {
        itemDataCopy.sort((a, b) => {
            if(a.size !== b.size) {
                return a.size - b.size;
            }
            if(a.name !== b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        })
    }
    if (option === "Price") {
        itemDataCopy.sort((a, b) => {
            if(a.price !== b.price) {
                return a.price - b.price;
            }
            if(a.name !== b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        })
    }

    if (option === "Received") {
        itemDataCopy.sort((a, b) => {
            let x = dateObj(a.receivedDate)
            let y = dateObj(b.receivedDate)
            if (x.year !== y.year) {
                return x.year - y.year
            } else if (x.year === y.year && x.month !== y.month) {
                return x.month - y.month
            } else if (x.year === y.year &&
                x.month === y.month && x.day !== y.day) {
                return x.day - y.day
            }
            return 0;
        })
    }
    if (option === "Expires") {
        itemDataCopy.sort((a, b) => {
            let x = dateObj(a.expireDate)
            let y = dateObj(b.expireDate)
            if (x.year !== y.year) {
                return x.year - y.year
            } else if (x.year === y.year && x.month !== y.month) {
                return x.month - y.month
            } else if (x.year === y.year &&
                x.month === y.month && x.day !== y.day) {
                return x.day - y.day
            }
            return 0;
        })
    }
    console.log(itemData[0].id)
    console.log(itemDataCopy[0].id)
    return itemDataCopy
}