const fs = require("fs")
const path = require("path")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2
const { driveToken, clientId, clientSecret } = require("../../config.json")
const oauth2Client = new OAuth2(clientId, clientSecret, "http://localhost")

module.exports = (fileId) => {
    oauth2Client.setCredentials({ refresh_token: driveToken })
    const service = google.drive({
        version: "v3",
        auth: oauth2Client
    })

    service.files.delete({
        fileId: fileId
    })
    const file = fs.readdirSync(path.resolve("./assets/music"))
    fs.unlinkSync(path.join(path.resolve("./assets/music"), file[0]))
}