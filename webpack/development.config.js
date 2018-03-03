const webpack = require('webpack');
const { assetsDir } = require('../config');
const baseWebpackConfig = require('./base.config');

module.exports = Object.assign({}, baseWebpackConfig, {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
	].concat(baseWebpackConfig.entry),
	devtool: 'source-map',
	module: Object.assign({}, baseWebpackConfig.module, {
		rules: baseWebpackConfig.module.rules.concat([
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'postcss-loader',
					'stylus-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]-[local]-[hash:base64:5]',
						},
					},
					'postcss-loader',
				],
			},
		]),
	}),
	plugins: baseWebpackConfig.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	]),
	devServer: {
		host: 'localhost',
		port: 8080,
		historyApiFallback: true,
		hot: true,
		contentBase: assetsDir,
	},
});
