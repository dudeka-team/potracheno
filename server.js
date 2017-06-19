/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.babel');

new WebpackDevServer(webpack(config), {
	contentBase: './build',
	publicPath: '',
	hot: true,
	historyApiFallback: true,
}).listen(8080, 'localhost', (error) => {
	if (error) {
		console.error(error);
	}

	console.log('Listening at http://localhost:8080');
});
