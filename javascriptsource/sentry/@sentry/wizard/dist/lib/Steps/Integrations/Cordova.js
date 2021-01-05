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
var path = require("path");
var File_1 = require("../../Helper/File");
var Logging_1 = require("../../Helper/Logging");
var SentryCli_1 = require("../../Helper/SentryCli");
var BaseIntegration_1 = require("./BaseIntegration");
var xcode = require('xcode');
var Cordova = /** @class */ (function (_super) {
    __extends(Cordova, _super);
    function Cordova(argv) {
        var _this = _super.call(this, argv) || this;
        _this.argv = argv;
        _this.folderPrefix = 'platforms';
        _this.pluginFolder = ['.'];
        _this.sentryCli = new SentryCli_1.SentryCli(_this.argv);
        return _this;
    }
    Cordova.prototype.emit = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var sentryCliProperties;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.argv.uninstall) {
                            return [2 /*return*/, this.uninstall(answers)];
                        }
                        sentryCliProperties = this.sentryCli.convertAnswersToProperties(answers);
                        return [4 /*yield*/, File_1.patchMatchingFile(this.folderPrefix + "/ios/*.xcodeproj/project.pbxproj", this.patchXcodeProj.bind(this))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.addSentryProperties(sentryCliProperties)];
                    case 2:
                        _a.sent();
                        Logging_1.green("Successfully set up for cordova");
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    Cordova.prototype.uninstall = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, File_1.patchMatchingFile('**/*.xcodeproj/project.pbxproj', this.unpatchXcodeProj.bind(this))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    Cordova.prototype.shouldConfigure = function (answers) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                if (this._shouldConfigure) {
                    return [2 /*return*/, this._shouldConfigure];
                }
                result = false;
                if (!File_1.exists(path.join('sentry.properties'))) {
                    result = true;
                    this.debug("sentry.properties not exists");
                }
                if (!File_1.matchesContent('**/*.xcodeproj/project.pbxproj', /SENTRY_PROPERTIES/gi)) {
                    result = true;
                    this.debug('**/*.xcodeproj/project.pbxproj not matched');
                }
                if (this.argv.uninstall) {
                    // if we uninstall we need to invert the result so we remove already patched
                    result = !result;
                }
                this._shouldConfigure = Promise.resolve({ cordova: result });
                return [2 /*return*/, this.shouldConfigure];
            });
        });
    };
    Cordova.prototype.unpatchXcodeProj = function (contents, filename) {
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
    Cordova.prototype.unpatchXcodeBuildScripts = function (proj) {
        var scripts = proj.hash.project.objects.PBXShellScriptBuildPhase || {};
        var firstTarget = proj.getFirstTarget().uuid;
        var nativeTargets = proj.hash.project.objects.PBXNativeTarget;
        // scripts to kill entirely.
        for (var _i = 0, _a = Object.keys(scripts); _i < _a.length; _i++) {
            var key = _a[_i];
            var script = scripts[key];
            // ignore comments and keys that got deleted
            if (typeof script === 'string' || script === undefined) {
                continue;
            }
            if (script.shellScript.match(/SENTRY_PROPERTIES/) ||
                script.shellScript.match(/SENTRY_FRAMEWORK_PATCH/)) {
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
    Cordova.prototype.patchXcodeProj = function (contents, filename) {
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
                _this.addNewXcodeBuildPhaseForSymbols(buildScripts, proj);
                _this.addNewXcodeBuildPhaseForStripping(buildScripts, proj);
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
    Cordova.prototype.addNewXcodeBuildPhaseForSymbols = function (buildScripts, proj) {
        for (var _i = 0, buildScripts_1 = buildScripts; _i < buildScripts_1.length; _i++) {
            var script = buildScripts_1[_i];
            if (script.shellScript.match(/SENTRY_PROPERTIES/)) {
                return;
            }
        }
        var cwd = path.join(process.cwd(), 'sentry.properties');
        proj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Upload Debug Symbols to Sentry', null, {
            shellPath: '/bin/sh',
            shellScript: 'echo "warning: uploading debug symbols - set SENTRY_SKIP_DSYM_UPLOAD=true to skip this"\\n' +
                'if [ -n "$SENTRY_SKIP_DSYM_UPLOAD" ]; then\\n' +
                '  echo "warning: skipping debug symbol upload"\\n' +
                '  exit 0\\n' +
                'fi\\n' +
                'export SENTRY_PROPERTIES=' +
                cwd +
                '\\n' +
                'function getProperty {\\n' +
                '    PROP_KEY=$1\\n' +
                '    PROP_VALUE=`cat $SENTRY_PROPERTIES | grep "$PROP_KEY" | cut -d\'=\' -f2`\\n' +
                '    echo $PROP_VALUE\\n' +
                '}\\n' +
                'if [ ! -f $SENTRY_PROPERTIES ]; then\\n' +
                '  echo "warning: SENTRY: sentry.properties file not found! Skipping symbol upload."\\n' +
                '  exit 0\\n' +
                'fi\\n' +
                'echo "# Reading property from $SENTRY_PROPERTIES"\\n' +
                'SENTRY_CLI=$(getProperty "cli.executable")\\n' +
                'SENTRY_COMMAND="../../$SENTRY_CLI upload-dsym"\\n' +
                '$SENTRY_COMMAND',
        });
    };
    Cordova.prototype.addNewXcodeBuildPhaseForStripping = function (buildScripts, proj) {
        for (var _i = 0, buildScripts_2 = buildScripts; _i < buildScripts_2.length; _i++) {
            var script = buildScripts_2[_i];
            if (script.shellScript.match(/SENTRY_FRAMEWORK_PATCH/)) {
                return;
            }
        }
        // tslint:disable:no-invalid-template-strings
        // http://ikennd.ac/blog/2015/02/stripping-unwanted-architectures-from-dynamic-libraries-in-xcode/
        proj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Sentry strip unused archs from Framework', null, {
            shellPath: '/bin/sh',
            shellScript: '# SENTRY_FRAMEWORK_PATCH \\n' +
                'echo "warning: patching framework - set SENTRY_SKIP_FRAMEWORK_PATCH=true to skip this"\\n' +
                'if [ -n "$SENTRY_SKIP_FRAMEWORK_PATCH" ]; then\\n' +
                '  echo "warning: skipping framework patch"\\n' +
                '  exit 0\\n' +
                'fi\\n' +
                'APP_PATH="${TARGET_BUILD_DIR}/${WRAPPER_NAME}"\\n' +
                'find "$APP_PATH" -name \'Sentry*.framework\' -type d | while read -r FRAMEWORK\\n' +
                'do\\n' +
                'FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)\\n' +
                'FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"\\n' +
                'echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"\\n' +
                'EXTRACTED_ARCHS=()\\n' +
                'for ARCH in $ARCHS\\n' +
                'do\\n' +
                'echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"\\n' +
                'lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"\\n' +
                'EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")\\n' +
                'done\\n' +
                'echo "Merging extracted architectures: ${ARCHS}"\\n' +
                'lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "${EXTRACTED_ARCHS[@]}"\\n' +
                'rm "${EXTRACTED_ARCHS[@]}"\\n' +
                'echo "Replacing original executable with thinned version"\\n' +
                'rm "$FRAMEWORK_EXECUTABLE_PATH"\\n' +
                'mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"\\n' +
                'done',
        });
        // tslint:enable:no-invalid-template-strings
    };
    Cordova.prototype.addSentryProperties = function (properties) {
        var _this = this;
        var rv = Promise.resolve();
        var fn = path.join('sentry.properties');
        if (File_1.exists(fn)) {
            return rv;
        }
        rv = rv.then(function () {
            return fs.writeFileSync(fn, _this.sentryCli.dumpProperties(properties));
        });
        return rv;
    };
    return Cordova;
}(BaseIntegration_1.BaseIntegration));
exports.Cordova = Cordova;
//# sourceMappingURL=Cordova.js.map