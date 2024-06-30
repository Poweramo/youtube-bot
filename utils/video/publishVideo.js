// GOAL: Publish the video with youtube api (and then deleted from video folder)

const fs = require("fs")
const path = require("path")
const https = require("https")
const { Readable } = require("stream")
const { google } = require("googleapis")
const service = google.youtube("v3");

module.exports = async (auth, videoFile, title, description, tags) => {
    const scopes = ["https://www.googleapis.com/auth/youtube.upload"]

    const createUrlReadStream = (url) => {
        const readable = new Readable({
            read() { },
        })

        https.get(url, (response) => {
            response.on("data", (chunk) => {
                readable.push(chunk)
            })

            response.on("end", () => {
                readable.push(null)
            })
        }).on("error", (error) => {
            readable.emit("error", error)
        })

        return readable
    }

    service.videos.insert({
        auth: auth,
        part: "snippet,status",
        requestBody: {
            snippet: {
                title,
                description,
                tags,
                categoryId: 27,
                defaultLanguage: "en",
                defaultAudioLanguage: "en"
            },
            status: {
                privacyStatus: "private" // ! set to public later
                // TODO: appeal in google dev console for public
            },
        },
        media: {
            body: createUrlReadStream(videoFile)
        },
    }, (err, response) => {
        if (err) {
            console.log("The API returned an error: " + err);
            return;
        }
        console.log(response.data)

        console.log("Video uploaded. Uploading the thumbnail now.")
        service.thumbnails.set({
            auth: auth,
            videoId: response.data.id,
            media: {
                body: fs.createReadStream(path.resolve(`./assets/thumbnail/thumbnail.jpg`)) // ! change it to a stable and good thumbnail
            },
        }, (err, response) => {
            if (err) {
                console.log("The API returned an error: " + err);
                return;
            }
            console.log(response.data)
        })
    });
}