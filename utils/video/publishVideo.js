// GOAL: Publish the video with youtube api
// ! set privacyStatus to public
// ! change thumbnails to the ones that FB CREATIONS made

const fs = require("fs")
const path = require("path")
const { get } = require("https")
const { Readable } = require("stream")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2
const { clientId, clientSecret, youtubeToken } = require("../../config.json")
const oauth2Client = new OAuth2(clientId, clientSecret, "http://localhost")


module.exports = async (videoFile, title, description, tags) => {
    const scopes = ["https://www.googleapis.com/auth/youtube.upload"]
    oauth2Client.setCredentials({ refresh_token: youtubeToken })
    const service = google.youtube({
        version: "v3",
        auth: oauth2Client
    });

    const createUrlReadStream = (url) => {
        const readable = new Readable({
            read() { },
        })

        get(url, (response) => {
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

    const res1 = await service.videos.insert({
        part: "snippet,status",
        requestBody: {
            snippet: {
                title: title,
                description: description,
                tags: tags,
                categoryId: 24,
                defaultLanguage: "en",
                defaultAudioLanguage: "en"
            },
            status: {
                privacyStatus: "private"
            },
        },
        media: {
            body: createUrlReadStream(videoFile)
        }
    })

    const res2 = await service.thumbnails.set({
        videoId: res1.data.id,
        media: {
            body: fs.createReadStream(path.resolve(`./assets/thumbnail/thumbnail.jpg`))
        }
    })
}