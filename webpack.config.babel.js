/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
			{
				test: /(\.scss|\.css)$/,
				// eslint-disable-next-line max-len
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('react-toolbox.css', {allChunks: true}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
			},
		}),
	],
};

module.exports = config;
