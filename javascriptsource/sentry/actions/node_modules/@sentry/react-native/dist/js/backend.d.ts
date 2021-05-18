import { BaseBackend } from "@sentry/core";
import { BrowserOptions } from "@sentry/react";
import { Event, EventHint, Severity, Transport } from "@sentry/types";
import { ReactNativeOptions } from "./options";
/** The Sentry ReactNative SDK Backend. */
export declare class ReactNativeBackend extends BaseBackend<BrowserOptions> {
    protected readonly _options: ReactNativeOptions;
    private readonly _browserBackend;
    /** Creates a new ReactNative backend instance. */
    constructor(_options: ReactNativeOptions);
    /**
     * If native client is available it will trigger a native crash.
     * Use this only for testing purposes.
     */
    nativeCrash(): void;
    /**
     * @inheritDoc
     */
    eventFromException(exception: unknown, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: string, level?: Severity, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    protected _setupTransport(): Transport;
    /**
     * If true, native client is availabe and active
     */
    private _isNativeTransportAvailable;
    /**
     * Starts native client with dsn and options
     */
    private _startWithOptions;
    /**
     * If the user is in development mode, and the native nagger is enabled then it will show an alert.
     */
    private _showCannotConnectDialog;
}
//# sourceMappingURL=backend.d.ts.map