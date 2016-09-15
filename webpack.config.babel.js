/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

// extra plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AppCachePlugin from 'appcache-webpack-plugin';

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
	new AppCachePlugin({
		cache: [
			'index.html',
			'bundle.js',
			'moment.min.js',
			'moment.ru.min.js',
			'img/more-actions.svg',
			'img/arrow-back.svg',
			'img/share.svg',
			'img/burger.svg',
			'img/check-active.svg',
			'img/check-inactive.svg',
			'img/purchase.svg',
			'img/actionIcons/calendar.svg',
			'img/actionIcons/pen.svg',
			'img/actionIcons/person.svg',
			'img/actionIcons/purchase.svg',
			'img/actionIcons/exit.svg',
			'img/person-add.svg',
			'img/close.svg',
			'img/info.svg',
			'img/pen.svg',
			'img/purchase.svg',
			'img/exit.svg',
		],
		network: ['*'],
		settings: ['prefer-online'],
		output: 'index.appcache'
	}),
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
				loader: 'style!raw!autoprefixer!stylus',
			},
		],
	},
};

module.exports = config;
