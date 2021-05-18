import { Breadcrumb, Event, Response, Severity, User } from "@sentry/types";
import { SentryError } from "@sentry/utils";
import { ReactNativeOptions } from "./options";
/**
 * Our internal interface for calling native functions
 */
export declare const NATIVE: {
    /**
     * Sending the event over the bridge to native
     * @param event Event
     */
    sendEvent(event: Event): Promise<Response>;
    /**
     * Starts native with the provided options.
     * @param options ReactNativeOptions
     */
    startWithOptions(_options: ReactNativeOptions): Promise<boolean>;
    /**
     * Fetches the release from native
     */
    fetchRelease(): Promise<{
        build: string;
        id: string;
        version: string;
    }>;
    /**
     * Fetches the device contexts. Not used on Android.
     */
    deviceContexts(): Promise<{
        [key: string]: Record<string, unknown>;
    }>;
    /**
     * Sets log level in native
     * @param level number
     */
    setLogLevel(level: number): void;
    /**
     * Triggers a native crash.
     * Use this only for testing purposes.
     */
    crash(): void;
    /**
     * Sets the user in the native scope.
     * Passing null clears the user.
     * @param key string
     * @param value string
     */
    setUser(user: User | null): void;
    /**
     * Sets a tag in the native module.
     * @param key string
     * @param value string
     */
    setTag(key: string, value: string): void;
    /**
     * Sets an extra in the native scope, will stringify
     * extra value if it isn't already a string.
     * @param key string
     * @param extra any
     */
    setExtra(key: string, extra: unknown): void;
    /**
     * Adds breadcrumb to the native scope.
     * @param breadcrumb Breadcrumb
     */
    addBreadcrumb(breadcrumb: Breadcrumb): void;
    /**
     * Clears breadcrumbs on the native scope.
     */
    clearBreadcrumbs(): void;
    /**
     * Sets context on the native scope. Not implemented in Android yet.
     * @param key string
     * @param context key-value map
     */
    setContext(key: string, context: {
        [key: string]: unknown;
    } | null): void;
    /**
     * Serializes all values of root-level keys into strings.
     * @param data key-value map.
     * @returns An object where all root-level values are strings.
     */
    _serializeObject(data: {
        [key: string]: unknown;
    }): {
        [key: string]: string;
    };
    /**
     * Convert js severity level which has critical and log to more widely supported levels.
     * @param level
     * @returns More widely supported Severity level strings
     */
    _processLevel(level: Severity): Severity;
    /**
     * Checks whether the RNSentry module is loaded.
     */
    isModuleLoaded(): boolean;
    /**
     *  Checks whether the RNSentry module is loaded and the native client is available
     */
    isNativeClientAvailable(): boolean;
    /**
     *  Checks whether the RNSentry module is loaded and native transport is available
     */
    isNativeTransportAvailable(): boolean;
    _DisabledNativeError: SentryError;
    _NativeClientError: SentryError;
    enableNative: boolean;
    platform: "ios" | "android" | "macos" | "windows" | "web";
};
//# sourceMappingURL=wrapper.d.ts.map