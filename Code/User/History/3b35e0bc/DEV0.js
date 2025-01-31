setInterval(() => {
	Hari = new Date();
	Hari = Hari.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
	document.getElementById('hari').innerHTML = Hari;
}, 1000);
