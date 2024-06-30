// ! setinterval 24 hours with the necessary functions
// ! don"t forget to clear the usedLinks and quoteUsed arrays when project deploy is ready
// TODO: remove the music file after the video have been generated
// TODO: remove the video file after it"s been published 

const getQuote = require("./utils/quote/getQuote");
const useMusic = require("./utils/music/useMusic");
const makeQuoteUsed = require("./utils/quote/makeQuoteUsed");
const makeMusicUsed = require("./utils/music/makeMusicUsed");
const generateVideo = require("./utils/video/generateVideo");
const authorize = require("./utils/youtube-api/authorize")
const fs = require("fs");
const publishVideo = require("./utils/video/publishVideo");


(async function () {
    const data = await getQuote()
    const musicLink = await useMusic()
    let { quote, author } = data
    const background = "https://picsum.photos/1080/1920"
    const videoLink = await generateVideo(quote, quoteAuthor, musicLink, background)

    makeQuoteUsed(data)
    makeMusicUsed(musicLink)
    fs.readFile("client-secret.json", (err, content) => {
        if (err) {
            console.log("Error loading client secret file: " + err);
            return;
        }
        authorize(JSON.parse(content), (auth) => publishVideo(auth, "https://assets.json2video.com/clients/incvhp9i89/renders/2024-06-27-96988.mp4", "yeah", "it will work", ["motivation", "inspirational"]));
    })
})()








