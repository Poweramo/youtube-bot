const fs = require("fs")

module.exports = () => {
    const rawData = fs.readFileSync("./quoteUsed.json", { encoding: "utf-8" })
    const data = JSON.parse(rawData)

    rawData.quoteUsed = []
    fs.writeFileSync("./quoteUsed.json", JSON.stringify(rawData), { encoding: "utf-8" })
}