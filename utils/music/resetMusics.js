const fs = require("fs")

module.exports = () => {
    const rawData = fs.readFileSync("./musicUsed.json", { encoding: "utf-8" })
    const data = JSON.parse(rawData)

    rawData.linksMusicUsed = []
    fs.writeFileSync("./musicUsed.json", JSON.stringify(rawData), { encoding: "utf-8" })
}