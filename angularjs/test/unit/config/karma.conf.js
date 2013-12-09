module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../../',
		frameworks: ['jasmine'],
		files: [
			'src/bower_components/angular/angular.js',
			'src/bower_components/angular-mocks/angular-mocks.js',
			'src/js/**/*.js',
			'test/unit/specs/**/*.js'
		],
		autoWatch: false,
		singleRun: true,
		browsers: ['Chrome', 'Firefox']
	});
};
