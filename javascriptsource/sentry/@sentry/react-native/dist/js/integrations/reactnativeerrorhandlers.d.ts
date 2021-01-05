import { Integration } from "@sentry/types";
/** ReactNativeErrorHandlers Options */
interface ReactNativeErrorHandlersOptions {
    onerror: boolean;
    onunhandledrejection: boolean;
}
/** ReactNativeErrorHandlers Integration */
export declare class ReactNativeErrorHandlers implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** ReactNativeOptions */
    private readonly _options;
    /** Constructor */
    constructor(options?: ReactNativeErrorHandlersOptions);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * Handle Promises
     */
    private _handleUnhandledRejections;
    /**
     * Handle erros
     */
    private _handleOnError;
}
export {};
//# sourceMappingURL=reactnativeerrorhandlers.d.ts.map