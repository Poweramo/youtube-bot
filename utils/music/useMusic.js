const { linksMusicUsed } = require("./musicUsed.json")
const getMusic = require("./getMusic")
const resetMusics = require("./resetMusics")
const getDriveLink = require("../drive-api/getDriveLink")

module.exports = async () => {
    const musicLinks = await getMusic()
    let musicToUse = musicLinks[Math.floor((Math.random() * musicLinks.length) + 1)]

    const isMusicUsed = () => {
        if (musicLinks.length === linksMusicUsed.length) {
            resetMusics()
        }
        for (let i = 0; i < linksMusicUsed.length; i++) {
            if (musicToUse === linksMusicUsed[i] || !musicToUse) {
                musicToUse = musicLinks[Math.floor(Math.random() * musicLinks.length)]
                isMusicUsed()
            }
        }
    }

    isMusicUsed()
    return musicToUse
}