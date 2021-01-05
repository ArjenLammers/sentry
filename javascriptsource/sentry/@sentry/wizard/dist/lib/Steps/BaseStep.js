"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logging_1 = require("../Helper/Logging");
var BaseStep = /** @class */ (function () {
    function BaseStep(argv) {
        this.argv = argv;
        this.isDebug = false;
        this.isDebug = argv.debug;
    }
    BaseStep.prototype.debug = function (msg) {
        if (this.isDebug) {
            Logging_1.nl();
            Logging_1.debug(msg);
            Logging_1.nl();
        }
    };
    return BaseStep;
}());
exports.BaseStep = BaseStep;
//# sourceMappingURL=BaseStep.js.map