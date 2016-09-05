/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

const SOURCE = './source';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
let devtool = 'source-map';

const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
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
}

const config = {
	entry: `${SOURCE}/scripts/index.js`,
	output: {
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
		],
	},
	devtool,
	plugins,
};

module.exports = config;
