// common
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import plumberErrorHandler from 'gulp-plumber-error-handler';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

// styles
import sass from 'gulp-sass';

// scripts
import webpack from 'webpack-stream';


const SOURCE = './source';
const OUT = './www';

const notStaticDirs = ['styles', 'scripts'];
const staticResourcesSrc = notStaticDirs.map((dir) => `${SOURCE}/!${dir}/**/*`).concat([`${SOURCE}/**/*`]);


function errorHandler(taskName) {
	return {
		errorHandler: plumberErrorHandler(`Error in ${taskName} task`),
	};
}

function flatten(path) {
	path.dirname = '';
	return path;
};

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
		.src(`${SOURCE}/scripts/index.js`)
		.pipe(plumber(errorHandler('compile-scripts')))
		.pipe(webpack(require('./webpack.config.babel')))
		.pipe(gulp.dest(`${OUT}/scripts`));
});

gulp.task('copy-static-files', () => {

	return gulp
		.src(staticResourcesSrc)
		.pipe(plumber(errorHandler('copy-static-files')))
		.pipe(gulp.dest(OUT));
});

gulp.task('default', ['copy-static-files', 'compile-styles', 'compile-scripts'], () => {
	gulp.watch(`${SOURCE}/**/*`, ['copy-static-files']);
	gulp.watch(`${SOURCE}/styles/**/*.sass`, ['compile-styles']);
	gulp.watch(`${SOURCE}/scripts/**/*.js`, ['compile-scripts']);
	gulp.watch(staticResourcesSrc, ['copy-static-files']);
});
