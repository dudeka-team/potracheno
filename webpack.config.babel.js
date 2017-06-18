/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const SOURCE_DIR = './source';
const BUILD_DIR = './build';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const config = {
	entry: [
		`${SOURCE_DIR}/scripts/index.js`,
		`${SOURCE_DIR}/styles/main.styl`,
	],
	output: {
		path: path.resolve(__dirname, BUILD_DIR),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.join(__dirname, `${SOURCE_DIR}/scripts`),
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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'postcss-loader',
						'stylus-loader',
					],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('app.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
		}),
		new HtmlWebpackPlugin({
			template: `${SOURCE_DIR}/index.html`,
			hash: true,
			minify: {
				collapseWhitespace: true,
			},
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
