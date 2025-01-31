// display day hour minutes end sacond di console secara realtime
function displayTime() {
	const now = new Date();
	const day = now.getDate();
	const hour = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	console.log(day, hour, minutes, seconds);
}
setInterval(displayTime, 1000);
