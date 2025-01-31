// display day hour minutes end sacond
function displayTime() {
	const date = new Date();
	const day = date.getDay();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	console.log(`${dayName[day]} ${hour}:${minute}:${second}`);
}
