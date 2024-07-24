import fs from "fs";
import musicUsedObject from "./musicUsed.json" assert { type: "json" };

export default function () {
	musicUsedObject.linksMusicUsed = [];
	fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(musicUsedObject), {
		encoding: "utf-8",
	});
}
