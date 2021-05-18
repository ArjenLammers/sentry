import { getCurrentHub } from "@sentry/core";
import { Severity } from "@sentry/types";
import { getGlobalObject, logger } from "@sentry/utils";
/** ReactNativeErrorHandlers Integration */
export class ReactNativeErrorHandlers {
    /** Constructor */
    constructor(options) {
        /**
         * @inheritDoc
         */
        this.name = ReactNativeErrorHandlers.id;
        this._options = Object.assign({ onerror: true, onunhandledrejection: true }, options);
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        this._handleUnhandledRejections();
        this._handleOnError();
    }
    /**
     * Handle Promises
     */
    _handleUnhandledRejections() {
        var _a, _b;
        if (this._options.onunhandledrejection) {
            const tracking = require("promise/setimmediate/rejection-tracking");
            tracking.disable();
            tracking.enable({
                allRejections: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onUnhandled: (id, error) => {
                    if (__DEV__) {
                        // We mimic the behavior of unhandled promise rejections showing up as a warning.
                        // eslint-disable-next-line no-console
                        console.warn(id, error);
                    }
                    getCurrentHub().captureException(error, {
                        data: { id },
                        originalException: error,
                    });
                },
            });
            /* eslint-disable
              @typescript-eslint/no-var-requires,
              import/no-extraneous-dependencies,
              @typescript-eslint/no-explicit-any,
              @typescript-eslint/no-unsafe-member-access
            */
            const Promise = require("promise/setimmediate/core");
            const _global = getGlobalObject();
            /* In newer RN versions >=0.63, the global promise is not the same reference as the one imported from the promise library.
              Due to this, we need to take the methods that tracking.enable sets, and then set them on the global promise.
              Note: We do not want to overwrite the whole promise in case there are extensions present.
      
              If the global promise is the same as the imported promise (expected in RN <0.63), we do nothing.
            */
            const _onHandle = (_a = Promise._onHandle) !== null && _a !== void 0 ? _a : Promise._Y;
            const _onReject = (_b = Promise._onReject) !== null && _b !== void 0 ? _b : Promise._Z;
            if (Promise !== _global.Promise &&
                typeof _onHandle !== "undefined" &&
                typeof _onReject !== "undefined") {
                if ("_onHandle" in _global.Promise && "_onReject" in _global.Promise) {
                    _global.Promise._onHandle = _onHandle;
                    _global.Promise._onReject = _onReject;
                }
                else if ("_Y" in _global.Promise && "_Z" in _global.Promise) {
                    _global.Promise._Y = _onHandle;
                    _global.Promise._Z = _onReject;
                }
            }
            /* eslint-enable
              @typescript-eslint/no-var-requires,
              import/no-extraneous-dependencies,
              @typescript-eslint/no-explicit-any,
              @typescript-eslint/no-unsafe-member-access
            */
        }
    }
    /**
     * Handle erros
     */
    _handleOnError() {
        if (this._options.onerror) {
            let handlingFatal = false;
            const defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();
            ErrorUtils.setGlobalHandler((error, isFatal) => {
                // We want to handle fatals, but only in production mode.
                const shouldHandleFatal = isFatal && !__DEV__;
                if (shouldHandleFatal) {
                    if (handlingFatal) {
                        logger.log("Encountered multiple fatals in a row. The latest:", error);
                        return;
                    }
                    handlingFatal = true;
                }
                getCurrentHub().withScope((scope) => {
                    if (isFatal) {
                        scope.setLevel(Severity.Fatal);
                    }
                    getCurrentHub().captureException(error, {
                        originalException: error,
                    });
                });
                const client = getCurrentHub().getClient();
                // If in dev, we call the default handler anyway and hope the error will be sent
                // Just for a better dev experience
                if (client && !__DEV__) {
                    void client
                        .flush(client.getOptions().shutdownTimeout || 2000)
                        .then(() => {
                        defaultHandler(error, isFatal);
                    });
                }
                else {
                    // If there is no client something is fishy, anyway we call the default handler
                    defaultHandler(error, isFatal);
                }
            });
        }
    }
}
/**
 * @inheritDoc
 */
ReactNativeErrorHandlers.id = "ReactNativeErrorHandlers";
//# sourceMappingURL=reactnativeerrorhandlers.js.map