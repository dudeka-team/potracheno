const { defaultEnv, nodeEnv } = require('./config');

let config;

try {
	// eslint-disable-next-line global-require
	config = require(`./webpack/${nodeEnv}.config`);
} catch (error) {
	console.error(error);
	console.error(`Couldn't find webpack config for ${nodeEnv} environment, using ${defaultEnv} config as a fallback\n`);
	// eslint-disable-next-line global-require
	config = require(`./webpack/${defaultEnv}.config`);
}

module.exports = config;
