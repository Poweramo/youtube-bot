// GOAL: Download the music after getting the youtube link

import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import delay from "../others/delay.js";

export default async function (link) {
	const downloadPath = path.resolve("./assets/music");
	const YtToMp3Website = "https://v2.youconvert.net/en/";
	const browser = await puppeteer.launch({ slowMo: 100 });
	const page = await browser.newPage();
	const client = await page.createCDPSession();

	await page.goto(YtToMp3Website);
	await page.locator("#input").fill(link);
	await page.locator("#submit").click();
	await page.locator("#proceed_320").click();
	await client.send("Page.setDownloadBehavior", {
		behavior: "allow",
		downloadPath: downloadPath,
	});
	await page.locator("#mp3link_320").click();
	await delay(5000);
	await browser.close();

	const musicFile = fs.readdirSync(downloadPath);
	const musicPath = downloadPath + "\\" + musicFile[0];
	return musicPath;
}
