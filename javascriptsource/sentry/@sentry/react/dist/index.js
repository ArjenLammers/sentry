Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browser_1 = require("@sentry/browser");
/**
 * A global side effect that makes sure Sentry events that user
 * `@sentry/react` will correctly have Sentry events associated
 * with it.
 */
function createReactEventProcessor() {
    if (browser_1.addGlobalEventProcessor) {
        browser_1.addGlobalEventProcessor(function (event) {
            event.sdk = tslib_1.__assign(tslib_1.__assign({}, event.sdk), { name: 'sentry.javascript.react', packages: tslib_1.__spread(((event.sdk && event.sdk.packages) || []), [
                    {
                        name: 'npm:@sentry/react',
                        version: browser_1.SDK_VERSION,
                    },
                ]), version: browser_1.SDK_VERSION });
            return event;
        });
    }
}
tslib_1.__exportStar(require("@sentry/browser"), exports);
var profiler_1 = require("./profiler");
exports.Profiler = profiler_1.Profiler;
exports.withProfiler = profiler_1.withProfiler;
exports.useProfiler = profiler_1.useProfiler;
var errorboundary_1 = require("./errorboundary");
exports.ErrorBoundary = errorboundary_1.ErrorBoundary;
exports.withErrorBoundary = errorboundary_1.withErrorBoundary;
var redux_1 = require("./redux");
exports.createReduxEnhancer = redux_1.createReduxEnhancer;
var reactrouterv3_1 = require("./reactrouterv3");
exports.reactRouterV3Instrumentation = reactrouterv3_1.reactRouterV3Instrumentation;
var reactrouter_1 = require("./reactrouter");
exports.reactRouterV4Instrumentation = reactrouter_1.reactRouterV4Instrumentation;
exports.reactRouterV5Instrumentation = reactrouter_1.reactRouterV5Instrumentation;
exports.withSentryRouting = reactrouter_1.withSentryRouting;
createReactEventProcessor();
//# sourceMappingURL=index.js.map