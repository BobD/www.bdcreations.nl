'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import del from 'del';
import livereload from 'gulp-livereload';
import gulpif from 'gulp-if';
import frontMatter from 'front-matter';
import data from 'gulp-data';
import fs from 'fs';
import path from 'path';
import _ from 'underscore';
import {argv as args} from 'yargs';

const sourceDir = './src';
const contentDir = './content';
const destinationDir = './dist';
const isDevelopment = args.env === 'development';

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', () => {
  return del([
    destinationDir + '/**',
    '!' + destinationDir,
    '!src',
    '!*.*',
  ]);
});

function getContent(file){
    let twigData = {};
    let contentName = path.basename(file.path, '.twig');

    try {
        let dataFiles = fs.readdirSync(`${contentDir}/${contentName}`);
        dataFiles.forEach(function(file){
            let fileData = fs.readFileSync(`${contentDir}/${file}`, 'utf-8');
            let content = frontMatter(fileData);
            twigData = _.extend(twigData, content);
        });
    } catch (err) {} 

     try {
        let fileData = fs.readFileSync(`${contentDir}/${contentName}.md`, 'utf-8');
        let content = frontMatter(fileData);
        twigData = _.extend(twigData, content);
    } catch (err) {}

    return twigData;
}

// https://www.npmjs.com/package/gulp-twig
gulp.task('twig', () => {
    const twig = require('gulp-twig');
    return gulp.src(`${sourceDir}/html/**/*.twig`)
    	.pipe(changed(destinationDir))
        .pipe(data((file) => getContent(file)))
        .pipe(twig())
        .pipe(gulp.dest(destinationDir))
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

  	return gulp.src([`${sourceDir}/css/**/[^_]*.css`])
  		.pipe(changed(destinationDir))
  		.pipe(gulpif(isDevelopment, sourcemaps.init()))
    	.pipe(postcss(processors))
    	.pipe(gulpif(isDevelopment, sourcemaps.write('/maps')))
    	.pipe(gulp.dest(destinationDir + '/css'))
    	.pipe(livereload({ }));
});



gulp.task('watch', () => {
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
