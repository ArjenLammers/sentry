import { __assign } from "tslib";
import { getGlobalObject } from '@sentry/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import * as React from 'react';
/* eslint-enable @typescript-eslint/no-explicit-any */
var global = getGlobalObject();
var activeTransaction;
export function reactRouterV4Instrumentation(history, routes, matchPath) {
    return reactRouterInstrumentation(history, 'react-router-v4', routes, matchPath);
}
export function reactRouterV5Instrumentation(history, routes, matchPath) {
    return reactRouterInstrumentation(history, 'react-router-v5', routes, matchPath);
}
function reactRouterInstrumentation(history, name, allRoutes, matchPath) {
    if (allRoutes === void 0) { allRoutes = []; }
    function getName(pathname) {
        if (allRoutes === [] || !matchPath) {
            return pathname;
        }
        var branches = matchRoutes(allRoutes, pathname, matchPath);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (var x = 0; x < branches.length; x++) {
            if (branches[x].match.isExact) {
                return branches[x].match.path;
            }
        }
        return pathname;
    }
    return function (startTransaction, startTransactionOnPageLoad, startTransactionOnLocationChange) {
        if (startTransactionOnPageLoad === void 0) { startTransactionOnPageLoad = true; }
        if (startTransactionOnLocationChange === void 0) { startTransactionOnLocationChange = true; }
        if (startTransactionOnPageLoad && global && global.location) {
            activeTransaction = startTransaction({
                name: getName(global.location.pathname),
                op: 'pageload',
                tags: {
                    'routing.instrumentation': name,
                },
            });
        }
        if (startTransactionOnLocationChange && history.listen) {
            history.listen(function (location, action) {
                if (action && (action === 'PUSH' || action === 'POP')) {
                    if (activeTransaction) {
                        activeTransaction.finish();
                    }
                    var tags = {
                        'routing.instrumentation': name,
                    };
                    activeTransaction = startTransaction({
                        name: getName(location.pathname),
                        op: 'navigation',
                        tags: tags,
                    });
                }
            });
        }
    };
}
/**
 * Matches a set of routes to a pathname
 * Based on implementation from
 */
function matchRoutes(routes, pathname, matchPath, branch) {
    if (branch === void 0) { branch = []; }
    routes.some(function (route) {
        var match = route.path
            ? matchPath(pathname, route)
            : branch.length
                ? branch[branch.length - 1].match // use parent match
                : computeRootMatch(pathname); // use default "root" match
        if (match) {
            branch.push({ route: route, match: match });
            if (route.routes) {
                matchRoutes(route.routes, pathname, matchPath, branch);
            }
        }
        return !!match;
    });
    return branch;
}
function computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withSentryRouting(Route) {
    var componentDisplayName = Route.displayName || Route.name;
    var WrappedRoute = function (props) {
        if (activeTransaction && props && props.computedMatch && props.computedMatch.isExact) {
            activeTransaction.setName(props.computedMatch.path);
        }
        return React.createElement(Route, __assign({}, props));
    };
    WrappedRoute.displayName = "sentryRoute(" + componentDisplayName + ")";
    hoistNonReactStatics(WrappedRoute, Route);
    return WrappedRoute;
}
//# sourceMappingURL=reactrouter.js.map