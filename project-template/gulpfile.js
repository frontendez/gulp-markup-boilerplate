const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const beautify = require('gulp-jsbeautifier');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const include = require('gulp-include');
const named = require('vinyl-named');
const newer = require('gulp-newer');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

const config = require('./config.js');

function buildFonts() {
    return gulp.src(config.build.fonts.src)
        .pipe(newer(config.build.fonts.dest))
        .pipe(gulp.dest(config.build.fonts.dest));
}

function buildImages() {
    return gulp.src(config.build.images.src)
        .pipe(newer(config.build.images.dest))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(config.build.images.dest));
}

function buildLibraries() {
    return gulp.src(config.build.libraries.src)
        .pipe(newer(config.build.libraries.dest))
        .pipe(gulp.dest(config.build.libraries.dest));
}

function buildScripts() {
    return gulp.src(config.build.scripts.src)
        .pipe(include())
        .pipe(beautify())
        .pipe(gulp.dest(config.build.scripts.dest));
}

function buildEsModules() {
    return gulp.src(config.build.scripts.modules.entry)
        //.pipe(named())
        .pipe(webpack({
            mode: 'production',
            devtool: 'none',
            output: config.build.scripts.modules.output
        }))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.scripts.dest));
}

function buildScriptsBundle() {
    return gulp.src(config.bundle.scripts.src.concat('null'), { allowEmpty: true })
        .pipe(concat(config.bundle.scripts.file))
        .pipe(beautify())
        .pipe(gulp.dest(config.bundle.scripts.dest));
}

function buildStyles() {
    return gulp.src(config.build.styles.src)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({ overrideBrowserslist: '>0%'}))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.styles.dest));
}

function buildStylesBundle() {
    return gulp.src(config.bundle.styles.src.concat('null'), { allowEmpty: true })
        .pipe(concatCss(config.bundle.styles.file, { commonBase: config.bundle.styles.dest }))
        .pipe(beautify())
        .pipe(gulp.dest(config.bundle.styles.dest));
}

function buildViews() {
    return gulp.src(config.build.views.src)
        .pipe(nunjucksRender({ path: [config.build.views.folder] }))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.views.dest));
}

function cleanDist() {
    return del(['dist/**']);
}

function copyFiles() {
    return gulp.src(config.build.files.src)
        .pipe(newer(config.build.files.dest))
        .pipe(gulp.dest(config.build.files.dest));
}

function minifyScripts() {
    return gulp.src(config.minify.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(config.minify.scripts.dest));
}

function minifyStyles() {
    return gulp.src(config.minify.styles.src)
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(config.minify.styles.dest));
}

function startServer() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        watch: true,
        notify: false
    });
}

function watchFiles() {
    gulp.watch(config.watch.files, copyFiles);
    gulp.watch(config.watch.fonts, buildFonts);
    gulp.watch(config.watch.images, buildImages);
    gulp.watch(config.watch.libraries, buildLibraries);
    gulp.watch(config.watch.scripts.src, buildScripts);
    gulp.watch(config.watch.scripts.modules, buildEsModules);
    gulp.watch(config.watch.styles, buildStyles);
    gulp.watch(config.watch.views, buildViews);
}

exports.build = gulp.series(
    cleanDist,
    gulp.parallel(
        copyFiles,
        buildImages,
        gulp.series(
            gulp.parallel(
                buildFonts,
                buildLibraries,
            ),
            gulp.parallel(
                gulp.series(
                    buildStyles,
                    buildStylesBundle,
                    minifyStyles
                ),
                gulp.series(
                    gulp.parallel(
                        buildScripts,
                        buildEsModules,
                    ),
                    buildScriptsBundle,
                    minifyScripts
                )
            )
        ),
        buildViews
    )
);
exports.clean = cleanDist;
exports.dev = gulp.parallel(watchFiles, startServer);
exports.watch = watchFiles;
