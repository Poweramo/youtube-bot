// GOAL: Gets a random quote with ninja-api

const { quoteApiKey, quoteUsed } = require("./config.json")

module.exports = async () => {
    const options = { headers: { "X-Api-Key": quoteApiKey } }
    const category = "history"
    const res = await fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, options)
    const data = await res.json()
    let quoteObject = data[0]

    const isQuoteUsed = async () => {
        for (let i = 0; i < quoteUsed.length; i++) {
            if (quoteObject.quote === quoteUsed[i].quote) {
                const resTest = await fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, options)
                const dataTest = await resTest.json()
                quoteObject = dataTest[0]

                isQuoteUsed()
            }
        }
    }

    isQuoteUsed()
    return quoteObject
}
