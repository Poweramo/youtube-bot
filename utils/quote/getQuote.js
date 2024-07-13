// GOAL: Gets a random quote with ninja-api

import config from "../../config.json" assert { type: "json" };
import quoteJson from "./quoteUsed.json" assert { type: "json" };
import resetQuotes from "./resetQuotes.js";

export default async function () {
	const options = { headers: { "X-Api-Key": config.quoteApiKey } };
	const res = await fetch("https://api.api-ninjas.com/v1/quotes", options);
	const data = await res.json();
	let quoteObject = data[0];

	const isQuoteUsed = async () => {
		if (quoteJson.quoteUsed.length === 15) {
			resetQuotes();
		}
		for (let i = 0; i < quoteJson.quoteUsed.length; i++) {
			if (quoteObject.quote === quoteJson.quoteUsed[i].quote) {
				const resTest = await fetch("https://api.api-ninjas.com/v1/quotes", options);
				const dataTest = await resTest.json();
				quoteObject = dataTest[0];

				isQuoteUsed();
			}
		}
	};

	isQuoteUsed();
	return quoteObject;
}
