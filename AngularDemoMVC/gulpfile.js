/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var typescript = require('gulp-typescipt');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');

gulp.task('server', function () {
    browser({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('html', function () {
    gulp.src('*.html').pipe(browser.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src('./style/sass/**/*scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest('./release/css'))
        .pipe(browser.reload({ stream: true}));
});

var typescriptProject = typescript.createProject({
    target: 'ES5',
    removeComments: true,
    sortOutput: true,
    out: 'main.js'
});

gulp.task('typescript', function () {
    gulp.src(['./scripts/ts/**/*.ts'])
        .pipe(typescript(typescriptProject))
        .pipe(gulp.dest('.scripts/release/js'))
        .pipe(browser.reload({stream: true}));
});
gulp.task('default', ['html', 'sass', 'typescript', 'server'], function () {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./styles/sass/**/*scss', ['sass']);
    gulp.watch('./scripts/ts/**/*.ts', ['typescript']);
        // place code for your default task here
    });