import fs from "fs";

export default function () {
	const rawData = fs.readFileSync("./utils/video/counter.json", { encoding: "utf-8" });
	const data = JSON.parse(rawData);

	data.counter++;
	fs.writeFileSync("./utils/video/counter.json", JSON.stringify(data), { encoding: "utf-8" });
}
