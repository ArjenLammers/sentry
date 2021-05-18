import { PromiseBuffer, SentryError } from "@sentry/utils";
// import { Platform } from "react-native";
import { NATIVE } from "../wrapper";
/** Native Transport class implementation */
export class NativeTransport {
    constructor() {
        /** A simple buffer holding all requests. */
        this._buffer = new PromiseBuffer(30);
    }
    /**
     * @inheritDoc
     */
    sendEvent(event) {
        if (!this._buffer.isReady()) {
            return Promise.reject(new SentryError("Not adding Promise due to buffer limit reached."));
        }
        return this._buffer.add(NATIVE.sendEvent(event));
    }
    /**
     * @inheritDoc
     */
    close(timeout) {
        return this._buffer.drain(timeout);
    }
}
//# sourceMappingURL=native.js.map