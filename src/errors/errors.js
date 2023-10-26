export function notFoundError(item) {
    return { message: `Esse ${item} não existe`, name: "notFound" }
}

export function incompleteDataError(message) {
    return { message, name: "incompleteData" }
}