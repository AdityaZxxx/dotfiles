let Hari = new Date();

setInterval(() => {
	Hari = new Date();
	document.getElementById('jam').innerHTML = Hari.getHours();
	document.getElementById('menit').innerHTML = Hari.getMinutes();
	document.getElementById('detik').innerHTML = Hari.getSeconds();
}, 1000);
