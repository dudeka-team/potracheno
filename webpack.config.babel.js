import path from 'path';
import webpack from 'webpack';

const SOURCE = './source';

const config = {
	entry: `${SOURCE}/scripts/index.js`,
	output: {
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	resolve: {
		root: path.resolve(`${SOURCE}/scripts`),
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
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
