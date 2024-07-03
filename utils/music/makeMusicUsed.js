const fs = require("fs")

module.exports = (musicLink) => {
    const rawData = fs.readFileSync("./utils/music/musicUsed.json", { encoding: "utf-8" })
    const data = JSON.parse(rawData)

    data.linksMusicUsed.push(musicLink)
    fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(data), { encoding: "utf-8" })
}