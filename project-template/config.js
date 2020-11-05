const config = {};

config.bundle = {
  styles: {
    src: [
      'dist/assets/fonts/roboto/roboto.css',
      'dist/assets/libraries/bootstrap-4.5.3/bootstrap.css',
      'dist/assets/styles/main.css',
      'dist/assets/styles/components.css'
    ],
    dest: 'dist/assets/styles',
    file: 'bundle.css'
  },
  scripts: {
    src: [
      'dist/assets/libraries/jquery-3.5.1/jquery-3.5.1.js',
      'dist/assets/libraries/bootstrap-4.5.3/bootstrap.bundle.js',
      'dist/assets/scripts/main.esm.js',
      'dist/assets/scripts/main.js',
      'dist/assets/scripts/components.esm.js',
      'dist/assets/scripts/components.js'
    ],
    dest: 'dist/assets/scripts',
    file: 'bundle.js'
  }
}

config.build = {
  components: {
    scripts: {
      src: [
        'src/components/**/[^_]*.js',
        '!src/components/**/*.esm.js'
      ],
      dest: 'dist/assets/scripts',
      file: 'components.js',
      modules: {
        src: 'src/components/**/[^_]*.esm.js',
        file: 'components.esm.js',
      }
    },
    styles: {
      src: 'src/components/**/[^_]*.scss',
      dest: 'dist/assets/styles',
      file: 'components.css'
    },
  },
  files: {
    src: 'src/static/**/*.*',
    dest: 'dist'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'dist/assets/fonts'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'dist/assets/images'
  },
  libraries: {
    src: 'src/libraries/**/*.*',
    dest: 'dist/assets/libraries'
  },
  scripts: {
    src: [
      'src/scripts/**/[^_]*.js',
      '!src/scripts/**/*.esm.js'
    ],
    dest: 'dist/assets/scripts',
    modules: {
      src: 'src/scripts/**/[^_]*.esm.js',
    }
  },
  styles: {
    src: 'src/styles/**/[^_]*.scss',
    dest: 'dist/assets/styles'
  },
  views: {
    folder: 'src',
    src: 'src/views/**/[^_]*.njk',
    dest: 'dist'
  }
};

config.minify = {
  scripts: {
    src: [
      'dist/assets/**/*.js',
      '!dist/assets/**/*.min.js',
      '!dist/assets/fonts/**/*.js',
      '!dist/assets/libraries/**/*.js'
    ],
    dest: 'dist/assets'
  },
  styles: {
    src: [
      'dist/assets/**/*.css',
      '!dist/assets/**/*.min.css',
      '!dist/assets/fonts/**/*.css',
      '!dist/assets/libraries/**/*.css'
    ],
    dest: 'dist/assets'
  }
};

config.watch = {
  components: {
    scripts: {
      src: [
        'src/components/**/*.js',
        '!src/components/**/*.esm.js',
      ],
      modules: 'src/components/**/*.esm.js'
    },
    styles: 'src/components/**/*.scss'
  },
  files: 'src/static/**/*.*',
  fonts: 'src/fonts/**/*.*',
  images: 'src/images/**/*.*',
  libraries: 'src/libraries/**/*.*',
  scripts: {
    src: [
      'src/scripts/**/*.js',
      '!src/scripts/**/*.esm.js'
    ],
    modules: 'src/scripts/**/*.esm.js'
  },
  styles: 'src/styles/**/*.scss',
  views: [
    'src/components/**/*.njk',
    'src/views/**/*.njk'
  ]
};

module.exports = config;
