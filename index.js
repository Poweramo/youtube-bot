// ! setinterval 24 hours with the necessary functions
// ! don't forget to clear the usedLinks and quoteUsed arrays when project deploy is ready
// TODO: remove the music file after the video have been generated
// TODO: remove the video file after it's been published 

const getQuote = require("./getQuote");
const useMusic = require("./useMusic");
const makeQuoteUsed = require("./makeQuoteUsed");
const makeMusicUsed = require("./makeMusicUsed");
const generateVideo = require("./generateVideo");
const downloadMusic = require("./downloadMusic");
const fs = require("fs");
const path = require("path");

(async function () {
    const data = await getQuote()
    const musicLink = await useMusic()
    let { quote, author, category } = data
    const background = "https://picsum.photos/1080/1920"

    // makeQuoteUsed(data)
    makeMusicUsed(musicLink)

    generateVideo(quote, author, musicLink, background)

})()







