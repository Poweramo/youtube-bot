import readline from "readline";
import storeToken from "./storeToken.js";

export default function (oauth2Client) {
	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/youtube.upload"],
	});

	console.log("Authorize this app by visiting this url: ", authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question("Enter the code from that page here: ", (code) => {
		rl.close();
		oauth2Client.getToken(code, (err, token) => {
			if (err) {
				console.log("Error while trying to retrieve access token", err);
				return;
			}
			oauth2Client.credentials = token;
			storeToken(token);
		});
	});
}
