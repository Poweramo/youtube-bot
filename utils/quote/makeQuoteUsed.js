const fs = require("fs")

module.exports = (quoteObject) => {
    const rawData = fs.readFileSync("./quoteUsed.json", { encoding: "utf-8" })
    const data = JSON.parse(rawData)

    data.quoteUsed.push(quoteObject)
    fs.writeFileSync("./quoteUsed.json", JSON.stringify(data), { encoding: "utf-8" })
}