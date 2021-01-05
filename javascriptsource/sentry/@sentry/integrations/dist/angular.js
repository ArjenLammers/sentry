Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("@sentry/utils");
// See https://github.com/angular/angular.js/blob/v1.4.7/src/minErr.js
var angularPattern = /^\[((?:[$a-zA-Z0-9]+:)?(?:[$a-zA-Z0-9]+))\] (.*?)\n?(\S+)$/;
/**
 * AngularJS integration
 *
 * Provides an $exceptionHandler for AngularJS
 */
var Angular = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function Angular(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = Angular.id;
        utils_1.logger.log('You are still using the Angular integration, consider moving to @sentry/angular');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        this._angular = options.angular || utils_1.getGlobalObject().angular;
        if (!this._angular) {
            utils_1.logger.error('AngularIntegration is missing an Angular instance');
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this._module = this._angular.module(Angular.moduleName, []);
    }
    /**
     * @inheritDoc
     */
    Angular.prototype.setupOnce = function (_, getCurrentHub) {
        var _this = this;
        if (!this._module) {
            return;
        }
        this._getCurrentHub = getCurrentHub;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this._module.config([
            '$provide',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function ($provide) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                $provide.decorator('$exceptionHandler', ['$delegate', _this._$exceptionHandlerDecorator.bind(_this)]);
            },
        ]);
    };
    /**
     * Angular's exceptionHandler for Sentry integration
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Angular.prototype._$exceptionHandlerDecorator = function ($delegate) {
        var _this = this;
        return function (exception, cause) {
            var hub = _this._getCurrentHub && _this._getCurrentHub();
            if (hub && hub.getIntegration(Angular)) {
                hub.withScope(function (scope) {
                    if (cause) {
                        scope.setExtra('cause', cause);
                    }
                    scope.addEventProcessor(function (event) {
                        var ex = event.exception && event.exception.values && event.exception.values[0];
                        if (ex) {
                            var matches = angularPattern.exec(ex.value || '');
                            if (matches) {
                                // This type now becomes something like: $rootScope:inprog
                                ex.type = matches[1];
                                ex.value = matches[2];
                                event.message = ex.type + ": " + ex.value;
                                // auto set a new tag specifically for the angular error url
                                event.extra = tslib_1.__assign(tslib_1.__assign({}, event.extra), { angularDocs: matches[3].substr(0, 250) });
                            }
                        }
                        return event;
                    });
                    hub.captureException(exception);
                });
            }
            $delegate(exception, cause);
        };
    };
    /**
     * @inheritDoc
     */
    Angular.id = 'AngularJS';
    /**
     * moduleName used in Angular's DI resolution algorithm
     */
    Angular.moduleName = 'ngSentry';
    return Angular;
}());
exports.Angular = Angular;
//# sourceMappingURL=angular.js.map