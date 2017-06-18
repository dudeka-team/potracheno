/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const SOURCE = './source';
const OUT = './static';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const config = {
	entry: [
		`${SOURCE}/scripts/index.js`,
		`${SOURCE}/styles/main.styl`,
	],
	output: {
		path: path.resolve(__dirname, OUT),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.join(__dirname, `${SOURCE}/scripts`),
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: ['babel-loader'],
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'raw-loader',
					'postcss-loader',
					'stylus-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
		}),
		new HtmlWebpackPlugin({
			template: `${SOURCE}/index.html`,
			hash: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};

if (ENVIRONMENT === 'production') {
	config.plugins.push(
		new UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
			},
			comments: false,
		})
	);
} else {
	config.devtool = 'source-map';
	config.entry = [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
	].concat(config.entry);
}

module.exports = config;
