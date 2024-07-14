import fs from "fs";

export default function () {
	const rawData = fs.readFileSync("./utils/others/counter.json", { encoding: "utf-8" });
	const data = JSON.parse(rawData);

	data.counter++;
	fs.writeFileSync("./utils/others/counter.json", JSON.stringify(data), { encoding: "utf-8" });
}
