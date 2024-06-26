// GOAL: Generate video with assets and adds it to the video folder
// ? check if background works, if not :
// ! downloaded into bg folder => in downloadBg file
// ? generate a random string for each movie id

const { videoApiKey, myTemplateId } = require("./config.json");
const downloadMusic = require("./downloadMusic");
const fs = require("fs")
const path = require("path")
const { Movie, Scene } = require("json2video-sdk")


module.exports = async (quote, quoteAuthor, music, background) => {
    const musicFile = await downloadMusic(music)

    let movie = new Movie();
    movie.setAPIKey(videoApiKey)
    movie.set("id", "qehutluogtwrhsr")
    movie.set("cache", false)
    movie.set("draft", false)
    movie.set("height", 1920)
    movie.set("width", 1080)
    movie.set("quality", "high")

    let scene = new Scene();
    scene.set("cache", false)
    scene.set("duration", 30)
    scene.addElement({
        type: "image",
        src: background
    })
    scene.addElement({
        type: "text",
        text: quote
    }
    )
    scene.addElement({
        type: "text",
        text: quoteAuthor
    })
    scene.addElement({
        type: "audio",
        src: musicFile
    })


    movie.addScene(scene)

    let render = await movie.render();
    console.log(render);



}