/**
 * Sass
 */
'use strict';

var config = require('../config');

/*
 * Helper
 */
var helper = {};

helper.sassDev = {};
helper.sassDev[config.sass.devDest] = config.sass.src;

helper.sassProd = {};
helper.sassProd[config.sass.dest] = config.sass.src;

module.exports = {

	// For development
	dev: {
		options: {
			unixNewlines: true,
			style: 'expanded'
		},

		files: {                         // Dictionary of files
	        'public_html/css/main.css': 'src/sass/main.scss',
	        'public_html/wordpress/wp-content/themes/dragonfly/css/main.css': 'src/sass/main.scss'   // 'destination': 'source'
	        
	       
	    }
	},

	// For production
	build: {
		options: {
			style: 'compressed',
			banner: config.banner
		},

		files: {                         // Dictionary of files
	        'public_html/css/main.css': 'src/sass/main.scss'     // 'destination': 'source'
	    }
	}
};
