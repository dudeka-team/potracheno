const webpack = require('webpack');
const merge = require('webpack-merge');
const { devServerPort, assetsDir } = require('../config');
const common = require('./common.config');

module.exports = merge(common, {
	mode: 'development',
	entry: [
		`webpack-dev-server/client?http://localhost:${devServerPort}`,
		'webpack/hot/only-dev-server',
	],
	devtool: 'eval-source-map',
	module: {
		rules: [
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
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		host: 'localhost',
		port: devServerPort,
		historyApiFallback: true,
		hot: true,
		contentBase: assetsDir,
	},
});
