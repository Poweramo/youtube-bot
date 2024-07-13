export default  function(time) {
	let timeInSeconds;
	let timeIndexes = time
		.replace("PT", "")
		.replace("H", ",")
		.replace("M", ",")
		.replace("S", "")
		.split(",");
	let hours, minutes, seconds;
	switch (timeIndexes.length) {
		case 3:
			hours = Number(timeIndexes[0]);
			minutes = Number(timeIndexes[1]);
			seconds = Number(timeIndexes[2]);
			timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
			break;
		case 2:
			minutes = Number(timeIndexes[0]);
			seconds = Number(timeIndexes[1]);
			timeInSeconds = minutes * 60 + seconds;
			break;
		case 1:
			seconds = Number(timeIndexes[0]);
			timeInSeconds = seconds;
			break;
	}
	return timeInSeconds;
};
