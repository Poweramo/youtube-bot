// GOAL: Gets a random quote with ninja-api

module.exports = async () => {

    const { quoteApiKey } = require("./config.json")
    const options = { headers: { "X-Api-Key": quoteApiKey } }
    const category = "history"
    const res = await fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, options)
    const data = await res.json()
    const quoteObject = data[0]

    return quoteObject

}
