// ! setinterval 24 hours with the necessary functions
// ! don't forget to clear the usedLinks and quoteUsed arrays when project deploy is ready

const getQuote = require("./getQuote");
const useMusic = require("./useMusic");
const makeQuoteUsed = require("./makeQuoteUsed");
const makeMusicUsed = require("./makeMusicUsed");

(async function () {
    const data = await getQuote()
    const musicLink = await useMusic()
    let { quote, author, category } = data


    makeQuoteUsed(data)
    makeMusicUsed(musicLink)
})()







