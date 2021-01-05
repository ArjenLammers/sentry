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
var util_1 = require("util");
var Logging_1 = require("../Helper/Logging");
var Wizard_1 = require("../Helper/Wizard");
var BaseStep_1 = require("./BaseStep");
var PromptForParameters = /** @class */ (function (_super) {
    __extends(PromptForParameters, _super);
    function PromptForParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromptForParameters.prototype.emit = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var url, organization, project, dsn, auth;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug(answers);
                        return [4 /*yield*/, Wizard_1.getCurrentIntegration(answers).shouldEmit(answers)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, {}];
                        }
                        if (this.argv.quiet) {
                            return [2 /*return*/, {}];
                        }
                        url = this.getFullUrl(answers);
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    message: 'Organization Slug:',
                                    name: 'slug',
                                    type: 'input',
                                    validate: this.validateSlug,
                                    when: this.shouldAsk(answers, 'config.organization.slug', function () {
                                        Logging_1.dim('Please copy/paste your organization slug');
                                        Logging_1.dim("It can be found in the url " + url);
                                    }),
                                },
                            ])];
                    case 2:
                        organization = _a.sent();
                        url = this.getFullUrl(answers, organization.slug);
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    message: 'Project Slug:',
                                    name: 'slug',
                                    type: 'input',
                                    validate: this.validateSlug,
                                    when: this.shouldAsk(answers, 'config.project.slug', function () {
                                        Logging_1.dim('Please copy/paste your project slug');
                                        Logging_1.dim("It can be found in the url " + url);
                                    }),
                                },
                            ])];
                    case 3:
                        project = _a.sent();
                        url = this.getFullUrl(answers, organization.slug, project.slug);
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    message: 'DSN:',
                                    name: 'secret',
                                    type: 'input',
                                    validate: this.validateDSN,
                                    when: this.shouldAsk(answers, 'config.dsn.secret', function () {
                                        Logging_1.dim('Please copy/paste your DSN');
                                        Logging_1.dim("It can be found here: " + url);
                                    }),
                                },
                            ])];
                    case 4:
                        dsn = _a.sent();
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    message: 'Auth Token:',
                                    name: 'token',
                                    type: 'input',
                                    validate: this.validateAuthToken,
                                    when: this.shouldAsk(answers, 'config.auth.token', function () {
                                        Logging_1.dim('Please copy/paste your auth token');
                                        Logging_1.dim("It can be found here: " + _this.argv.url + "api/");
                                        Logging_1.dim('In case there is none yet, create one with [project:releases] permission');
                                    }),
                                },
                            ])];
                    case 5:
                        auth = _a.sent();
                        return [2 /*return*/, {
                                config: _.merge(_.get(answers, 'config'), {
                                    auth: auth,
                                    dsn: dsn,
                                    project: project,
                                    organization: organization,
                                }),
                            }];
                }
            });
        });
    };
    PromptForParameters.prototype.getFullUrl = function (answers, organizationSlug, projectSlug) {
        var baseUrl = this.argv.url;
        var orgSlug = _.get(answers, 'config.organization.slug', organizationSlug || 'organization_slug');
        var projSlug = _.get(answers, 'config.project.slug', projectSlug || 'project_slug');
        return "" + baseUrl + orgSlug + "/" + projSlug;
    };
    PromptForParameters.prototype.shouldAsk = function (answers, configKey, preHook) {
        var shouldAsk = util_1.isNull(_.get(answers, configKey, null));
        if (shouldAsk && preHook) {
            preHook();
        }
        return shouldAsk;
    };
    PromptForParameters.prototype.validateAuthToken = function (input) {
        if (!input.match(/[0-9a-f]{64}/g)) {
            return 'Make sure you copied the correct auth token, it should be 64 hex chars';
        }
        return true;
    };
    PromptForParameters.prototype.validateSlug = function (input) {
        if (input.match(/[A-Z]/g)) {
            return 'Please copy the slug from the url, it should be all lowercase';
        }
        if (input.length === 0) {
            return 'Can\'t be empty';
        }
        return true;
    };
    PromptForParameters.prototype.validateDSN = function (input) {
        var match = input.match(/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)$/);
        if (!match) {
            return 'Invalid DSN format';
        }
        if (match[1] !== 'http' && match[1] !== 'https') {
            return 'Unsupported protocol for DSN: ' + match[1];
        }
        return true;
    };
    return PromptForParameters;
}(BaseStep_1.BaseStep));
exports.PromptForParameters = PromptForParameters;
//# sourceMappingURL=PromptForParameters.js.map