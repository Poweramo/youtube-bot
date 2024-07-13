import fs from "fs";

export default function (token) {
	const rawData = fs.readFileSync("./config.json", { enconding: "utf-8" });
	const data = JSON.parse(rawData);

	data.driveToken = token;
	fs.writeFileSync("./config.json", JSON.stringify(data), { encoding: "utf-8" });
}
