// GOAL: Generate video with assets and adds it to the video folder

const { videoApiKey } = require("../../config.json");
const downloadMusic = require("../music/downloadMusic");
const fs = require("fs")
const { Movie, Scene } = require("json2video-sdk")


module.exports = async (quote, quoteAuthor, music, background) => {
    const musicFile = await downloadMusic(music)
    let videoLink;
    let movie = new Movie();

    movie.setAPIKey(videoApiKey)
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
        src: background,
        cache: false
    })
    scene.addElement({
        type: "text",
        text: `${quote}
        - ${quoteAuthor}`,
        cache: false
    }
    )
    scene.addElement({
        type: "audio",
        src: musicFile,
        cache: false
    }
    )
    movie.addScene(scene)

    let render = await movie.render();

    await movie
        .waitToFinish((status) => {
            console.log("Rendering: ", status.movie.status, " / ", status.movie.message);
        })
        .then((status) => {
            console.log("Response: ", status);
            console.log("Movie is ready: ", status.movie.url);
            videoLink = status.movie.url
        })
        .catch((err) => {
            console.log("Error: ", err);
        });

    return videoLink
}