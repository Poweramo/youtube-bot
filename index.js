// ! setinterval 24 hours with the necessary functions
// TODO: Adding the music links to the { linksMusicUsed } in the config.json (push method doesn't work)

const getMusic = require("./getMusic");
const getQuote = require("./getQuote");
const useMusic = require("./useMusic");
const { linksMusicUsed } = require("./config.json");

(async function () {
    const data = await getQuote()
    let { quote, author, category } = data
    const musicLink = await useMusic()
    console.log("a =" + musicLink);
})()







