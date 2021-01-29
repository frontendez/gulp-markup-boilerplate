# gulp-markup-boilerplate
Gulp boilerplate for markup (HTML, CSS, JS).

**Features**

- Easy project creation
- Full featured templating with Nunjucks
- Sass, autoprefixer, minify css, bundle css
- ES modules support, minify js, bundle js
- Optimize images
- Web server
- Browser live reloads after changes

## Create a new project

```sh
npx @frontendez/gulp-markup-boilerplate my-project
cd my-project
```

_(npx is a package runner tool that comes with npm 5.2+ and higher)_

It will create a project directory inside the current folder, generate the initial structure and install dependencies.

## Commands

* `npm run build` - build project from source

* `npm run dev` - start web server, watch and build changes, reload browser automatically

* `npm run watch` - watch and build changes without web server starting

* `npm run clean` - clean output directory 'dist'

## Project structure

```
my-project                  #Project directory
|-- dist                    #Output directory
    |-- assets              #Assets
        |-- fonts           #Fonts
        |-- images          #Images
        |-- libraries       #Libraries
        |-- scripts         #Scripts
        |-- styles          #Styles
    |-- index.html          #Index page
|-- node_modules            #Node modules
|-- src                     #Source directory
    |-- fonts               #Fonts
    |-- images              #Images
    |-- libraries           #Libraries
    |-- scripts             #Scripts
        |-- __chunks        #Chunks (partials)
    |-- static              #Static files
    |-- styles              #Styles
        |-- __chunks        #Chunks (partials)
    |-- views               #Views
        |-- __chunks        #Chunks (partials)
        |-- index.njk       #Index page
|-- config.js               #Project config
|-- gulpfile.js             #Gulp config
|-- package.json
|-- package-lock.json
```

## Configuration files

* config.js - configuring paths and bundle files

* gulpfile.js - gulp tasks file
