const { linksMusicUsed } = require("./config.json")
const getMusic = require("./getMusic")

module.exports = async () => {
    const musicLinks = await getMusic()
    console.log(musicLinks);

    let musictoUse = musicLinks[Math.round(Math.random() * musicLinks.length)]



    // isLinkUsed()

    const isMusicUsed = () => {
        for (let j = 0; j < linksMusicUsed.length; j++) {
            const linkMusicUsed = linksMusicUsed[j];
            if (musictoUse === linkMusicUsed) {
                musictoUse = musicLinks[Math.round(Math.random() * musicLinks.length)]
                console.log(musictoUse);
                isMusicUsed()
            }


        }

    }

    isMusicUsed()
    return musictoUse

}