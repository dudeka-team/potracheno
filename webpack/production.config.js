const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./base.config');

module.exports = {
	...baseWebpackConfig,
	module: {
		...baseWebpackConfig.module,
		rules: [
			...baseWebpackConfig.module.rules,
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
		...baseWebpackConfig.plugins,
		new ExtractTextPlugin('app.css'),
		new UglifyJsPlugin(),
	],
};
