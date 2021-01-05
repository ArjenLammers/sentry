"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var Logging_1 = require("./Logging");
var BottomBar = /** @class */ (function () {
    function BottomBar() {
    }
    BottomBar.show = function (msg) {
        var loader = ['/', '|', '\\', '-'];
        var i = 4;
        BottomBar.bar = new inquirer_1.ui.BottomBar({ bottomBar: loader[i % 4] });
        BottomBar.interval = setInterval(function () {
            BottomBar.bar.updateBottomBar(loader[i++ % 4] + " " + msg);
        }, 100);
    };
    BottomBar.hide = function () {
        clearInterval(BottomBar.interval);
        if (BottomBar.bar) {
            BottomBar.bar.updateBottomBar('');
            Logging_1.nl();
            BottomBar.bar.close();
        }
    };
    return BottomBar;
}());
exports.BottomBar = BottomBar;
//# sourceMappingURL=BottomBar.js.map