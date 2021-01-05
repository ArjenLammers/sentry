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
var inquirer_1 = require("inquirer");
var _ = require("lodash");
var Constants_1 = require("../Constants");
var BaseStep_1 = require("./BaseStep");
var Cordova_1 = require("./Integrations/Cordova");
var Electron_1 = require("./Integrations/Electron");
var ReactNative_1 = require("./Integrations/ReactNative");
var projectPackage = {};
try {
    // If we run directly in setup-wizard
    projectPackage = require('../../package.json');
}
catch (_a) {
    projectPackage = require(process.cwd() + "/package.json");
}
var ChooseIntegration = /** @class */ (function (_super) {
    __extends(ChooseIntegration, _super);
    function ChooseIntegration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChooseIntegration.prototype.emit = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var integrationPrompt, integration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        integrationPrompt = null;
                        if (!this.argv.integration) return [3 /*break*/, 1];
                        integrationPrompt = { integration: this.argv.integration };
                        return [3 /*break*/, 3];
                    case 1:
                        if (this.argv.quiet) {
                            throw new Error('You need to choose a integration');
                        }
                        integrationPrompt = this.tryDetectingIntegration();
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    choices: Constants_1.getIntegrationChoices(),
                                    default: integrationPrompt,
                                    message: 'What integration do you want to set up?',
                                    name: 'integration',
                                    type: 'list',
                                },
                            ])];
                    case 2:
                        integrationPrompt = _a.sent();
                        _a.label = 3;
                    case 3:
                        integration = null;
                        switch (integrationPrompt.integration) {
                            case Constants_1.Integration.reactNative:
                                integration = new ReactNative_1.ReactNative(this.argv);
                                break;
                            case Constants_1.Integration.cordova:
                                integration = new Cordova_1.Cordova(this.argv);
                                break;
                            case Constants_1.Integration.electron:
                                integration = new Electron_1.Electron(this.argv);
                                break;
                            default:
                                integration = new ReactNative_1.ReactNative(this.argv);
                                break;
                        }
                        return [2 /*return*/, { integration: integration }];
                }
            });
        });
    };
    ChooseIntegration.prototype.tryDetectingIntegration = function () {
        if (_.has(projectPackage, 'dependencies.react-native')) {
            return Constants_1.Integration.reactNative;
        }
        if (_.has(projectPackage, 'dependencies.cordova')) {
            return Constants_1.Integration.cordova;
        }
        return;
    };
    return ChooseIntegration;
}(BaseStep_1.BaseStep));
exports.ChooseIntegration = ChooseIntegration;
//# sourceMappingURL=ChooseIntegration.js.map