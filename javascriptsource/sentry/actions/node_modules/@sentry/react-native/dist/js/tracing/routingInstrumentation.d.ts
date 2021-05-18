import { Hub } from "@sentry/hub";
import { Transaction, TransactionContext } from "@sentry/types";
import { BeforeNavigate } from "./reactnativetracing";
export declare type TransactionCreator = (context: TransactionContext) => Transaction | undefined;
export interface RoutingInstrumentationInstance {
    /**
     * Registers a listener that's called on every route change with a `TransactionContext`.
     *
     * Do not overwrite this unless you know what you are doing.
     *
     * @param listener A `RouteListener`
     * @param beforeNavigate BeforeNavigate
     */
    registerRoutingInstrumentation(listener: TransactionCreator, beforeNavigate: BeforeNavigate): void;
    /**
     * To be called when the route changes, BEFORE the new route mounts.
     * If this is called after a route mounts the child spans will not be correctly attached.
     *
     * @param context A `TransactionContext` used to initialize the transaction.
     */
    onRouteWillChange(context: TransactionContext): Transaction | undefined;
}
/**
 * Base Routing Instrumentation. Can be used by users to manually instrument custom routers.
 * Pass this to the tracing integration, and call `onRouteWillChange` every time before a route changes.
 */
export declare class RoutingInstrumentation implements RoutingInstrumentationInstance {
    protected _getCurrentHub?: () => Hub;
    protected _beforeNavigate?: BeforeNavigate;
    private _tracingListener?;
    /** @inheritdoc */
    registerRoutingInstrumentation(listener: TransactionCreator, beforeNavigate: BeforeNavigate): void;
    /** @inheritdoc */
    onRouteWillChange(context: TransactionContext): Transaction | undefined;
}
//# sourceMappingURL=routingInstrumentation.d.ts.map