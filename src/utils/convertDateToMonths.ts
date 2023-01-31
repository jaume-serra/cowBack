export const convertDateToMonth = (date: Date) => {
    const today = new Date()
    return today.getMonth() - date.getMonth() + (today.getFullYear()-date.getFullYear())*12
}