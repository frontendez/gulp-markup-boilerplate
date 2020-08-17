# gulp-markup-boilerplate
Gulp boilerplate for markup (HTML, CSS, JS).

**Features**

- Easy project creation
- Full featured templating with Nunjucks
- Sass, autoprefixer, minify css, bundle css
- ES6 modules support, minify js, bundle js
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
my-project                         #Project directory
|-- dist                           #Output directory
    |-- assets                     #Assets
        |-- fonts                  #Fonts
        |-- images                 #Images
        |-- libraries              #Libraries (JQuery, Bootstrap...)
        |-- scripts                #Scripts (JavaScript)
        |-- styles                 #Styles (CSS)
    |-- index.html                 #Index page
|-- node_modules                   #Node modules
|-- src                            #Source directory
        |-- files                  #Static files for copying (favicon.ico, robots.txt...)
        |-- fonts                  #Fonts
        |-- images                 #Images
        |-- libraries              #Libraries (JQuery, Bootstrap...)
        |-- scripts                #Scripts (JavaScript)
            |-- entry              #Entry points of scripts
                |-- main.js        #JavaScript main file
                |-- main.mod.js    #ES main module (.mod.js will be transpiled by Babel)
            |-- modules            #ES modules for import
            |-- partials           #Partials of scripts
        |-- styles                 #Styles (SCSS)
            |-- entry              #Entry points of styles
                |-- main.scss      #JavaScript main file
            |-- partials           #Partials of styles
        |-- views                  #Views (html)
            |-- entry              #Entry points of Views (will be processed by Nunjucks)
                |-- index.html     #Index page
            |-- layouts            #Layouts of pages
            |-- partials           #Partials of views
|-- config.js                      #Project config
|-- gulpfile.js                    #Gulp config
|-- package.json
|-- package-lock.json
```

## Configuration files

* config.js - configuring paths and bundle files

* gulpfile.js - gulp tasks file
