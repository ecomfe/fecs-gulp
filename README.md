# fecs-gulp

> fecs for gulp

## Getting Started
Install this plugin with this command:

```shell
npm install fecs-gulp --save-dev
```

## Usage

### Overview
In your project's gulpfile.js.

```js
var gulp = require('gulp');
var fecs = require('fecs-gulp');

// use check like this
// fecs(stream, options)
// options选项参考fecs的cli，没有options参数默认是check操作
gulp.task('check', function () {
    return fecs(
        gulp.src('*'),
            // .pipe(/*...*/)
            // .pipe(/*...*/)
            // .pipe(/*...*/)
            // .pipe(gulp.dest('outputFolder')),
        {
            command: 'check'
        }
    );
});

// use format like this
gulp.task('format', function () {
    return fecs(
        gulp.src('*'),
            // .pipe(/*...*/)
            // .pipe(/*...*/)
            // .pipe(/*...*/)
            // .pipe(gulp.dest('outputFolder')),
        {
            command: 'format',
            output: './output'
        }
    );
});
```

### Options

[fecs-options](https://github.com/ecomfe/fecs/wiki/CLI)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
