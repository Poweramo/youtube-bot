import fs from "fs";
import linksMusicUsed from "./musicUsed.json" assert { type: "json" };

export default function () {
	linksMusicUsed.splice(0, linksMusicUsed.length);
	fs.writeFileSync("./utils/music/musicUsed.json", JSON.stringify(linksMusicUsed), {
		encoding: "utf-8",
	});
}
