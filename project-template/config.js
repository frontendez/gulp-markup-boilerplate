let config = {};

config.bundle = {
  styles: {
    src: [
      'dist/assets/fonts/roboto/roboto.css',
      'dist/assets/libraries/bootstrap-4.5.2/bootstrap.css',
      'dist/assets/libraries/fontawesome-free-5.14.0-web/css/all.css',
      'dist/assets/styles/main.css'
    ],
    dest: 'dist/assets/styles',
    file: 'bundle.css'
  },
  scripts: {
    src: [
      'dist/assets/libraries/jquery-3.5.1/jquery-3.5.1.js',
      'dist/assets/libraries/bootstrap-4.5.2/bootstrap.bundle.js',
      'dist/assets/scripts/main.js',
      'dist/assets/scripts/es-modules-bundle.js'
    ],
    dest: 'dist/assets/scripts',
    file: 'bundle.js'
  }
}

config.build = {
  files: {
    src: 'src/files/**/*.*',
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
      'src/scripts/entry/**/*.js',
      '!src/scripts/entry/**/*.mod.js'
    ],
    esModules: {
      entry: 'src/scripts/entry/**/*.mod.js',
      output: {
        filename: 'es-modules-bundle.js'
      }
    },
    dest: 'dist/assets/scripts'
  },
  styles: {
    src: 'src/styles/entry/**/*.scss',
    dest: 'dist/assets/styles'
  },
  views: {
    folder: 'src/views',
    src: 'src/views/entry/**/*.html',
    dest: 'dist'
  }
};

config.minify = {
  scripts: {
    src: [
      'dist/assets/**/*.js',
      '!dist/assets/**/*.min.js',
      '!dist/assets/libraries/**/*.js'
    ],
    dest: 'dist/assets'
  },
  styles: {
    src: [
      'dist/assets/**/*.css',
      '!dist/assets/**/*.min.css',
      '!dist/assets/libraries/**/*.css'
    ],
    dest: 'dist/assets'
  }
};

config.watch = {
  files: 'src/files/**/*.*',
  fonts: 'src/fonts/**/*.*',
  images: 'src/images/**/*.*',
  libraries: 'src/libraries/**/*.*',
  scripts: {
    src: [
      'src/scripts/**/*.js',
      '!src/scripts/entry/**/*.mod.js',
      '!src/scripts/modules/**/*.js'
    ],
    esModules: [
      'src/scripts/entry/**/*.mod.js',
      'src/scripts/modules/**/*.js'
    ],
  },
  styles: 'src/styles/**/*.scss',
  views: 'src/views/**/*.html'
};

module.exports = config;
