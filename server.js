// server.js
const fs = require('fs');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
	key: fs.readFileSync('./localhost-key.pem'),
	cert: fs.readFileSync('./localhost-cert.pem'),
};

app.prepare().then(() => {
	https
		.createServer(httpsOptions, (req, res) => {
			handle(req, res);
		})
		.listen(3001, () => {
			console.log('> Ready on https://localhost:3001');
		});
});
