const fs = require("fs")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2
const { driveToken, clientId, clientSecret } = require("../../config.json")
const downloadMusic = require("../music/downloadMusic")
const oauth2Client = new OAuth2(clientId, clientSecret, "http://localhost")

module.exports = async (link) => {

    const music = await downloadMusic(link)
    oauth2Client.setCredentials({ refresh_token: driveToken })

    const service = google.drive({
        version: "v3",
        auth: oauth2Client
    })

    const response1 = await service.files.create({
        uploadType: "media",
        ignoreDefaultVisibility: true,
        includePermissionsForView: "published",
        requestBody: {
            copyRequiresWriterPermission: false,
            writersCanShare: false,
            name: music.name,
            mimeType: "audio/mpeg"
        },
        media: {
            mimeType: "audio/mpeg",
            body: fs.createReadStream(music.path)
        }
    })

    const res2 = await service.permissions.create({
        fileId: response1.data.id,
        requestBody: {
            role: "reader",
            type: "anyone",
        }
    });

    const res3 = await service.files.get({
        fileId: response1.data.id,
        fields: "webViewLink"
    })

    return { id: response1.data.id, link: res3.data.webViewLink }
}

