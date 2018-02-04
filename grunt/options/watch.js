/**
 * Watching for changes
 */
'use strict';

var config = require('../config');

module.exports = {
	scss: {
		files: config.sass.files,
		tasks: 'sass:dev'
	},
	
	html: {
		files: ['src/templates/**/*.html', 'pages.json'],
		tasks: 'pages:dev'
	},

	js: {
		files: [config.jsHintFiles],
		tasks: ['jshint']
	},
	
	concat: {
		files: ['src/js/**/*.js'],
		tasks: ['concat:js']
	}
};
