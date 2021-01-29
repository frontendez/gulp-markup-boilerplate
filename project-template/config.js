const paths = {
    dist: 'dist',
    src: 'src'
};

const useBundle = false;

const bundles = {
    styles: {
        src: [
            `${paths.dist}/assets/fonts/roboto/roboto.css`,
            `${paths.dist}/assets/libraries/bootstrap-4.6.0/bootstrap.css`,
            `${paths.dist}/assets/styles/main.css`
        ],
        dest: `${paths.dist}/assets/styles`,
        filename: 'bundle.css'
    },
    scripts: {
        src: [
            `${paths.dist}/assets/libraries/jquery-3.5.1/jquery.js`,
            `${paths.dist}/assets/libraries/bootstrap-4.6.0/bootstrap.js`,
            `${paths.dist}/assets/scripts/main.esm.js`,
            `${paths.dist}/assets/scripts/main.js`
        ],
        dest: `${paths.dist}/assets/scripts`,
        filename: 'bundle.js'
    }
};

const build = {
    esModules: {
        chunks: `${paths.src}/scripts/__chunks`,
        src: [`${paths.src}/scripts/**/!(__*).esm.js`, `!${paths.src}/scripts/__chunks/**/*.js`],
        dest: `${paths.dist}/assets/scripts`
    },
    fonts: {
        src: `${paths.src}/fonts/!(__*)/**/*.*`,
        dest: `${paths.dist}/assets/fonts`
    },
    images: {
        src: `${paths.src}/images/**/!(__*).*`,
        dest: `${paths.dist}/assets/images`
    },
    libraries: {
        src: `${paths.src}/libraries/!(__*)/**/*.*`,
        dest: `${paths.dist}/assets/libraries`
    },
    scripts: {
        chunks: `${paths.src}/scripts/__chunks`,
        src: [`${paths.src}/scripts/**/!(_*|*.esm).js`, `!${paths.src}/scripts/__chunks/**/*.js`],
        dest: `${paths.dist}/assets/scripts`
    },
    static: {
        src: `${paths.src}/static/**/*.*`,
        dest: paths.dist
    },
    styles: {
        chunks: `${paths.src}/styles/__chunks`,
        src: [`${paths.src}/styles/**/[^_]*.scss`, `!${paths.src}/styles/__chunks/**/*.scss`],
        dest: `${paths.dist}/assets/styles`
    },
    views: {
        chunks: `${paths.src}/views/__chunks`,
        src: [`${paths.src}/views/**/[^_]*.njk`, `!${paths.src}/views/__chunks/**/*.njk`],
        dest: paths.dist
    }
};

const minify = {
    scripts: {
        src: [
            `${paths.dist}/assets/**/!(*.min).js`,
            `!${paths.dist}/assets/@(fonts|libraries)/**/*.js`
        ],
        dest: 'dist/assets'
    },
    styles: {
        src: [
            `${paths.dist}/assets/**/!(*.min).css`,
            `!${paths.dist}/assets/@(fonts|libraries)/**/*.css`
        ],
        dest: `${paths.dist}/assets`
    }
};

const watch = {
    esModules: `${paths.src}/assets/scripts/**/*.esm.js`,
    fonts: `${paths.src}/assets/fonts/**/*.*`,
    images: `${paths.src}/assets/images/**/*.*`,
    libraries: `${paths.src}/assets/libraries/**/*.*`,
    scripts: `${paths.src}/assets/scripts/**/!(*.esm).js`,
    static: `${paths.src}/static/**/*.*`,
    styles: `${paths.src}/styles/**/*.scss`,
    views: `${paths.src}/views/**/*.njk`
};

module.exports = {
    build: build,
    bundles: bundles,
    minify: minify,
    paths: paths,
    useBundle: useBundle,
    watch: watch
};
