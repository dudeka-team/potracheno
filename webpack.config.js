const { nodeEnv } = require('./config');

let config;

try {
	// eslint-disable-next-line global-require
	config = require(`./webpack/${nodeEnv}.config`);
} catch (error) {
	console.error(error);
	console.error(`Couldn't find webpack config for ${nodeEnv} environment, using base config as a fallback\n`);
	// eslint-disable-next-line global-require
	config = require('./webpack/base.config');
}

module.exports = config;
