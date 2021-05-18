import { EventProcessor, Hub, Integration } from '@sentry/types';
import * as localForageType from 'localforage';
/**
 * cache offline errors and send when connected
 */
export declare class Offline implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    readonly name: string;
    /**
     * the global instance
     */
    global: any;
    /**
     * the current hub instance
     */
    hub?: Hub;
    /**
     * maximum number of events to store while offline
     */
    maxStoredEvents: number;
    /**
     * event cache
     */
    offlineEventStore: typeof localForageType;
    /**
     * @inheritDoc
     */
    constructor(options?: {
        maxStoredEvents?: number;
    });
    /**
     * @inheritDoc
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void;
    /**
     * cache an event to send later
     * @param event an event
     */
    private _cacheEvent;
    /**
     * purge excess events if necessary
     */
    private _enforceMaxEvents;
    /**
     * purge event from cache
     */
    private _purgeEvent;
    /**
     * purge events from cache
     */
    private _purgeEvents;
    /**
     * send all events
     */
    private _sendEvents;
}
