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
var _ = require("lodash");
var path = require("path");
var File_1 = require("../../Helper/File");
var Logging_1 = require("../../Helper/Logging");
var SentryCli_1 = require("../../Helper/SentryCli");
var MobileProject_1 = require("./MobileProject");
var xcode = require('xcode');
var ReactNative = /** @class */ (function (_super) {
    __extends(ReactNative, _super);
    function ReactNative(argv) {
        var _this = _super.call(this, argv) || this;
        _this.argv = argv;
        _this.sentryCli = new SentryCli_1.SentryCli(_this.argv);
        return _this;
    }
    ReactNative.prototype.emit = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var sentryCliProperties;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.argv.uninstall) {
                            return [2 /*return*/, this.uninstall(answers)];
                        }
                        return [4 /*yield*/, this.shouldEmit(answers)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, {}];
                        }
                        sentryCliProperties = this.sentryCli.convertAnswersToProperties(answers);
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var promises;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    promises = this.getPlatforms(answers).map(function (platform) { return __awaiter(_this, void 0, void 0, function () {
                                        var e_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 8, , 9]);
                                                    if (!(platform === 'ios')) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, File_1.patchMatchingFile('ios/*.xcodeproj/project.pbxproj', this.patchXcodeProj.bind(this))];
                                                case 1:
                                                    _a.sent();
                                                    Logging_1.dim("\u2705 Patched build script in Xcode project.");
                                                    return [3 /*break*/, 4];
                                                case 2: return [4 /*yield*/, File_1.patchMatchingFile('**/app/build.gradle', this.patchBuildGradle.bind(this))];
                                                case 3:
                                                    _a.sent();
                                                    Logging_1.dim("\u2705 Patched build.gradle file.");
                                                    _a.label = 4;
                                                case 4: return [4 /*yield*/, File_1.patchMatchingFile("index." + platform + ".js", this.patchJs.bind(this), answers, platform)];
                                                case 5:
                                                    _a.sent();
                                                    // rm 0.49 introduced an App.js for both platforms
                                                    return [4 /*yield*/, File_1.patchMatchingFile('App.js', this.patchJs.bind(this), answers, platform)];
                                                case 6:
                                                    // rm 0.49 introduced an App.js for both platforms
                                                    _a.sent();
                                                    Logging_1.dim("\u2705 Patched App.js file.");
                                                    return [4 /*yield*/, this.addSentryProperties(platform, sentryCliProperties)];
                                                case 7:
                                                    _a.sent();
                                                    Logging_1.dim("\u2705 Added sentry.properties file to " + platform);
                                                    Logging_1.green("Successfully set up " + platform + " for react-native");
                                                    return [3 /*break*/, 9];
                                                case 8:
                                                    e_1 = _a.sent();
                                                    Logging_1.red(e_1);
                                                    return [3 /*break*/, 9];
                                                case 9: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    Promise.all(promises)
                                        .then(resolve)
                                        .catch(reject);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    ReactNative.prototype.uninstall = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, File_1.patchMatchingFile('**/*.xcodeproj/project.pbxproj', this.unpatchXcodeProj.bind(this))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, File_1.patchMatchingFile('**/app/build.gradle', this.unpatchBuildGradle.bind(this))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    ReactNative.prototype.shouldConfigurePlatform = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var result, regex;
            return __generator(this, function (_a) {
                result = false;
                if (!File_1.exists(platform + "/sentry.properties")) {
                    result = true;
                    this.debug(platform + "/sentry.properties not exists");
                }
                if (!File_1.matchesContent('**/*.xcodeproj/project.pbxproj', /sentry-cli/gi)) {
                    result = true;
                    this.debug('**/*.xcodeproj/project.pbxproj not matched');
                }
                if (!File_1.matchesContent('**/app/build.gradle', /sentry\.gradle/gi)) {
                    result = true;
                    this.debug('**/app/build.gradle not matched');
                }
                regex = /Sentry/gi;
                if (File_1.exists("index." + platform + ".js") &&
                    !File_1.matchesContent("index." + platform + ".js", regex)) {
                    result = true;
                    this.debug("index." + platform + ".js not matched");
                }
                if (File_1.exists('App.js') && !File_1.matchesContent('App.js', regex)) {
                    result = true;
                    this.debug('index.js or App.js not matched');
                }
                if (this.argv.uninstall) {
                    // if we uninstall we need to invert the result so we remove already patched
                    // but leave untouched platforms as they are
                    return [2 /*return*/, !result];
                }
                return [2 /*return*/, result];
            });
        });
    };
    ReactNative.prototype.addSentryProperties = function (platform, properties) {
        var _this = this;
        var rv = Promise.resolve();
        // This will create the ios/android folder before trying to write
        // sentry.properties in it which would fail otherwise
        if (!fs.existsSync(platform)) {
            Logging_1.dim(platform + " folder did not exist, creating it.");
            fs.mkdirSync(platform);
        }
        var fn = path.join(platform, 'sentry.properties');
        if (platform === 'android' && properties['cli/executable']) {
            // We don't need to write the sentry-cli path in the properties file
            // since our gradle plugins already pick it up on the correct spot
            delete properties['cli/executable'];
        }
        rv = rv.then(function () {
            return fs.writeFileSync(fn, _this.sentryCli.dumpProperties(properties));
        });
        return rv;
    };
    ReactNative.prototype.patchJs = function (contents, filename, answers, platform) {
        // since the init call could live in other places too, we really only
        // want to do this if we managed to patch any of the other files as well.
        if (contents.match(/Sentry.config\(/)) {
            return Promise.resolve(null);
        }
        // if we match @sentry\/react-native somewhere, we already patched the file
        // and no longer need to
        if (contents.match('@sentry/react-native')) {
            return Promise.resolve(contents);
        }
        var dsn = '__DSN__';
        this.getPlatforms(answers).forEach(function (selectedPlatform) {
            if (platform && selectedPlatform === platform) {
                dsn = _.get(answers, 'config.dsn.public', null);
            }
            else if (platform === undefined) {
                dsn = _.get(answers, 'config.dsn.public', null);
            }
        });
        return Promise.resolve(contents.replace(/^([^]*)(import\s+[^;]*?;$)/m, function (match) {
            return match +
                "\n\nimport * as Sentry from '@sentry/react-native';\n\n" +
                "Sentry.init({ \n" +
                ("  dsn: '" + dsn + "', \n") +
                "});\n";
        }));
    };
    // ANDROID -----------------------------------------
    ReactNative.prototype.patchBuildGradle = function (contents) {
        var applyFrom = 'apply from: "../../node_modules/@sentry/react-native/sentry.gradle"';
        if (contents.indexOf(applyFrom) >= 0) {
            return Promise.resolve(null);
        }
        return Promise.resolve(contents.replace(/^apply from: "..\/..\/node_modules\/react-native\/react.gradle"/m, function (match) { return match + '\n' + applyFrom; }));
    };
    ReactNative.prototype.unpatchBuildGradle = function (contents) {
        return Promise.resolve(contents.replace(/^\s*apply from: ["']..\/..\/node_modules\/@sentry\/react-native\/sentry.gradle["'];?\s*?\r?\n/m, ''));
    };
    // IOS -----------------------------------------
    ReactNative.prototype.patchExistingXcodeBuildScripts = function (buildScripts) {
        for (var _i = 0, buildScripts_1 = buildScripts; _i < buildScripts_1.length; _i++) {
            var script = buildScripts_1[_i];
            if (!script.shellScript.match(/(packager|scripts)\/react-native-xcode\.sh\b/) ||
                script.shellScript.match(/sentry-cli\s+react-native[\s-]xcode/)) {
                continue;
            }
            var code = JSON.parse(script.shellScript);
            code =
                'export SENTRY_PROPERTIES=sentry.properties\n' +
                    'export EXTRA_PACKAGER_ARGS="--sourcemap-output $DERIVED_FILE_DIR/main.jsbundle.map"\n' +
                    code.replace(/^.*?\/(packager|scripts)\/react-native-xcode\.sh\s*/m, function (match) {
                        return "../node_modules/@sentry/cli/bin/sentry-cli react-native xcode " + match;
                    });
            script.shellScript = JSON.stringify(code);
        }
    };
    ReactNative.prototype.addNewXcodeBuildPhaseForSymbols = function (buildScripts, proj) {
        for (var _i = 0, buildScripts_2 = buildScripts; _i < buildScripts_2.length; _i++) {
            var script = buildScripts_2[_i];
            if (script.shellScript.match(/sentry-cli\s+upload-dsym/)) {
                return;
            }
        }
        proj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Upload Debug Symbols to Sentry', null, {
            shellPath: '/bin/sh',
            shellScript: 'export SENTRY_PROPERTIES=sentry.properties\\n' +
                '../node_modules/@sentry/cli/bin/sentry-cli upload-dsym',
        });
    };
    ReactNative.prototype.patchXcodeProj = function (contents, filename) {
        var _this = this;
        var proj = xcode.project(filename);
        return new Promise(function (resolve, reject) {
            proj.parse(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                var buildScripts = [];
                for (var key in proj.hash.project.objects.PBXShellScriptBuildPhase ||
                    {}) {
                    if (proj.hash.project.objects.PBXShellScriptBuildPhase.hasOwnProperty(key)) {
                        var val = proj.hash.project.objects.PBXShellScriptBuildPhase[key];
                        if (val.isa) {
                            buildScripts.push(val);
                        }
                    }
                }
                try {
                    _this.patchExistingXcodeBuildScripts(buildScripts);
                }
                catch (e) {
                    Logging_1.red(e);
                }
                try {
                    _this.addNewXcodeBuildPhaseForSymbols(buildScripts, proj);
                }
                catch (e) {
                    Logging_1.red(e);
                }
                // we always modify the xcode file in memory but we only want to save it
                // in case the user wants configuration for ios.  This is why we check
                // here first if changes are made before we might prompt the platform
                // continue prompt.
                var newContents = proj.writeSync();
                if (newContents === contents) {
                    resolve();
                }
                else {
                    resolve(newContents);
                }
            });
        });
    };
    ReactNative.prototype.unpatchXcodeBuildScripts = function (proj) {
        var scripts = proj.hash.project.objects.PBXShellScriptBuildPhase || {};
        var firstTarget = proj.getFirstTarget().uuid;
        var nativeTargets = proj.hash.project.objects.PBXNativeTarget;
        // scripts to patch partially.  Run this first so that we don't
        // accidentally delete some scripts later entirely that we only want to
        // rewrite.
        for (var _i = 0, _a = Object.keys(scripts); _i < _a.length; _i++) {
            var key = _a[_i];
            var script = scripts[key];
            // ignore comments
            if (typeof script === 'string') {
                continue;
            }
            // ignore scripts that do not invoke the react-native-xcode command.
            if (!script.shellScript.match(/sentry-cli\s+react-native[\s-]xcode\b/)) {
                continue;
            }
            script.shellScript = JSON.stringify(JSON.parse(script.shellScript)
                // "legacy" location for this.  This is what happens if users followed
                // the old documentation for where to add the bundle command
                .replace(/^..\/node_modules\/@sentry\/react-native\/bin\/bundle-frameworks\s*?\r\n?/m, '')
                // legacy location for dsym upload
                .replace(/^..\/node_modules\/@sentry\/cli\/bin\/sentry-cli upload-dsym\s*?\r?\n/m, '')
                // remove sentry properties export
                .replace(/^export SENTRY_PROPERTIES=sentry.properties\r?\n/m, '')
                // unwrap react-native-xcode.sh command.  In case someone replaced it
                // entirely with the sentry-cli command we need to put the original
                // version back in.
                .replace(/^(?:..\/node_modules\/@sentry\/cli\/bin\/)?sentry-cli\s+react-native[\s-]xcode(\s+.*?)$/m, function (match, m1) {
                var rv = m1.trim();
                if (rv === '') {
                    return '../node_modules/react-native/scripts/react-native-xcode.sh';
                }
                else {
                    return rv;
                }
            }));
        }
        // scripts to kill entirely.
        for (var _b = 0, _c = Object.keys(scripts); _b < _c.length; _b++) {
            var key = _c[_b];
            var script = scripts[key];
            // ignore comments and keys that got deleted
            if (typeof script === 'string' || script === undefined) {
                continue;
            }
            if (script.shellScript.match(/@sentry\/react-native\/bin\/bundle-frameworks\b/) ||
                script.shellScript.match(/@sentry\/cli\/bin\/sentry-cli\s+upload-dsym\b/)) {
                delete scripts[key];
                delete scripts[key + '_comment'];
                var phases = nativeTargets[firstTarget].buildPhases;
                if (phases) {
                    for (var i = 0; i < phases.length; i++) {
                        if (phases[i].value === key) {
                            phases.splice(i, 1);
                            break;
                        }
                    }
                }
                continue;
            }
        }
    };
    ReactNative.prototype.unpatchXcodeProj = function (contents, filename) {
        var _this = this;
        var proj = xcode.project(filename);
        return new Promise(function (resolve, reject) {
            proj.parse(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                _this.unpatchXcodeBuildScripts(proj);
                resolve(proj.writeSync());
            });
        });
    };
    return ReactNative;
}(MobileProject_1.MobileProject));
exports.ReactNative = ReactNative;
//# sourceMappingURL=ReactNative.js.map