/**
 * @file reporter 入口文件
 * @author Fental<fengeeker@gmail.com>
 */

'use strict';

var fecs = require('fecs');

var merge = require('merge');

/**
 * reporter
 *
 * @param {(string|Object)} reporter reporter
 * @param {Object} options gulp参数
 * @return {Transform} 转换流
 */
module.exports = function (reporter, options) {
    // fecs 会对 reporter 进行检查，这里检查一次好像觉得有点多余。。
    options = options || {};
    options.reporter = reporter;

    var opt = merge(
        fecs.getOptions([]),
        options
    );
    var log = require('fecs/lib/log')(opt.color);
    return require('fecs/lib/reporter').get(log, opt);
};
