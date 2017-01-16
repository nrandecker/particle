'use strict';

var csso        = require('csso'),
    gutil       = require('gulp-util'),
    Transform   = require('stream').Transform,
    applySourceMap = require('vinyl-sourcemaps-apply');

function processParseError(source, filename, details, message) {
    function formatLines(start, end) {
        return lines.slice(start, end).map(function(line, idx) {
            var num = String(start + idx + 1);

            while (num.length < maxNumLength) {
                num = ' ' + num;
            }

            return num + ' |' + line;
        }).join('\n');
    }

    var lines = source.split(/\n|\r\n?|\f/);
    var column = details.column;
    var line = details.line;
    var startLine = Math.max(1, line - 2);
    var endLine = Math.min(line + 2, lines.length + 1);
    var maxNumLength = Math.max(4, String(endLine).length) + 1;

    return [
        'CSS parse error ' + filename + ': ' + message,
        formatLines(startLine - 1, line),
        new Array(column + maxNumLength + 2).join('-') + '^',
        formatLines(line, endLine)
    ].join('\n');
}

module.exports = function (options) {
    var stream = new Transform({ objectMode: true });

    stream._transform = function (file, encoding, cb) {
        function handleError(error) {
            if ('parseError' in error) {
                error = processParseError(source, inputFile, error.parseError, error.message);
            }

            cb(new gutil.PluginError('gulp-csso', error));
        }

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return handleError('Streaming not supported');
        }

        var inputFile = file.relative;
        var source = String(file.contents);
        var cssoOptions = {
            filename: inputFile,
            sourceMap: Boolean(file.sourceMap),
            restructure: true,
            debug: false
        };

        if (options === undefined || typeof options === 'boolean') {
            // for backward capability
            cssoOptions.restructure = !options;
        } else if (options) {
            // extend default csso options
            for (var name in options) {
                if (options.hasOwnProperty(name) && name !== 'filename') {
                    cssoOptions[name] = options[name];
                }
            }
        }

        try {
            var result = csso.minify(source, cssoOptions);

            if (result.map) {
                applySourceMap(file, result.map.toJSON());
            } else {
                file.sourceMap = null;
            }

            file.contents = new Buffer(result.css);
            cb(null, file);
        } catch(error) {
            handleError(error);
        }
    };

    return stream;
};
