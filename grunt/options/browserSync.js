/**
 * Broswer Sync
 */
'use strict';

var config = require('../config');

module.exports = {
	
	browserSync: {	

	        bsFiles: {
	            src : ['public_html/css/**/*.css', 'public_html/js/**/*.js', 'public_html/**/*.html']
	        },
	       options: {
		        proxy: "www.notesapp.co.uk",
                watchTask: true
        	}
	}	
	
};
