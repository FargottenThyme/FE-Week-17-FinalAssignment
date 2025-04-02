export function compareDates(dateToCheck: string, currentDate: string): boolean {
    const checkDate = {
        month: parseInt(`${dateToCheck[0] + dateToCheck[1]}`),
        day: parseInt(`${dateToCheck[3] + dateToCheck[4]}`),
        year: parseInt(`${dateToCheck[6] + dateToCheck[7] + dateToCheck[8] + dateToCheck[9]}`)
    }
    const current = {
        month: parseInt(`${currentDate[0] + currentDate[1]}`),
        day: parseInt(`${currentDate[3] + currentDate[4]}`),
        year: parseInt(`${currentDate[6] + currentDate[7] + currentDate[8] + currentDate[9]}`)
    }
    if (checkDate.year < current.year) {
        return true
    } else if (checkDate.year === current.year && checkDate.month < current.month) {
        return true
    } else if (checkDate.year === current.year &&
        checkDate.month === current.month && checkDate.day <= current.day) {
        return true
    }
    return false
}

export function dateObj(date: string) {
    const checkDate = {
        month: parseInt(`${date[0] + date[1]}`),
        day: parseInt(`${date[3] + date[4]}`),
        year: parseInt(`${date[6] + date[7] + date[8] + date[9]}`)
    }
    return checkDate
}