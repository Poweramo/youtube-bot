// GOAL: Download the music after getting the youtube link

import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import delay from "../others/delay.js";

export default async function (link) {
	const downloadPath = path.resolve("./assets/music");
	const YtToMp3Website = "https://5smp3.com/";
	const browser = await puppeteer.launch({ slowMo: 100 });
	const page = await browser.newPage();
	const client = await page.createCDPSession();

	page.setDefaultTimeout(60000 * 10);
	await page.goto(YtToMp3Website);
	await client.send("Page.setDownloadBehavior", {
		behavior: "allow",
		downloadPath: downloadPath,
	});
	await page.locator("#txt-url.search__input").fill(link);
	await page.locator("#btn-submit.btn-red").click();
	const downloadBtn = await page.waitForSelector(".btn.btn-sm.btn-success");
	await downloadBtn.click();
	await page.waitForSelector("#A_downloadUrl.btn.btn-success");
	await delay(5000);
	await page.locator("#A_downloadUrl.btn.btn-success").click();
	await delay(10000);
	await browser.close();

	const musicFile = fs.readdirSync(downloadPath);
	const musicPath = downloadPath + "\\" + musicFile[0];
	return musicPath;
}
