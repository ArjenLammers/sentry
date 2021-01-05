"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readEnv = require('read-env').default;
function readEnvironment() {
    var result = readEnv('SENTRY_WIZARD');
    return result;
}
exports.readEnvironment = readEnvironment;
//# sourceMappingURL=Env.js.map