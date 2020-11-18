const config = {};

const paths = {
  dist: 'dist',
  src: 'src'
};

const bundles = {
  styles: {
    src: [
      `${paths.dist}/assets/fonts/roboto/roboto.css`,
      `${paths.dist}/assets/libraries/bootstrap-4.5.3/bootstrap.css`,
      `${paths.dist}/assets/styles/main.css`,
      `${paths.dist}/assets/styles/components.css`
    ],
    dest: `${paths.dist}/assets/styles`,
    filename: 'bundle.css'
  },
  scripts: {
    src: [
      `${paths.dist}/assets/libraries/jquery-3.5.1/jquery.js`,
      `${paths.dist}/assets/libraries/bootstrap-4.5.3/bootstrap.js`,
      `${paths.dist}/assets/scripts/main.esm.js`,
      `${paths.dist}/assets/scripts/main.js`,
      `${paths.dist}/assets/scripts/components.esm.js`,
      `${paths.dist}/assets/scripts/components.js`
    ],
    dest: `${paths.dist}/assets/scripts`,
    filename: 'bundle.js'
  }
};

const build = {
  components: {
    esModules: {
      src: `${paths.src}/components/**/[^_]*.esm.js`,
      dest: `${paths.dist}/assets/scripts`,
      filename: 'components.esm.js'
    },
    scripts: {
      src: `${paths.src}/components/**/!(_*|*.esm).js`,
      dest: `${paths.dist}/assets/scripts`,
      filename: 'components.js'
    },
    styles: {
      src: `${paths.src}/components/**/[^_]*.scss`,
      dest: `${paths.dist}/assets/styles`,
      filename: 'components.css'
    }
  },
  esModules: {
    src: `${paths.src}/scripts/**/[^_]*.esm.js`,
    dest: `${paths.dist}/assets/scripts`
  },
  fonts: {
    src: `${paths.src}/fonts/**/*.*`,
    dest: `${paths.dist}/assets/fonts`
  },
  images: {
    src: `${paths.src}/images/**/*.*`,
    dest: `${paths.dist}/assets/images`
  },
  libraries: {
    src: `${paths.src}/libraries/**/*.*`,
    dest: `${paths.dist}/assets/libraries`
  },
  scripts: {
    src: `${paths.src}/scripts/**/!(_*|*.esm).js`,
    dest: `${paths.dist}/assets/scripts`
  },
  static: {
    src: `${paths.src}/static/**/*.*`,
    dest: paths.dist
  },
  styles: {
    src: `${paths.src}/styles/**/[^_]*.scss`,
    dest: `${paths.dist}/assets/styles`
  },
  views: {
    folder: paths.src,
    src: `${paths.src}/views/**/[^_]*.njk`,
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
  esModules: `${paths.src}/scripts/**/*.esm.js`,
  components: {
    esModules: `${paths.src}/components/**/*.esm.js`,
    scripts: `${paths.src}/components/**/!(*.esm).js`,
    styles: `${paths.src}/components/**/*.scss`
  },
  fonts: `${paths.src}/fonts/**/*.*`,
  images: `${paths.src}/images/**/*.*`,
  libraries: `${paths.src}/libraries/**/*.*`,
  scripts: `${paths.src}/scripts/**/!(*.esm).js`,
  static: `${paths.src}/static/**/*.*`,
  styles: `${paths.src}/styles/**/*.scss`,
  views: [
    `${paths.src}/components/**/*.njk`,
    `${paths.src}/views/**/*.njk`
  ]
};

module.exports = {
  paths: paths,
  bundles: bundles,
  build: build,
  minify: minify,
  watch: watch
};
