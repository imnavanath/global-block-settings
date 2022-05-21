// Load the default @wordpress/scripts config object
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Use the defaultConfig but replace the entry and output properties
module.exports = {
	...defaultConfig,
	entry: {
		editor: path.resolve(
			__dirname,
			'core/src/Editor.js'
		)
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@Editor': path.resolve( __dirname, 'core/src/' ),
		},
	},
	output: {
		...defaultConfig.output,
		filename: '[name].js',
		path: path.resolve( __dirname, 'assets' ),
	},
};
