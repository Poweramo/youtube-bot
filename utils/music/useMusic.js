// FIX: change formula to generate random number between 0 and musicLinks.length

const { linksMusicUsed } = require("./musicUsed.json")
const getMusic = require("./getMusic")
const resetMusics = require("./resetMusics")

module.exports = async () => {
    const musicLinks = await getMusic()
    let musictoUse = musicLinks[Math.round(Math.random() * musicLinks.length)]

    const isMusicUsed = () => {
        if (musicLinks.length === linksMusicUsed.length) {
            resetMusics()
        }
        for (let i = 0; i < linksMusicUsed.length; i++) {
            if (musictoUse === linksMusicUsed[i] || !musictoUse) {
                musictoUse = musicLinks[Math.round(Math.random() * musicLinks.length)]
                isMusicUsed()
            }
        }
    }

    isMusicUsed()
    return musictoUse
}