setInterval(() => {
	Hari = new Date();
	Hari = Hari.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
	document.getElementById('jam').innerHTML = Hari.getHours();
	document.getElementById('menit').innerHTML = Hari.getMinutes();
	document.getElementById('detik').innerHTML = Hari.getSeconds();
}, 1000);
