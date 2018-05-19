const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./common.config');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
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
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]-[local]-[hash:base64:5]',
							},
						},
						'postcss-loader',
					],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('app.css'),
	],
});
