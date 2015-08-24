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
 * @param {(string|Function)} reporter reporter名称或者函数
 * @param {Object} options gulp参数
 * @return {Transform} 转换流
 */
module.exports = function (reporter, options) {
    if (typeof reporter === 'string' || (reporter.transform && typeof reporter.transform === 'function')) {
        options = options || {};
        options.reporter = reporter;
    }
    else {
        options = reporter;
    }
    var opt = merge(
        fecs.getOptions([]),
        options
    );
    var log = require('fecs/lib/log')(opt.color);
    return require('fecs/lib/reporter').get(log, opt);
};
