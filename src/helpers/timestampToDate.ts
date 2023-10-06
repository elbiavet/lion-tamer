

export const timestampToDate = (date) =>{
    return new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
}
