import fs from "fs";
import { google } from "googleapis";
import config from "../../config.json" assert { type: "json" };
import getToken from "./getToken.js";

export default function () {
	const OAuth2 = google.auth.OAuth2;
	const oauth2Client = new OAuth2(config.clientId, config.clientSecret, config.redirectUrl);
	console.log(oauth2Client);
	fs.readFile("./config.json", "utf-8", (err, data) => {
		if (err) {
			getToken(oauth2Client);
		} else {
			const parsedData = JSON.parse(data);
			const tokenObject = { token: parsedData.driveToken };
			oauth2Client.credentials = tokenObject;
		}
	});
}
