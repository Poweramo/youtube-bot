import fs from "fs";

export default function () {
	const rawData = fs.readFileSync("./utils/music/musicUsed.json", { encoding: "utf-8" });
	const data = JSON.parse(rawData);

	data.linksMusicUsed = [];
	fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(data), { encoding: "utf-8" });
}
