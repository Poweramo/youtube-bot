const fs = require("fs")
const { google } = require("googleapis")
const getToken = require("./getToken");
const OAuth2 = google.auth.OAuth2
const tokenDir = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + "/.credentials/";
const tokenPath = tokenDir + "youtube-bot-token.json"


module.exports = (credentials, callback) => {
    const clientSecret = credentials.client_secret;
    const clientId = credentials.client_id;
    const redirectUrl = credentials.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    fs.readFile(tokenPath, (err, token) => {
        if (err) {
            getToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}