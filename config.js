const path = require('path');

const defaultEnv = 'production';

module.exports = {
	defaultEnv,
	nodeEnv: process.env.NODE_ENV || defaultEnv,
	isAnalyzeModeEnabled: Boolean(process.env.ANALYZE),
	devServerPort: process.env.PORT || 8080,
	sourceDir: path.resolve(__dirname, './source'),
	buildDir: path.resolve(__dirname, './build'),
	assetsDir: path.resolve(__dirname, './static'),
};
