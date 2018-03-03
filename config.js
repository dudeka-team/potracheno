const path = require('path');

module.exports = {
	nodeEnv: process.env.NODE_ENV || 'production',
	isAnalyzeModeEnabled: Boolean(process.env.ANALYZE),
	sourceDir: path.resolve(__dirname, './source'),
	buildDir: path.resolve(__dirname, './build'),
	assetsDir: path.resolve(__dirname, './static'),
};