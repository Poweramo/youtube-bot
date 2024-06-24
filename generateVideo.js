// GOAL: Generate video with assets and adds it to the video folder
// ? check if background works, if not :
// ! downloaded into bg folder => in downloadBg file

const { videoApiKey } = require("./config.json");
const downloadMusic = require("./downloadMusic");
const fs = require("fs")
const path = require("path")

module.exports = async (quote, quoteAuthor, music, background) => {
    const musicFile = await downloadMusic(music)
    const video = {
        comment: "MyProject",
        resolution: "full-hd",
        quality: "high",
        height: 1920,
        width: 1080,
        draft: false,
        scenes: [
            {
                elements: [
                    {
                        type: "image",
                        src: background
                    },
                    {
                        type: "text",
                        text: quote
                    },
                    {
                        type: "text",
                        text: "-" + quoteAuthor
                    },
                    {
                        type: "audio",
                        src: musicFile,
                        duration: 30
                    }
                ]
            }
        ]
    }
    const options = { method: "POST", headers: { "x-api-key": videoApiKey }, body: JSON.stringify(video) }
    const res = await fetch(`https://api.json2video.com/v2/movies`, options)
    console.log(res, res.ok);

}