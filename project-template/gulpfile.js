const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const beautify = require('gulp-jsbeautifier');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
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
const uglify = require('gulp-uglify-es').default;
const webpack = require('webpack-stream');

const config = require('./config.js');

function buildComponentEsModules() {
    return gulp.src(config.build.components.esModules.src)
        //.pipe(named())
        .pipe(webpack({
            mode: 'production',
            devtool: 'none',
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(concat(config.build.components.esModules.filename))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.components.esModules.dest));
}

function buildComponentScripts() {
    return gulp.src(config.build.components.scripts.src)
        .pipe(include())
        .pipe(concat(config.build.components.scripts.filename))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.components.scripts.dest));
}

function buildComponentStyles() {
    return gulp.src(config.build.components.styles.src)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({ overrideBrowserslist: '>0%'}))
        .pipe(concat(config.build.components.styles.filename))
        .pipe(beautify())
        .pipe(gulp.dest(config.build.components.styles.dest));
}

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
        .pipe(changed(config.build.scripts.dest, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(config.build.scripts.dest));
}

function buildEsModules() {
    return gulp.src(config.build.esModules.src)
        .pipe(named())
        .pipe(webpack({
            mode: 'production',
            devtool: 'none',
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(beautify())
        .pipe(changed(config.build.esModules.dest, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(config.build.esModules.dest));
}

function buildScriptsBundle() {
    return gulp.src(config.bundles.scripts.src.concat('null'), { allowEmpty: true })
        .pipe(concat(config.bundles.scripts.filename))
        .pipe(beautify())
        .pipe(gulp.dest(config.bundles.scripts.dest));
}

function buildStyles() {
    return gulp.src(config.build.styles.src)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({ overrideBrowserslist: '>0%'}))
        .pipe(beautify())
        .pipe(changed(config.build.styles.dest, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(config.build.styles.dest));
}

function buildStylesBundle() {
    return gulp.src(config.bundles.styles.src.concat('null'), { allowEmpty: true })
        .pipe(concatCss(config.bundles.styles.filename, { commonBase: config.bundles.styles.dest }))
        .pipe(beautify())
        .pipe(gulp.dest(config.bundles.styles.dest));
}

function buildViews() {
    return gulp.src(config.build.views.src)
        .pipe(nunjucksRender({ path: [config.build.views.folder] }))
        .pipe(beautify())
        .pipe(changed(config.build.views.dest, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(config.build.views.dest));
}

function cleanDist() {
    return del([config.paths.dist + '/**']);
}

function copyStatic() {
    return gulp.src(config.build.static.src)
        .pipe(newer(config.build.static.dest))
        .pipe(gulp.dest(config.build.static.dest));
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
        notify: false,
        server: {
            baseDir: config.paths.dist
        },
        watch: true
    });
}

function watchFiles() {
    gulp.watch(config.watch.esModules, { usePolling: true }, buildEsModules);
    gulp.watch(config.watch.components.esModules, { usePolling: true }, buildComponentEsModules);
    gulp.watch(config.watch.components.styles, { usePolling: true }, buildComponentStyles);
    gulp.watch(config.watch.components.scripts, { usePolling: true }, buildComponentScripts);
    gulp.watch(config.watch.static, { usePolling: true }, copyStatic);
    gulp.watch(config.watch.fonts, { usePolling: true }, buildFonts);
    gulp.watch(config.watch.images, { usePolling: true }, buildImages);
    gulp.watch(config.watch.libraries, { usePolling: true }, buildLibraries);
    gulp.watch(config.watch.scripts, { usePolling: true }, buildScripts);
    gulp.watch(config.watch.styles, { usePolling: true }, buildStyles);
    gulp.watch(config.watch.views, { usePolling: true }, buildViews);
}

exports.build = gulp.series(
    cleanDist,
    gulp.parallel(
        copyStatic,
        buildImages,
        gulp.series(
            gulp.parallel(
                buildFonts,
                buildLibraries,
            ),
            gulp.parallel(
                gulp.series(
                    gulp.parallel(
                        buildStyles,
                        buildComponentStyles,
                    ),
                    buildStylesBundle,
                    minifyStyles
                ),
                gulp.series(
                    gulp.parallel(
                        buildScripts,
                        buildEsModules,
                        buildComponentScripts,
                        buildComponentEsModules
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
