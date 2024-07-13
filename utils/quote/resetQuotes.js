import fs from "fs";

export default function () {
	const rawData = fs.readFileSync("./utils/quote/quoteUsed.json", { encoding: "utf-8" });
	const data = JSON.parse(rawData);

	data.quoteUsed = [];
	fs.writeFileSync("./utils/quote/quoteUsed.json", JSON.stringify(data), { encoding: "utf-8" });
}
