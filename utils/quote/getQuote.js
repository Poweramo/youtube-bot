// GOAL: Gets a random quote with ninja-api

const resetQuotes = require("./resetQuotes")
const { quoteApiKey } = require("../../config.json")
const { quoteUsed } = require("./quoteUsed.json")

module.exports = async () => {
    const options = { headers: { "X-Api-Key": quoteApiKey } }
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", options)
    const data = await res.json()
    let quoteObject = data[0]

    const isQuoteUsed = async () => {
        if (quoteUsed.length === 15) {
            resetQuotes()
        }
        for (let i = 0; i < quoteUsed.length; i++) {
            if (quoteObject.quote === quoteUsed[i].quote) {
                const resTest = await fetch("https://api.api-ninjas.com/v1/quotes", options)
                const dataTest = await resTest.json()
                quoteObject = dataTest[0]

                isQuoteUsed()
            }
        }
    }

    isQuoteUsed()
    return quoteObject
}
