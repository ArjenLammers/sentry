import { BaseClient } from "@sentry/core";
import { ReactNativeBackend } from "./backend";
import { ReactNativeOptions } from "./options";
/**
 * The Sentry React Native SDK Client.
 *
 * @see ReactNativeOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export declare class ReactNativeClient extends BaseClient<ReactNativeBackend, ReactNativeOptions> {
    /**
     * Creates a new React Native SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options: ReactNativeOptions);
    /**
     * If native client is available it will trigger a native crash.
     * Use this only for testing purposes.
     */
    nativeCrash(): void;
}
//# sourceMappingURL=client.d.ts.map