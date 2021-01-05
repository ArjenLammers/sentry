"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
function prepareMessage(msg) {
    if (typeof msg === 'string') {
        return msg;
    }
    if (msg instanceof Error) {
        return "" + (msg.stack || '');
    }
    return JSON.stringify(msg, null, '\t');
}
function l(msg) {
    // tslint:disable-next-line
    console.log(msg);
}
exports.l = l;
function nl() {
    return l('');
}
exports.nl = nl;
function green(msg) {
    return l(chalk_1.default.green(prepareMessage(msg)));
}
exports.green = green;
function red(msg) {
    return l(chalk_1.default.red(prepareMessage(msg)));
}
exports.red = red;
function dim(msg) {
    return l(chalk_1.default.dim(prepareMessage(msg)));
}
exports.dim = dim;
function debug(msg) {
    return l(chalk_1.default.italic.yellow(prepareMessage(msg)));
}
exports.debug = debug;
//# sourceMappingURL=Logging.js.map