/* eslint-disable import/no-extraneous-dependencies, arrow-body-style */

// common
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import plumberErrorHandler from 'gulp-plumber-error-handler';
import sourcemaps from 'gulp-sourcemaps';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

// styles
import stylus from 'gulp-stylus';

// scripts
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';


const bSync = browserSync.create();
const SOURCE = './source';
const OUT = './www';


function errorHandler(taskName) {
	return {
		errorHandler: plumberErrorHandler(`Error in ${taskName} task`),
	};
}

gulp.task('compile-styles', () => {
	return gulp
		.src(`${SOURCE}/styles/main.styl`)
		.pipe(plumber(errorHandler('compile-styles')))
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(autoprefixer({browsers: ['> 1%'], cascade: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(`${OUT}/styles`))
		.pipe(bSync.stream());
});

gulp.task('compile-scripts', () => {
	return gulp
		.src(`${SOURCE}/scripts/index.js`)
		.pipe(plumber(errorHandler('compile-scripts')))
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(OUT));
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

gulp.task('build', [
	'copy-static-files',
	'copy-markup',
	'compile-styles',
	'compile-scripts',
]);

gulp.task('default', ['build'], () => {
	bSync.init({
		server: OUT,
		port: 5000,
	});

	gulp.watch(`${SOURCE}/**/*.styl`, ['compile-styles']);

	gulp
		.watch(`${SOURCE}/scripts/**/*.{js,jsx}`, ['compile-scripts'])
		.on('change', bSync.reload);
	gulp
		.watch(`${SOURCE}/static/**/*`, ['copy-static-files'])
		.on('change', bSync.reload);
	gulp
		.watch(`${SOURCE}/*.html`, ['copy-markup'])
		.on('change', bSync.reload);
});
