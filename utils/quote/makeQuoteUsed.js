import fs from "fs";
import quotesUsed from "./quoteUsed.json" assert { type: "json" };

export default function (quoteObject) {
	quotesUsed.push(quoteObject);
	fs.writeFileSync("./utils/quote/quoteUsed.json", JSON.stringify(quotesUsed), {
		encoding: "utf-8",
	});
}
