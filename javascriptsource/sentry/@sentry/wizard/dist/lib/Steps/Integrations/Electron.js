"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var fs = require("fs");
var inquirer_1 = require("inquirer");
var _ = require("lodash");
var path = require("path");
var Logging_1 = require("../../Helper/Logging");
var SentryCli_1 = require("../../Helper/SentryCli");
var BaseIntegration_1 = require("./BaseIntegration");
var MIN_ELECTRON_VERSION_STRING = '1.7.0';
var MIN_ELECTRON_VERSION = parseInt(MIN_ELECTRON_VERSION_STRING.replace(/\D+/g, ''), 10);
var CODE_EXAMPLE = "const Sentry = require('@sentry/electron');\n\nSentry.init({\n  dsn: '___DSN___',\n});";
var UPLOAD_EXAMPLE = "npm install --save-dev @sentry/cli electron-download\nnode sentry-symbols.js";
var appPackage = {};
function printExample(example, title) {
    if (title === void 0) { title = ''; }
    if (title) {
        Logging_1.l(title);
    }
    Logging_1.nl();
    Logging_1.dim(example.replace(/^/gm, '    '));
    Logging_1.nl();
}
try {
    appPackage = require(path.join(process.cwd(), 'package.json'));
}
catch (_a) {
    // We don't need to have this
}
var Electron = /** @class */ (function (_super) {
    __extends(Electron, _super);
    function Electron(argv) {
        var _this = _super.call(this, argv) || this;
        _this.argv = argv;
        _this.sentryCli = new SentryCli_1.SentryCli(_this.argv);
        return _this;
    }
    Electron.prototype.emit = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var dsn, sentryCliProps, symbolsScript;
            return __generator(this, function (_a) {
                dsn = _.get(answers, ['config', 'dsn', 'public'], null);
                Logging_1.nl();
                sentryCliProps = this.sentryCli.convertAnswersToProperties(answers);
                fs.writeFileSync('./sentry.properties', this.sentryCli.dumpProperties(sentryCliProps));
                Logging_1.green("Successfully created sentry.properties");
                Logging_1.nl();
                symbolsScript = path.join(__dirname, '..', '..', '..', 'Electron', 'symbols.js');
                if (fs.existsSync(symbolsScript)) {
                    fs.writeFileSync('sentry-symbols.js', fs.readFileSync(symbolsScript));
                }
                else {
                    Logging_1.debug("Couldn't find " + symbolsScript + ", probably because you run from src");
                }
                printExample(CODE_EXAMPLE.replace('___DSN___', dsn), 'Put these lines in to your main and renderer processes to setup Sentry:');
                printExample(UPLOAD_EXAMPLE, 'To upload debug information for native crashes when updating Electron, run:');
                Logging_1.l('For more information, see https://docs.sentry.io/clients/electron/');
                Logging_1.nl();
                return [2 /*return*/, {}];
            });
        });
    };
    Electron.prototype.shouldConfigure = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var success, continued;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._shouldConfigure) {
                            return [2 /*return*/, this._shouldConfigure];
                        }
                        success = true;
                        Logging_1.nl();
                        success = this.checkDep('electron', MIN_ELECTRON_VERSION_STRING) && success;
                        success = this.checkDep('@sentry/electron') && success;
                        continued = { continue: true };
                        if (!(!success && !this.argv.quiet)) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.prompt({
                                message: 'There were errors during your project checkup, do you still want to continue?',
                                name: 'continue',
                                default: false,
                                type: 'confirm',
                            })];
                    case 1:
                        continued = _a.sent();
                        _a.label = 2;
                    case 2:
                        Logging_1.nl();
                        if (!_.get(continued, 'continue', false)) {
                            throw new Error('Please install the required dependencies to continue.');
                        }
                        this._shouldConfigure = Promise.resolve({ electron: true });
                        return [2 /*return*/, this.shouldConfigure];
                }
            });
        });
    };
    Electron.prototype.checkDep = function (packageName, minVersion) {
        var depVersion = parseInt(_.get(appPackage, ['dependencies', packageName], '0').replace(/\D+/g, ''), 10);
        var devDepVersion = parseInt(_.get(appPackage, ['devDependencies', packageName], '0').replace(/\D+/g, ''), 10);
        if (!_.get(appPackage, "dependencies." + packageName, false) &&
            !_.get(appPackage, "devDependencies." + packageName, false)) {
            Logging_1.red("\u2717 " + packageName + " isn't in your dependencies");
            Logging_1.red("  please install it with yarn/npm");
            return false;
        }
        else if (minVersion &&
            depVersion < MIN_ELECTRON_VERSION &&
            devDepVersion < MIN_ELECTRON_VERSION) {
            Logging_1.red("\u2717 Your installed version of " + packageName + " is to old, >" + MIN_ELECTRON_VERSION_STRING + " needed");
            return false;
        }
        else {
            minVersion
                ? Logging_1.green("\u2713 " + packageName + " > " + minVersion + " is installed")
                : Logging_1.green("\u2713 " + packageName + " is installed");
            return true;
        }
    };
    return Electron;
}(BaseIntegration_1.BaseIntegration));
exports.Electron = Electron;
//# sourceMappingURL=Electron.js.map