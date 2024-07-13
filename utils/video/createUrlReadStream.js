import { get } from "https";
import { Readable } from "stream";

export default function (url) {
	const readable = new Readable({
		read() {},
	});

	get(url, (response) => {
		response.on("data", (chunk) => {
			readable.push(chunk);
		});

		response.on("end", () => {
			readable.push(null);
		});
	}).on("error", (error) => {
		readable.emit("error", error);
	});

	return readable;
}
