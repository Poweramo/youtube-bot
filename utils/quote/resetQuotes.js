import fs from "fs";
import quotesUsed from "./quoteUsed.json" assert { type: "json" };
export default function () {
	quotesUsed.splice(0, quotesUsed.length);
	fs.writeFileSync("./utils/quote/quoteUsed.json", JSON.stringify(quotesUsed), {
		encoding: "utf-8",
	});
}
