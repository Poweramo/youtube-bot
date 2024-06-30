const fs = require("fs")
const tokenDir = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + "/.credentials/";
const tokenPath = tokenDir + "youtube-bot-token.json"

module.exports = (token) => {
    try {
        fs.mkdirSync(tokenDir);
    } catch (err) {
        if (err.code != "EXIST") {
            throw err;
        }
    }
    fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log("Token stored to " + tokenPath);
    });
}