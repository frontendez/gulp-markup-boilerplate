let config = {};

config.bundle = {
  styles: {
    src: [
      'dist/assets/fonts/roboto/roboto.css',
      'dist/assets/libraries/bootstrap-4.5.3/bootstrap.css',
      'dist/assets/styles/main.css'
    ],
    dest: 'dist/assets/styles',
    file: 'bundle.css'
  },
  scripts: {
    src: [
      'dist/assets/libraries/jquery-3.5.1/jquery-3.5.1.js',
      'dist/assets/libraries/bootstrap-4.5.3/bootstrap.bundle.js',
      'dist/assets/scripts/modules-bundle.js',
      'dist/assets/scripts/main.js'
    ],
    dest: 'dist/assets/scripts',
    file: 'bundle.js'
  }
}

config.build = {
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
      'src/scripts/entry/**/*.js',
      '!src/scripts/entry/**/*.mod.js'
    ],
    dest: 'dist/assets/scripts',
    modules: {
      entry: 'src/scripts/entry/**/*.mod.js',
      output: {
        filename: 'modules-bundle.js'
      }
    }
  },
  styles: {
    src: 'src/styles/entry/**/*.scss',
    dest: 'dist/assets/styles'
  },
  views: {
    folder: 'src',
    src: 'src/views/entry/**/*.njk',
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
  files: 'src/static/**/*.*',
  fonts: 'src/fonts/**/*.*',
  images: 'src/images/**/*.*',
  libraries: 'src/libraries/**/*.*',
  scripts: {
    src: [
      'src/components/**/*.js',
      'src/scripts/**/*.js',
      '!src/components/**/*.mod.js',
      '!src/scripts/**/*.mod.js'
    ],
    modules: [
      'src/components/**/*.mod.js',
      'src/scripts/**/*.mod.js'
    ]
  },
  styles: [
    'src/components/**/*.scss',
    'src/styles/**/*.scss'
  ],
  views: [
    'src/components/**/*.njk',
    'src/views/**/*.njk'
  ]
};

module.exports = config;
