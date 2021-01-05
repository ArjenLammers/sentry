"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Constants_1 = require("../Constants");
var BottomBar_1 = require("./BottomBar");
var Logging_1 = require("./Logging");
function sanitizeAndValidateArgs(argv) {
    if (!argv.url) {
        argv.url = Constants_1.DEFAULT_URL;
        Logging_1.dim("no URL provided, fallback to " + argv.url);
    }
    if (argv.quiet === undefined) {
        argv.quiet = true;
        Logging_1.dim('will activate quiet mode for you');
    }
    var baseUrl = argv.url;
    baseUrl += baseUrl.endsWith('/') ? '' : '/';
    baseUrl = baseUrl.replace(/:\/(?!\/)/g, '://');
    argv.url = baseUrl;
    // @ts-ignore
    if (argv['skip-connect']) {
        // @ts-ignore
        argv.skipConnect = argv['skip-connect'];
        // @ts-ignore
        delete argv['skip-connect'];
    }
}
function getCurrentIntegration(answers) {
    return _.get(answers, 'integration');
}
exports.getCurrentIntegration = getCurrentIntegration;
function startWizard(argv) {
    var steps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        steps[_i - 1] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    sanitizeAndValidateArgs(argv);
                    if (argv.debug) {
                        Logging_1.debug(argv);
                    }
                    if (argv.quiet) {
                        Logging_1.dim("Quiet mode On, DAMA, don't ask me anything");
                    }
                    return [4 /*yield*/, steps
                            .map(function (step) { return new step(argv); })
                            .reduce(function (answer, step) { return __awaiter(_this, void 0, void 0, function () {
                            var prevAnswer, answers;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, answer];
                                    case 1:
                                        prevAnswer = _a.sent();
                                        return [4 /*yield*/, step.emit(prevAnswer)];
                                    case 2:
                                        answers = _a.sent();
                                        return [2 /*return*/, __assign({}, prevAnswer, answers)];
                                }
                            });
                        }); }, Promise.resolve({}))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_1 = _a.sent();
                    BottomBar_1.BottomBar.hide();
                    Logging_1.nl();
                    Logging_1.red('Sentry Wizard failed with:');
                    Logging_1.red(argv.debug ? e_1 : e_1.message);
                    Logging_1.nl();
                    Logging_1.red('Protip: Add --debug to see whats going on');
                    Logging_1.red('OR use --help to see your options');
                    return [2 /*return*/, {}];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.startWizard = startWizard;
//# sourceMappingURL=Wizard.js.map