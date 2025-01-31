setInterval(() => {
	Hari = new Date();
	Hari = Hari.toLocaleString('id-ID', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
}, 1000);
