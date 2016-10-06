'use strict';

const gulp = require('gulp');
const args   = require('yargs').argv;
const changed = require('gulp-changed');
const del = require('del');
const livereload = require('gulp-livereload');
const gulpif = require('gulp-if');
const source = './src';
const destination = './dist';
const isDevelopment = args.env === 'development';

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function () {
  return del([
    destination + '/**',
    '!' + destination,
    '!src',
    '!*.*',
  ]);
});


// https://www.npmjs.com/package/gulp-twig
gulp.task('twig', function () {
    const twig = require('gulp-twig');
    return gulp.src(source + '/html/**/*.twig')
    	.pipe(changed(destination))
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest(destination))
        .pipe(livereload({ }));
});

gulp.task('compile', ['twig']);


gulp.task('styles', function () {
	const postcss = require('gulp-postcss');
	const sourcemaps = require('gulp-sourcemaps');
	const cssnano = require('cssnano');
	const utilities = require('postcss-utilities');
	const cssnext = require('postcss-cssnext');
	const imports = require("postcss-import");

	const processors = [
	    imports,
        cssnext({browsers: ['last 2 version']}),
        utilities,
        cssnano
    ];

  	return gulp.src([source + '/css/**/[^_]*.css'])
  		.pipe(changed(destination))
  		.pipe(gulpif(isDevelopment, sourcemaps.init()))
    	.pipe(postcss(processors))
    	.pipe(gulpif(isDevelopment, sourcemaps.write('/maps')))
    	.pipe(gulp.dest(destination + '/css'))
    	.pipe(livereload({ }));
});



gulp.task('watch', function() {
    livereload.listen();
	gulp.watch('./src/html/**/*.twig', ['twig']); 
	gulp.watch('./src/css/**/*.css', ['styles']); 
});


gulp.task('default', ['compile', 'styles']);



/* POSTCSS maybe's

+ https://github.com/maximkoretskiy/postcss-autoreset
+ https://github.com/maximkoretskiy/postcss-initial
+ https://github.com/assetsjs/postcss-assets
+ https://github.com/TrySound/postcss-inline-svg
+ https://github.com/jonathantneal/postcss-write-svg

*/
