/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

// extra plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import assets from 'postcss-assets';

const SOURCE = './source';
const OUT = './static';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

let entry = [
	`${SOURCE}/scripts/index.js`,
	`${SOURCE}/styles/main.styl`,
];
let devtool = 'source-map';

const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
	}),
	new HtmlWebpackPlugin({
		template: `${SOURCE}/index.html`,
		hash: false,
	}),
	new webpack.HotModuleReplacementPlugin(),
];

if (ENVIRONMENT === 'production') {
	devtool = null;
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
			},
		})
	);
} else {
	entry = [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
	].concat(entry);
}

const config = {
	devtool,
	plugins,
	entry,
	output: {
		path: path.resolve(__dirname, OUT),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		root: path.resolve(`${SOURCE}/scripts`),
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			},
			{
				test: /\.styl$/,
				loader: 'style!raw!postcss!autoprefixer!stylus',
			},
		],
	},
	postcss() {
		return [
			assets({
				loadPaths: ['static/img/'],
			}),
		];
	},
};

module.exports = config;
