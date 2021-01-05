"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var path = require("path");
var SentryCli = /** @class */ (function () {
    function SentryCli(argv) {
        this.argv = argv;
        this.resolve = require.resolve;
    }
    SentryCli.prototype.setResolveFunction = function (resolve) {
        this.resolve = resolve;
    };
    SentryCli.prototype.convertAnswersToProperties = function (answers) {
        var props = {};
        props['defaults/url'] = this.argv.url;
        props['defaults/org'] = _.get(answers, 'config.organization.slug', null);
        props['defaults/project'] = _.get(answers, 'config.project.slug', null);
        props['auth/token'] = _.get(answers, 'config.auth.token', null);
        try {
            var cliPath = this.resolve('@sentry/cli/bin/sentry-cli');
            props['cli/executable'] = path
                .relative(process.cwd(), cliPath)
                .replace(/\\/g, '\\\\');
        }
        catch (e) {
            // we do nothing and leave everyting as it is
        }
        return props;
    };
    SentryCli.prototype.dumpProperties = function (props) {
        var rv = [];
        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                var value = props[key];
                key = key.replace(/\//g, '.');
                if (value === undefined || value === null) {
                    rv.push('#' + key + '=');
                }
                else {
                    rv.push(key + '=' + value);
                }
            }
        }
        return rv.join('\n') + '\n';
    };
    return SentryCli;
}());
exports.SentryCli = SentryCli;
//# sourceMappingURL=SentryCli.js.map