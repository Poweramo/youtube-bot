import fs from "fs";
import quoteUsedObject from "./quoteUsed.json" assert { type: "json" };
export default function () {
	quoteUsedObject.quoteUsed = [];
	fs.writeFileSync("./utils/quote/quoteUsed.json", JSON.stringify(quoteUsedObject), {
		encoding: "utf-8",
	});
}
