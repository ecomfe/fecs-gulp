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
// options选项参考fecs的cli
gulp.task('task1', function () {
    return gulp.src(['js/fuck.js', 'js/index.js'])
            .pipe(fecs.check({
                rule: true,
                reporter: 'baidu'
            }))
            .pipe(fecs.format())
            .pipe(gulp.dest('./output'));
    );
});
```

### Options

[fecs-options](https://github.com/ecomfe/fecs/wiki/CLI)

## Contributing

## Release History
_(Nothing yet)_
