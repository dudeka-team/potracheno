const path = require('path');
const getPort = require('get-port');
const liveServer = require('live-server');
const cypress = require('cypress');
const cypressConfiguration = require('../cypress.json');

process.on('unhandledRejection', (reason, p) => {
	// eslint-disable-next-line no-console
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

async function run() {
	const uiServerPort = await getPort();

	liveServer.start({
		host: '127.0.0.1',
		port: uiServerPort,
		root: path.resolve(__dirname, '../build'),
		open: false,
		file: 'index.html',
	});

	try {
		const result = await cypress.run({
			...cypressConfiguration,
			config: {
				...(cypressConfiguration.config || {}),
				baseUrl: `http://localhost:${uiServerPort}`,
			},
		});

		if (result.totalFailed === 0) {
			process.exit(0);
		} else {
			process.exit(1);
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		process.exit(1);
	}
}

run();
