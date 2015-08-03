/**
 * @file format 入口文件
 * @author Fental<fengeeker@gmail.com>
 */
'use strict';

var fecs = require('fecs');

var jsformatter = require('fecs/lib/js/formatter');
var cssformatter = require('fecs/lib/css/formatter');
var htmlformatter = require('fecs/lib/html/formatter');

var through = require('through2');
var merge = require('merge');

/**
 * check API
 *
 * @param {Object} options gulp任务参数
 * @return {Transform} 转换流
 */
module.exports = function (options) {
    var opt = merge(
        fecs.getOptions([]),
        options
    );

    /**
     * 根据各checker是否返回Promise采取相应操作
     *
     * @param {Array|Promise} promise checker.check返回的对象
     * @param {Function} done 回调函数
     */
    function exec(promise, done) {
        typeof promise === 'string'
            ? done(promise)
            : promise.then(done, done);
    }

    function transform(file, enc, cb) {
        var contents = file.contents.toString();
        var done = function (contents) {
            file.contents = new Buffer(contents);
            cb(null, file);
        };

        switch (file.relative.split('.')[1]) {
            case 'js':
                jsformatter.register();
                exec(jsformatter.format(contents, file.path, opt), done);
                break;
            case 'css':
                cssformatter.register();
                exec(cssformatter.format(contents, file.path, opt), done);
                break;
            case 'html':
                htmlformatter.register();
                exec(htmlformatter.format(contents, file.path, opt), done);
                break;
            default:
                break;
        }
    }
    return through(
        {
            objectMode: true
        },
        transform,
        function (cb) {
            cb();
        }
    );
};
