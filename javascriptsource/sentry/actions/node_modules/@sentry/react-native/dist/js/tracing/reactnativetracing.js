import { defaultRequestInstrumentationOptions, registerRequestInstrumentation, startIdleTransaction, } from "@sentry/tracing";
import { logger } from "@sentry/utils";
import { adjustTransactionDuration } from "./utils";
const defaultReactNativeTracingOptions = Object.assign(Object.assign({}, defaultRequestInstrumentationOptions), { idleTimeout: 1000, maxTransactionDuration: 600, ignoreEmptyBackNavigationTransactions: true, beforeNavigate: (context) => context });
/**
 * Tracing integration for React Native.
 */
export class ReactNativeTracing {
    constructor(options = {}) {
        /**
         * @inheritDoc
         */
        this.name = ReactNativeTracing.id;
        this.options = Object.assign(Object.assign({}, defaultReactNativeTracingOptions), options);
    }
    /**
     *  Registers routing and request instrumentation.
     */
    setupOnce(
    // @ts-ignore TODO
    addGlobalEventProcessor, getCurrentHub) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { traceFetch, traceXHR, tracingOrigins, 
        // @ts-ignore TODO
        shouldCreateSpanForRequest, routingInstrumentation, } = this.options;
        this._getCurrentHub = getCurrentHub;
        routingInstrumentation === null || routingInstrumentation === void 0 ? void 0 : routingInstrumentation.registerRoutingInstrumentation(this._onRouteWillChange.bind(this), this.options.beforeNavigate);
        if (!routingInstrumentation) {
            logger.log(`[ReactNativeTracing] Not instrumenting route changes as routingInstrumentation has not been set.`);
        }
        registerRequestInstrumentation({
            traceFetch,
            traceXHR,
            tracingOrigins,
            shouldCreateSpanForRequest,
        });
    }
    /** To be called when the route changes, but BEFORE the components of the new route mount. */
    _onRouteWillChange(context) {
        // TODO: Consider more features on route change, one example is setting a tag of what route the user is on
        return this._createRouteTransaction(context);
    }
    /** Create routing idle transaction. */
    _createRouteTransaction(context) {
        if (!this._getCurrentHub) {
            logger.warn(`[ReactNativeTracing] Did not create ${context.op} transaction because _getCurrentHub is invalid.`);
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { idleTimeout, maxTransactionDuration } = this.options;
        const expandedContext = Object.assign(Object.assign({}, context), { trimEnd: true });
        const hub = this._getCurrentHub();
        const idleTransaction = startIdleTransaction(hub, expandedContext, idleTimeout, true);
        logger.log(`[ReactNativeTracing] Starting ${context.op} transaction "${context.name}" on scope`);
        idleTransaction.registerBeforeFinishCallback((transaction, endTimestamp) => {
            adjustTransactionDuration(maxTransactionDuration, transaction, endTimestamp);
        });
        if (this.options.ignoreEmptyBackNavigationTransactions) {
            idleTransaction.registerBeforeFinishCallback((transaction) => {
                var _a, _b;
                if (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ((_b = (_a = transaction.data) === null || _a === void 0 ? void 0 : _a.route) === null || _b === void 0 ? void 0 : _b.hasBeenSeen) &&
                    (!transaction.spanRecorder ||
                        transaction.spanRecorder.spans.filter((span) => span.spanId !== transaction.spanId).length === 0)) {
                    logger.log(`[ReactNativeTracing] Not sampling transaction as route has been seen before. Pass ignoreEmptyBackNavigationTransactions = false to disable this feature.`);
                    // Route has been seen before and has no child spans.
                    transaction.sampled = false;
                }
            });
        }
        return idleTransaction;
    }
}
/**
 * @inheritDoc
 */
ReactNativeTracing.id = "ReactNativeTracing";
//# sourceMappingURL=reactnativetracing.js.map