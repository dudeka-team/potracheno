/* eslint-disable import/no-extraneous-dependencies */
const postcssAssets = require('postcss-assets');
const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		postcssAssets({
			loadPaths: ['static/img/'],
		}),
		autoprefixer(),
	],
};
