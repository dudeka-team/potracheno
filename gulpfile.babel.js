/* eslint-disable import/no-extraneous-dependencies, arrow-body-style */

// common
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import plumberErrorHandler from 'gulp-plumber-error-handler';
import sourcemaps from 'gulp-sourcemaps';
import changed from 'gulp-changed';

// styles
import sass from 'gulp-sass';

// scripts
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';


const SOURCE = './source';
const OUT = './www';


function errorHandler(taskName) {
	return {
		errorHandler: plumberErrorHandler(`Error in ${taskName} task`),
	};
}


gulp.task('compile-styles', () => {
	return gulp
		.src(`${SOURCE}/styles/**/*.sass`)
		.pipe(plumber(errorHandler('compile-styles')))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(`${OUT}/styles`));
});

gulp.task('compile-scripts', () => {
	return gulp
		.src(`${SOURCE}/scripts/index.jsx`)
		.pipe(plumber(errorHandler('compile-scripts')))
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(`${OUT}/scripts`));
});

gulp.task('copy-static-files', () => {
	return gulp
		.src(`${SOURCE}/static/**/*`)
		.pipe(plumber(errorHandler('copy-static-files')))
		.pipe(changed(`${OUT}/static`))
		.pipe(gulp.dest(OUT));
});

gulp.task('copy-markup', () => {
	return gulp
		.src(`${SOURCE}/*.html`)
		.pipe(plumber(errorHandler('copy-markup')))
		.pipe(changed(`${OUT}/static`))
		.pipe(gulp.dest(OUT));
});

gulp.task('default', [
	'copy-static-files',
	'copy-markup',
	'compile-styles',
	'compile-scripts',
], () => {
	gulp.watch(`${SOURCE}/styles/**/*.sass`, ['compile-styles']);
	gulp.watch(`${SOURCE}/scripts/**/*.{js,jsx}`, ['compile-scripts']);
	gulp.watch(`${SOURCE}/static/**/*`, ['copy-static-files']);
	gulp.watch(`${SOURCE}/*.html`, ['copy-markup']);
});
