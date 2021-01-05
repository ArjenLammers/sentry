import { EventProcessor, Hub, Integration } from '@sentry/types';
/**
 * AngularJS integration
 *
 * Provides an $exceptionHandler for AngularJS
 */
export declare class Angular implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * moduleName used in Angular's DI resolution algorithm
     */
    static moduleName: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * Angular's instance
     */
    private readonly _angular;
    /**
     * ngSentry module instance
     */
    private readonly _module;
    /**
     * Returns current hub.
     */
    private _getCurrentHub?;
    /**
     * @inheritDoc
     */
    constructor(options?: {
        angular?: any;
    });
    /**
     * @inheritDoc
     */
    setupOnce(_: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void;
    /**
     * Angular's exceptionHandler for Sentry integration
     */
    private _$exceptionHandlerDecorator;
}
