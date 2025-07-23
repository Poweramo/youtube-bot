import fs from "fs";
import linksMusicUsed from "./musicUsed.json" assert { type: "json" };

export default function (musicLink) {
	linksMusicUsed.push(musicLink);
	fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(linksMusicUsed), {
		encoding: "utf-8",
	});
}
