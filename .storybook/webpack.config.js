const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, '../source/scripts'),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]-[local]-[hash:base64:5]',
						},
					},
				],
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
};
