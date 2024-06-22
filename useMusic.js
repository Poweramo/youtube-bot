// TODO: when linksMusicUsed is full, clear it "add code obviously" 
// ? if linksMusicUsed.length >= links.length
// ! same for getQuote

const { linksMusicUsed } = require("./config.json")
const getMusic = require("./getMusic")

module.exports = async () => {
    const musicLinks = await getMusic()
    let musictoUse = musicLinks[Math.round(Math.random() * musicLinks.length)]

    const isMusicUsed = () => {
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