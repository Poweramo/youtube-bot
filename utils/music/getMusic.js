// GOAL: Purpose: gets one video from the channel nocopyrightmusic https://www.youtube.com/@NoCopyrightSounds

const changeTimeToSeconds = require("./changeTimeToSeconds");
const { youtubeApiKey, uploadsId } = require("../../config.json");

module.exports = async () => {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsId}&key=${youtubeApiKey}`)
    const data = await res.json()
    let videos = data.items
    let links = []

    for (let i = 0; i < videos.length; i++) {
        const video = videos[i]; // video.snippet.resourceId.videoId
        const res2 = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${video.snippet.resourceId.videoId}&key=${youtubeApiKey}`)
        const data2 = await res2.json();
        const time = changeTimeToSeconds(data2.items[0].contentDetails.duration)

        if (time > 60 && time < 210) {
            links.push("https://www.youtube.com/watch?v=" + video.snippet.resourceId.videoId)
        }
    }

    return links
}