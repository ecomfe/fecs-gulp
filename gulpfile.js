/**
 * @file gulpfile 入口文件
 * @author Fental<fengeeker@gmail.com>
 */

var gulp = require('gulp');
var fecs = require('./index.js');

gulp.task('test', function () {
    return gulp.src(['./test/css/*', './test/html/*', './test/js/*'])
        .pipe(fecs.check(
            // 可以没有options参数，默认效果和命令行的默认效果一致
            {
                // 支持的cli属性
                rule: true,
                // maxerr: 1,
                // maxsize: 1,
                // format: 'html',
                // silent: true,
                reporter: 'baidu'

                // 不支持的属性
                // ignore
                // type
            }
        ))
        .pipe(fecs.format(
            // 可以没有options参数
            {
                // 不支持replace
                // 不支持type
                // 不支持output
            }
        ))
        .pipe(gulp.dest('./test/output'));
});


