/**
 * @file fecs-gulp 入口文件
 * @author fental<fengeeker@gmail.com>
 */

'use strict';

var fecs = require('fecs');
var merge = require('merge');
// gulp用于报错的工具
var gutil = require('gulp-util');

var Stream = require('stream').Stream;
var PluginError = gutil.PluginError;

module.exports = function (stream, opt) {

    if (!(stream instanceof Stream)) {
        throw new PluginError(
            'fecs-gulp',
            {
                message: '第一个参数必须是stream'
            }
        );
    }

    opt.stream = stream;

    var options = merge(
        fecs.getOptions([]),
        opt
    );

    return options.command.toLowerCase() === 'check'
        ? fecs.check(options)
        : fecs.format(options);
};
