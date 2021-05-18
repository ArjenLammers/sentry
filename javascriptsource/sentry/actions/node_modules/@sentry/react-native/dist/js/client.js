import { BaseClient } from "@sentry/core";
import { ReactNativeBackend } from "./backend";
/**
 * The Sentry React Native SDK Client.
 *
 * @see ReactNativeOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export class ReactNativeClient extends BaseClient {
    /**
     * Creates a new React Native SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options) {
        super(ReactNativeBackend, options);
    }
    /**
     * If native client is available it will trigger a native crash.
     * Use this only for testing purposes.
     */
    nativeCrash() {
        this._getBackend().nativeCrash();
    }
}
//# sourceMappingURL=client.js.map