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
import plumber from 'gulp-plumber';
import {argv as args} from 'yargs'; 
import glob from 'glob';

const sourceDir = './src';
const contentDir = './src/content';
const destinationDir = (args.env === 'development') ? './build' : './dist';
const siteConfig = JSON.parse(fs.readFileSync(`${sourceDir}/config.json`, 'utf-8'));
const siteData = getData();

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', () => {
  return del([
    destinationDir + '/**',
    '!' + destinationDir,
    '!src',
    '!*.*',
  ]);
});

function getData(){
    let data = Object.assign({}, siteConfig);
    let files =  glob.sync(`${contentDir}/**/*.md`, {});

    files.forEach((file) => {
        let fileName = path.basename(file, '.md');
        try {
            let fileSource = fs.readFileSync(file, 'utf-8');
            let fileContent = frontMatter(fileSource);
            let pages = {};
            pages[fileName] = fileContent;
            data = _.extend(data, {pages});
        } catch (err) {}
    })

    _.extend(data, {env: args.env});

    return data;
}

function getPageData(file){
    let pageName = path.basename(file.path, '.twig');
    let { [pageName]: pageContent } = siteData.pages;
    let data = Object.assign({}, siteData, {content: pageContent});

    delete data.pages
    return data;
}

// https://www.npmjs.com/package/gulp-twig
gulp.task('html', () => {
    const twig = require('gulp-twig');

    return gulp.src(`${sourceDir}/html/pages/**/*.twig`)
    	.pipe(changed(destinationDir))
        .pipe(data(getPageData))
        .pipe(plumber())
        .pipe(twig({
            base: `${sourceDir}/html/`
        }))
        .pipe(gulp.dest(destinationDir))
        .pipe(livereload({ }));
});

gulp.task('compile', ['html']);


gulp.task('styles', function () {
	const postcss = require('gulp-postcss');
	const sourcemaps = require('gulp-sourcemaps');
	const cssnano = require('cssnano');
	const utilities = require('postcss-utilities');
	const cssnext = require('postcss-cssnext');
    const easyImports = require("postcss-easy-import");
	const processors = [
	    easyImports({glob: true}),
        cssnext({browsers: ['last 2 version']}),
        utilities,
        cssnano
    ];

  	return gulp.src([`${sourceDir}/css/**/[^_]*.css`])
  		.pipe(changed(destinationDir))
  		.pipe(gulpif(args.env == 'development', sourcemaps.init()))
    	.pipe(postcss(processors))
    	.pipe(gulpif(args.env == 'development', sourcemaps.write('/maps')))
    	.pipe(gulp.dest(destinationDir + '/css'))
    	.pipe(livereload({ }));
});



gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('./gulpfile.babel.js', ['default']); 
	gulp.watch('./src/html/**/*.twig', ['compile']); 
	gulp.watch('./src/css/**/*.css', ['styles']); 
    gulp.watch('./content/**/*md', ['compile']); 
});


gulp.task('default', ['compile', 'styles']);



/* POSTCSS maybe's

+ https://github.com/maximkoretskiy/postcss-autoreset
+ https://github.com/maximkoretskiy/postcss-initial
+ https://github.com/assetsjs/postcss-assets
+ https://github.com/TrySound/postcss-inline-svg
+ https://github.com/jonathantneal/postcss-write-svg

*/
