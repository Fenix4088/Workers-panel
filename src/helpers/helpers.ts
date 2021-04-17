export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru", {
        year: "2-digit",
        month: "2-digit",
        day: "numeric",
    })
}