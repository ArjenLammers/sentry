/**
 * Base Routing Instrumentation. Can be used by users to manually instrument custom routers.
 * Pass this to the tracing integration, and call `onRouteWillChange` every time before a route changes.
 */
export class RoutingInstrumentation {
    /** @inheritdoc */
    registerRoutingInstrumentation(listener, beforeNavigate) {
        this._tracingListener = listener;
        this._beforeNavigate = beforeNavigate;
    }
    /** @inheritdoc */
    onRouteWillChange(context) {
        var _a;
        return (_a = this._tracingListener) === null || _a === void 0 ? void 0 : _a.call(this, context);
    }
}
//# sourceMappingURL=routingInstrumentation.js.map