import { EventProcessor, Hub, Integration, Scope, Transaction } from '@sentry/types';
/** Global Vue object limited to the methods/attributes we require */
interface VueInstance {
    config: {
        errorHandler?(error: Error, vm?: ViewModel, info?: string): void;
    };
    util?: {
        warn(...input: any): void;
    };
    mixin(hooks: {
        [key: string]: () => void;
    }): void;
}
/** Representation of Vue component internals */
interface ViewModel {
    [key: string]: any;
    $root: object;
    $options: {
        [key: string]: any;
        name?: string;
        propsData?: {
            [key: string]: any;
        };
        _componentTag?: string;
        __file?: string;
        $_sentryPerfHook?: boolean;
    };
    $once(hook: string, cb: () => void): void;
}
/** Vue Integration configuration */
interface IntegrationOptions {
    /** Vue instance to be used inside the integration */
    Vue: VueInstance;
    /**
     * When set to `false`, Sentry will suppress reporting of all props data
     * from your Vue components for privacy concerns.
     */
    attachProps: boolean;
    /**
     * When set to `true`, original Vue's `logError` will be called as well.
     * https://github.com/vuejs/vue/blob/c2b1cfe9ccd08835f2d99f6ce60f67b4de55187f/src/core/util/error.js#L38-L48
     */
    logErrors: boolean;
    /**
     * When set to `true`, enables tracking of components lifecycle performance.
     * It requires `Tracing` integration to be also enabled.
     */
    tracing: boolean;
    /** {@link TracingOptions} */
    tracingOptions: TracingOptions;
}
/** Vue specific configuration for Tracing Integration  */
interface TracingOptions {
    /**
     * Decides whether to track components by hooking into its lifecycle methods.
     * Can be either set to `boolean` to enable/disable tracking for all of them.
     * Or to an array of specific component names (case-sensitive).
     */
    trackComponents: boolean | string[];
    /** How long to wait until the tracked root activity is marked as finished and sent of to Sentry */
    timeout: number;
    /**
     * List of hooks to keep track of during component lifecycle.
     * Available hooks: 'activate' | 'create' | 'destroy' | 'mount' | 'update'
     * Based on https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
     */
    hooks: Operation[];
}
declare type Operation = 'activate' | 'create' | 'destroy' | 'mount' | 'update';
/** JSDoc */
export declare class Vue implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    private readonly _options;
    /**
     * Cache holding already processed component names
     */
    private readonly _componentsCache;
    private _rootSpan?;
    private _rootSpanTimer?;
    private _tracingActivity?;
    /**
     * @inheritDoc
     */
    constructor(options: Partial<Omit<IntegrationOptions, 'tracingOptions'> & {
        tracingOptions: Partial<TracingOptions>;
    }>);
    /**
     * @inheritDoc
     */
    setupOnce(_: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void;
    /**
     * Extract component name from the ViewModel
     */
    private _getComponentName;
    /** Keep it as attribute function, to keep correct `this` binding inside the hooks callbacks  */
    private readonly _applyTracingHooks;
    /** Finish top-level span and activity with a debounce configured using `timeout` option */
    private _finishRootSpan;
    /** Inject configured tracing hooks into Vue's component lifecycles */
    private _startTracing;
    /** Inject Sentry's handler into owns Vue's error handler  */
    private _attachErrorHandler;
}
interface HubType extends Hub {
    getScope?(): Scope | undefined;
}
/** Grabs active transaction off scope */
export declare function getActiveTransaction<T extends Transaction>(hub: HubType): T | undefined;
export {};
