import { BeforeNavigate } from "./reactnativetracing";
import { RoutingInstrumentation, TransactionCreator } from "./routingInstrumentation";
export interface NavigationRouteV5 {
    name: string;
    key: string;
    params?: Record<string, any>;
}
interface ReactNavigationV5Options {
    /**
     * The time the transaction will wait for route to mount before it is discarded.
     */
    routeChangeTimeoutMs: number;
}
/**
 * Instrumentation for React-Navigation V5. See docs or sample app for usage.
 *
 * How this works:
 * - `_onDispatch` is called every time a dispatch happens and sets an IdleTransaction on the scope without any route context.
 * - `_onStateChange` is then called AFTER the state change happens due to a dispatch and sets the route context onto the active transaction.
 * - If `_onStateChange` isn't called within `STATE_CHANGE_TIMEOUT_DURATION` of the dispatch, then the transaction is not sampled and finished.
 */
export declare class ReactNavigationV5Instrumentation extends RoutingInstrumentation {
    static instrumentationName: string;
    private _navigationContainer;
    private readonly _maxRecentRouteLen;
    private _latestRoute?;
    private _latestTransaction?;
    private _initialStateHandled;
    private _stateChangeTimeout?;
    private _recentRouteKeys;
    private _options;
    constructor(options?: Partial<ReactNavigationV5Options>);
    /**
     * Extends by calling _handleInitialState at the end.
     */
    registerRoutingInstrumentation(listener: TransactionCreator, beforeNavigate: BeforeNavigate): void;
    /**
     * Pass the ref to the navigation container to register it to the instrumentation
     * @param navigationContainerRef Ref to a `NavigationContainer`
     */
    registerNavigationContainer(navigationContainerRef: any): void;
    /**
     * To be called on every React-Navigation action dispatch.
     * It does not name the transaction or populate it with route information. Instead, it waits for the state to fully change
     * and gets the route information from there, @see _onStateChange
     */
    private _onDispatch;
    /**
     * To be called AFTER the state has been changed to populate the transaction with the current route.
     */
    private _onStateChange;
    /** Pushes a recent route key, and removes earlier routes when there is greater than the max length */
    private _pushRecentRouteKey;
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    private _discardLatestTransaction;
}
export declare const BLANK_TRANSACTION_CONTEXT_V5: {
    name: string;
    op: string;
    tags: {
        "routing.instrumentation": string;
    };
    data: {};
};
export {};
//# sourceMappingURL=reactnavigationv5.d.ts.map