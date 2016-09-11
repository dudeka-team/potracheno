require('babel-core/register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.babel');

new WebpackDevServer(webpack(config), {
	contentBase: './static',
	publicPath: '',
	hot: true,
}).listen(8080, 'localhost', (err) => {
	if (err) {
		console.error(err);
	}

	console.log('Listening at localhost:8080');
});
