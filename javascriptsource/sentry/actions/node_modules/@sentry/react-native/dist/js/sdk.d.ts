import { ReactNativeOptions } from "./options";
/**
 * Inits the SDK
 */
export declare function init(passedOptions: ReactNativeOptions): void;
/**
 * Deprecated. Sets the release on the event.
 * NOTE: Does not set the release on sessions.
 * @deprecated
 */
export declare function setRelease(release: string): void;
/**
 * Deprecated. Sets the dist on the event.
 * NOTE: Does not set the dist on sessions.
 * @deprecated
 */
export declare function setDist(dist: string): void;
/**
 * If native client is available it will trigger a native crash.
 * Use this only for testing purposes.
 */
export declare function nativeCrash(): void;
//# sourceMappingURL=sdk.d.ts.map