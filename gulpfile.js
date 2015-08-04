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
            // {
                // 支持的cli属性
                // maxerr: 1,
                // maxsize: 1,

                // 不支持的属性
                // ignore
                // type
            // }
        ))
        .pipe(
            // 这么写reporter的配置都是默认的
            // fecs.reporter()
            fecs.reporter({
                // reporter: 'baidu',
                // reporter: require('fecs/lib/reporter/baidu'),
                reporter: '',
                color: true,
                rule: true,
                sort: true
            })
        )
        .pipe(fecs.format(
            // 可以没有options参数
            // {
                // 不支持replace
                // 不支持type
                // 不支持output
            // }
        ))
        .pipe(gulp.dest('./test/output'));
});


