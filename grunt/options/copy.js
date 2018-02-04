/**
 * Copy task
 */
'use strict';

var config = require('../config');

module.exports = {
	build: {
		files: [{
			src: config.js.files,
			dest: config.destDir
		}]
	},
	dev: {
		files: [{
			cwd: 'src/js/plugins/',
			src: '**/*.js',
			dest: 'public_html/js/plugins/',
			expand: true
		}]
	}
	
};
