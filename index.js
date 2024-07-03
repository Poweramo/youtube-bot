// ! setinterval 24 hours with the necessary functions

const fs = require("fs");
const getQuote = require("./utils/quote/getQuote");
const useMusic = require("./utils/music/useMusic");
const makeQuoteUsed = require("./utils/quote/makeQuoteUsed");
const makeMusicUsed = require("./utils/music/makeMusicUsed");
const generateVideo = require("./utils/video/generateVideo");
const publishVideo = require("./utils/video/publishVideo");


(async function () {
    const data = await getQuote()
    const musicLink = await useMusic()
    console.log(musicLink);
    let { quote, author } = data
    const background = "https://picsum.photos/1080/1920"
    const videoLink = await generateVideo(quote, author, musicLink, background)

    makeQuoteUsed(data)
    makeMusicUsed(musicLink)



    publishVideo(videoLink, "Quote #3", "", ["motivation", "inspirational"])


})()








