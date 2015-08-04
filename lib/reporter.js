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
 * @param {Object} options gulp参数
 * @return {Transform} 转换流
 */
module.exports = function (options) {
    options = options || {};
    var opt = merge(
        fecs.getOptions([]),
        options
    );
    var log = require('fecs/lib/log')(opt.color);
    return require('fecs/lib/reporter').get(log, opt);
};
