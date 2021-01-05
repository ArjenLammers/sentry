import { Event, Response, Transport } from "@sentry/types";
import { PromiseBuffer } from "@sentry/utils";
/** Native Transport class implementation */
export declare class NativeTransport implements Transport {
    /** A simple buffer holding all requests. */
    protected readonly _buffer: PromiseBuffer<Response>;
    /**
     * @inheritDoc
     */
    sendEvent(event: Event): PromiseLike<Response>;
    /**
     * @inheritDoc
     */
    close(timeout?: number): PromiseLike<boolean>;
}
//# sourceMappingURL=native.d.ts.map