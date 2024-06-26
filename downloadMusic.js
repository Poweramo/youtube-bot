// GOAL: Download the music after getting the youtube link

const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const fs = require("fs")
const path = require("path")

module.exports = async (link) => {
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    puppeteer.use(StealthPlugin())

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const client = await page.target().createCDPSession()
    await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: path.resolve("./music")
    });


    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto("https://savemp3.net/qdigs/");
    await page.locator(".search--input").fill(link);

    const btn = await page.waitForSelector(".track--download.btn--icon.tooltip.download-button", { visible: true });

    await btn.click()

    await delay(60000)


    await browser.close()

    const res = await fs.readdirSync(path.resolve("./music"))
    const musicFile = "http://localhost:3000/music/" + res[0]




    return musicFile



}