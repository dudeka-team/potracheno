const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { nodeEnv, isAnalyzeModeEnabled, sourceDir, buildDir } = require('../config');

const config = {
	entry: [
		`${sourceDir}/scripts/index.js`,
		`${sourceDir}/styles/main.styl`,
	],
	output: {
		path: buildDir,
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			`${sourceDir}/scripts`,
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
				test: /\.svg$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					mimetype: 'image/svg+xml',
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(nodeEnv),
		}),
		new HtmlWebpackPlugin({
			template: `${sourceDir}/index.html`,
			hash: true,
			minify: {
				collapseWhitespace: true,
			},
		}),
	],
};

if (isAnalyzeModeEnabled) {
	config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
