export async function errorHandler(error, req, res, next) {
    console.log(error)

    if (error.name === "notFound") {
        return res.status(404).send(error.message)
    }

    if (error.name === "incompleteData") {
        return res.status(422).send(error.message)
    }

    return res.sendStatus(500);
}