export default function formatDate(date: string) {
    const day = `${date[8] + date[9]}`
    const month = `${date[5] + date[6]}`
    const year = `${date[0] + date[1] + date[2] + date[3]}`
  
    return `${month}/${day}/${year}`;
  }