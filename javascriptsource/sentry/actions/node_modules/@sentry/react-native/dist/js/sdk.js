import { initAndBind, setExtra } from "@sentry/core";
import { Hub, makeMain } from "@sentry/hub";
import { RewriteFrames } from "@sentry/integrations";
import { defaultIntegrations, getCurrentHub } from "@sentry/react";
import { getGlobalObject } from "@sentry/utils";
import { ReactNativeClient } from "./client";
import { DebugSymbolicator, DeviceContext, ReactNativeErrorHandlers, Release, } from "./integrations";
import { ReactNativeScope } from "./scope";
const IGNORED_DEFAULT_INTEGRATIONS = [
    "GlobalHandlers",
    "TryCatch",
];
const DEFAULT_OPTIONS = {
    enableNative: true,
    enableNativeCrashHandling: true,
    enableNativeNagger: true,
    autoInitializeNativeSdk: true,
};
/**
 * Inits the SDK
 */
export function init(passedOptions) {
    const reactNativeHub = new Hub(undefined, new ReactNativeScope());
    makeMain(reactNativeHub);
    const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), passedOptions);
    if (options.defaultIntegrations === undefined) {
        options.defaultIntegrations = [
            new ReactNativeErrorHandlers(),
            new Release(),
            ...defaultIntegrations.filter((i) => !IGNORED_DEFAULT_INTEGRATIONS.includes(i.name)),
        ];
        if (__DEV__) {
            options.defaultIntegrations.push(new DebugSymbolicator());
        }
        options.defaultIntegrations.push(new RewriteFrames({
            iteratee: (frame) => {
                if (frame.filename) {
                    frame.filename = frame.filename
                        .replace(/^file:\/\//, "")
                        .replace(/^address at /, "")
                        .replace(/^.*\/[^.]+(\.app|CodePush|.*(?=\/))/, "");
                    if (frame.filename !== "[native code]" &&
                        frame.filename !== "native") {
                        const appPrefix = "app://";
                        // We always want to have a triple slash
                        frame.filename =
                            frame.filename.indexOf("/") === 0
                                ? `${appPrefix}${frame.filename}`
                                : `${appPrefix}/${frame.filename}`;
                    }
                }
                return frame;
            },
        }));
        if (options.enableNative) {
            options.defaultIntegrations.push(new DeviceContext());
        }
    }
    initAndBind(ReactNativeClient, options);
    // set the event.origin tag.
    getCurrentHub().setTag("event.origin", "javascript");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (getGlobalObject().HermesInternal) {
        getCurrentHub().setTag("hermes", "true");
    }
}
/**
 * Deprecated. Sets the release on the event.
 * NOTE: Does not set the release on sessions.
 * @deprecated
 */
export function setRelease(release) {
    setExtra("__sentry_release", release);
}
/**
 * Deprecated. Sets the dist on the event.
 * NOTE: Does not set the dist on sessions.
 * @deprecated
 */
export function setDist(dist) {
    setExtra("__sentry_dist", dist);
}
/**
 * If native client is available it will trigger a native crash.
 * Use this only for testing purposes.
 */
export function nativeCrash() {
    const client = getCurrentHub().getClient();
    if (client) {
        client.nativeCrash();
    }
}
//# sourceMappingURL=sdk.js.map