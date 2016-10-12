'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
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
import slug from 'slug';

const sourceDir = './src';
const contentDir = './src/content';
const destinationDir = (args.env === 'development') ? './build' : './dist';
const siteConfig = getConfig();
const siteData = getData();


function getConfig(){
    let config = JSON.parse(fs.readFileSync(`${sourceDir}/config.json`, 'utf-8'));

    config.navigation.forEach((item) => {
        item.id = slug(item.label, {lower:true});
    });

    config.projects.forEach((item) => {
        item.id = slug(item.label, {lower:true});
    });
    
    return config;
}

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


// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', () => {
  return del([
    destinationDir + '/**',
    '!' + destinationDir,
    '!src',
    '!*.*',
  ]);
});

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
    // https://ismamz.github.io/postcss-utilities/docs
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
    
    watch('./src/html/pages/**/*.twig', batch(function (events, done) {
        gulp.start('compile', done);
    }));

    watch('./src/css/**/*.css', batch(function (events, done) {
        gulp.start('styles', done);
    }));

    watch('./src/content/**/*.md', batch(function (events, done) {
        gulp.start('compile', done);
    }));
});


gulp.task('default', ['compile', 'styles']);



/* POSTCSS maybe's

+ https://github.com/maximkoretskiy/postcss-autoreset
+ https://github.com/maximkoretskiy/postcss-initial
+ https://github.com/assetsjs/postcss-assets
+ https://github.com/TrySound/postcss-inline-svg
+ https://github.com/jonathantneal/postcss-write-svg

*/
