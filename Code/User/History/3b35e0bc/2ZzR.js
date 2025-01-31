setInterval(() => {
	Hari = new Date();
	Hari = Hari.toLocaleString('id-ID', { day: 'String', hour: 'numeric', minute: 'numeric', second: 'numeric' });
	document.getElementById('jam').innerHTML = Hari;
}, 1000);
