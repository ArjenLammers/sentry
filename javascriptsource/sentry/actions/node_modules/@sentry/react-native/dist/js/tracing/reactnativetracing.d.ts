import { RequestInstrumentationOptions } from "@sentry/tracing";
import { EventProcessor, Hub, Integration, TransactionContext } from "@sentry/types";
import { RoutingInstrumentationInstance } from "../tracing/routingInstrumentation";
export declare type BeforeNavigate = (context: TransactionContext) => TransactionContext;
export interface ReactNativeTracingOptions extends RequestInstrumentationOptions {
    /**
     * The time to wait in ms until the transaction will be finished. The transaction will use the end timestamp of
     * the last finished span as the endtime for the transaction.
     * Time is in ms.
     *
     * Default: 1000
     */
    idleTimeout: number;
    /**
     * The maximum duration of a transaction before it will be marked as "deadline_exceeded".
     * If you never want to mark a transaction set it to 0.
     * Time is in seconds.
     *
     * Default: 600
     */
    maxTransactionDuration: number;
    /**
     * The routing instrumentation to be used with the tracing integration.
     * There is no routing instrumentation if nothing is passed.
     */
    routingInstrumentation?: RoutingInstrumentationInstance;
    /**
     * Does not sample transactions that are from routes that have been seen any more and don't have any spans.
     * This removes a lot of the clutter as most back navigation transactions are now ignored.
     *
     * Default: true
     */
    ignoreEmptyBackNavigationTransactions: boolean;
    /**
     * beforeNavigate is called before a navigation transaction is created and allows users to modify transaction
     * context data, or drop the transaction entirely (by setting `sampled = false` in the context).
     *
     * @param context: The context data which will be passed to `startTransaction` by default
     *
     * @returns A (potentially) modified context object, with `sampled = false` if the transaction should be dropped.
     */
    beforeNavigate: BeforeNavigate;
}
/**
 * Tracing integration for React Native.
 */
export declare class ReactNativeTracing implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** ReactNativeTracing options */
    options: ReactNativeTracingOptions;
    private _getCurrentHub?;
    constructor(options?: Partial<ReactNativeTracingOptions>);
    /**
     *  Registers routing and request instrumentation.
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void;
    /** To be called when the route changes, but BEFORE the components of the new route mount. */
    private _onRouteWillChange;
    /** Create routing idle transaction. */
    private _createRouteTransaction;
}
//# sourceMappingURL=reactnativetracing.d.ts.map