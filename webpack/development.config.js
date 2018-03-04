const webpack = require('webpack');
const { devServerPort, assetsDir } = require('../config');
const baseWebpackConfig = require('./base.config');

module.exports = Object.assign({}, baseWebpackConfig, {
	entry: [
		`webpack-dev-server/client?http://localhost:${devServerPort}`,
		'webpack/hot/only-dev-server',
	].concat(baseWebpackConfig.entry),
	devtool: 'eval-source-map',
	module: Object.assign({}, baseWebpackConfig.module, {
		rules: baseWebpackConfig.module.rules.concat([
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
						},
					},
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
							sourceMap: true,
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]-[local]-[hash:base64:5]',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
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
		port: devServerPort,
		historyApiFallback: true,
		hot: true,
		contentBase: assetsDir,
	},
});
