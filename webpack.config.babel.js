/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';

const SOURCE = './source';

const config = {
	entry: `${SOURCE}/scripts/index.js`,
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
};

module.exports = config;
