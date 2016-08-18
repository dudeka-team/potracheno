/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

const SOURCE = './source';

const config = {
	entry: `${SOURCE}/scripts/index.jsx`,
	output: {
		filename: 'bundle.js',
	},
	devtool: 'source-map',
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
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
			},
		}),
	],
};

module.exports = config;
