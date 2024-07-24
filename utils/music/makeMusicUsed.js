import fs from "fs";
import musicUsedObject from "./musicUsed.json" assert { type: "json" };

export default function (musicLink) {
	musicUsedObject.linksMusicUsed.push(musicLink);
	fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(musicUsedObject), {
		encoding: "utf-8",
	});
}
