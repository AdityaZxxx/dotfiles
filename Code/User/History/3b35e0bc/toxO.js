// display day hour minutes end sacond
function displayTime() {
	const date = new Date();
	const day = date.getDay();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	const dayNameElement = document.getElementById('hari');
	dayNameElement.textContent = dayName[day];
	const hourElement = document.getElementById('jam');
	hourElement.textContent = hour;
	const minuteElement = document.getElementById('menit');
	minuteElement.textContent = minute;
	const secondElement = document.getElementById('detik');
	secondElement.textContent = second;
}
setInterval(displayTime, 1000);
displayTime(); // display time once
