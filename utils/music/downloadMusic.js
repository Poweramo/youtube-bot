// GOAL: Download the music after getting the youtube link
// TODO: Use another website

import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import delay from "../others/delay.js";

export default async function (link) {
	const downloadPath = path.resolve("./assets/music");
	const YtToMp3Website = "https://getv.topsandtees.space/";
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	const client = await page.createCDPSession();

	await page.goto(YtToMp3Website);
	await page.locator(".form-control.z12").fill(link);
	await page.locator(".btn").click();
	await page.locator(".fc-button-label").click();
	await page.locator(".dl-btn.item__download").click();
	await client.send("Page.setDownloadBehavior", {
		behavior: "allow",
		downloadPath: downloadPath,
	});

	const downloadBtn = await page
		.locator(".search-item__download.dl_progress_finished.btn_clck_spec")
		.waitHandle();

	await downloadBtn.click();
	await delay(5000);
	await browser.close();

	const musicFile = fs.readdirSync(downloadPath);
	const musicPath = downloadPath + "\\" + musicFile[0];
	return musicPath;
}
