// GOAL: Download the music after getting the youtube link
// ! Download doesn't work sometimes because of timeout of puppeteer

const puppeteer = require("puppeteer")
const fs = require("fs")
const path = require("path")

module.exports = async (link) => {
    const delay = (time) => {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }



    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const client = await page.target().createCDPSession()
    await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: path.resolve("./assets/music")
    });

    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto("https://savemp3.net/kkbgy/");
    await page.locator(".search--input").fill(link)

    const btn = await page.locator(".track--download.btn--icon.tooltip.download-button")

    await btn.click()
    await delay(60000)
    await browser.close()

    const res = await fs.readdirSync(path.resolve("./assets/music"))
    const musicName = res[0]
    const musicPath = path.join(path.resolve("./assets/music"), res[0])

    return { name: musicName, path: musicPath }
}