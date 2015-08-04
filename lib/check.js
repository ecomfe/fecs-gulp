/**
 * @file check 入口文件
 * @author Fental<fengeeker@gmail.com>
 */
'use strict';

var path = require('path');

var fecs = require('fecs');
var util = require('fecs/lib/util');

var jschecker = require('fecs/lib/js/checker');
var csschecker = require('fecs/lib/css/checker');
var lesschecker = require('fecs/lib/less/checker');
var htmlchecker = require('fecs/lib/html/checker');

var through = require('through2');
var merge = require('merge');

/**
 * check API
 *
 * @param {Object} options gulp任务参数
 * @return {Transform} 转换流
 */
module.exports = function (options) {
    options = options || {};
    var opt = merge(
        fecs.getOptions([]),
        options
    );

    if (opt.silent && (opt.format || !opt.stream)) {
        /* eslint-disable no-console */
        console.log = function () {};
    }
    // 这个最好是reporter 的index.js暴露出来比较好一些
    var defaultReporter = {

        /* eslint-disable no-console */

        /**
         * 校验错误信息输出报告
         *
         * @param {vinyl.File} file 校验的 vinyl 文件对象
         * @param {Array.<Object>} json 收集所有错误信息的数组
         * @param {Object} options cli 参数
         */
        transform: function (file, json, options) {
            var log = this.log;
            var errors = file.errors;
            var item = {path: file.path, relative: file.relative};

            console.log();

            log.info('%s (%s message%s)', file.relative, errors.length, errors.length > 1 ? 's' : '');

            // 对提示信息作排序
            if (options.sort) {
                errors = errors.sort(function (a, b) {
                    return a.line === b.line ? a.column - b.column : a.line - b.line;
                });
            }

            item.errors = errors.map(function (error) {
                var info = '→ ';

                // 全局性的错误可能没有位置信息
                if (typeof error.line === 'number') {
                    info += ('line ' + error.line);
                    if (typeof error.column === 'number') {
                        info += (', col ' + error.column);
                    }
                    info += ': ';
                }

                var message = error.message.replace(/baidu\d{3}$/, '').replace(/[\r\n]+/g, '');
                info += message;

                var rule = error.rule || 'syntax';
                if (options.rule) {
                    info += '\t(' + util.colorize(rule, options.color && 'gray') + ')';
                }
                log.warn(info);

                return {
                    line: error.line,
                    column: error.column,
                    severity: 1,
                    message: message,
                    rule: rule
                };
            });
            console.log();

            if (options.code) {
                item.code = file.contents.toString();
            }

            json.push(item);
        },

        flush: function (success) {
            if (success) {
                this.log.info('Congratulations! Everything is OK!');
            }
        }
    };

    /**
     * 根据参数返回 reporter
     *
     * @param {Object} options gulp任务参数
     * @return {Function} 根据options.reporter的参数返回相应的reporter
     */
    function buildReporter(options) {
        var reporter = defaultReporter;
        if (options.reporter.toLowerCase() === 'baidu') {
            reporter.transform = require('fecs/lib/reporter/baidu').transform;
        }
        return reporter;
    }

    var log = require('fecs/lib/log')(opt.color);

    var success = true;
    var json = [];

    function transform(file, enc, cb) {

        /**
         * 根据各checker是否返回Promise采取相应操作
         *
         * @param {Array|Promise} promise checker.check返回的对象
         * @param {Function} done 回调函数
         */
        function then(promise, done) {
            promise instanceof Array
                ? done(promise)
                : promise.then(done, done);
        }

        /**
         * 执行checker
         *
         * @param {Checker} checker 不同的语言checker子类
         * @param {Object} opt gulp任务配置参数
         */
        function exec(checker, opt) {
            checker.register();
            if (!checker.isValid(file) || file.stat.size > opt.maxsize) {
                cb(null, file);
                return;
            }

            var contents = file.contents.toString();
            var reporter = buildReporter(opt);
            var done = function (errors) {
                file.errors = errors;
                if (file.errors && file.errors.length) {
                    reporter.transform.call({
                        log: log
                    }, file, json, opt);
                    success = false;
                }
                cb(null, file);
                return;
            };

            then(checker.check(contents, file.path, opt), done);
        }


        switch (path.extname(file.path)) {
            case '.js':
                exec(jschecker, opt);
                break;
            case '.css':
                exec(csschecker, opt);
                break;
            case '.less':
                exec(lesschecker, opt);
                break;
            case '.html':
            case '.htm':
                exec(htmlchecker, opt);
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
            defaultReporter.flush.call({
                log: log
            }, success, json);

            // 增加formatter，指定错误信息的输出格式
            if (opt.format) {
                var formatter = require('fecs/lib/formatter/');

                if (formatter[opt.format]) {
                    formatter[opt.format](json);
                }
            }

            cb();
        }
    );
};
