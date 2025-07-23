export default async function (time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
