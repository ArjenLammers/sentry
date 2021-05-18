import { __awaiter } from "tslib";
import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { addContextToFrame, logger } from "@sentry/utils";
const INTERNAL_CALLSITES_REGEX = new RegExp(["ReactNativeRenderer-dev\\.js$", "MessageQueue\\.js$"].join("|"));
/** Tries to symbolicate the JS stack trace on the device. */
export class DebugSymbolicator {
    constructor() {
        /**
         * @inheritDoc
         */
        this.name = DebugSymbolicator.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        addGlobalEventProcessor((event, hint) => __awaiter(this, void 0, void 0, function* () {
            const self = getCurrentHub().getIntegration(DebugSymbolicator);
            if (!self || hint === undefined || hint.originalException === undefined) {
                return event;
            }
            const reactError = hint.originalException;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const parseErrorStack = require("react-native/Libraries/Core/Devtools/parseErrorStack");
            let stack;
            try {
                stack = parseErrorStack(reactError);
            }
            catch (e) {
                // In RN 0.64 `parseErrorStack` now only takes a string
                stack = parseErrorStack(reactError.stack);
            }
            // Ideally this should go into contexts but android sdk doesn't support it
            event.extra = Object.assign(Object.assign({}, event.extra), { componentStack: reactError.componentStack, jsEngine: reactError.jsEngine });
            yield self._symbolicate(event, stack);
            event.platform = "node"; // Setting platform node makes sure we do not show source maps errors
            return event;
        }));
    }
    /**
     * Symbolicates the stack on the device talking to local dev server.
     * Mutates the passed event.
     */
    _symbolicate(event, stack) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const symbolicateStackTrace = require("react-native/Libraries/Core/Devtools/symbolicateStackTrace");
                const prettyStack = yield symbolicateStackTrace(stack);
                if (prettyStack) {
                    let newStack = prettyStack;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (prettyStack.stack) {
                        // This has been changed in an react-native version so stack is contained in here
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        newStack = prettyStack.stack;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    const stackWithoutInternalCallsites = newStack.filter((frame) => 
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    frame.file && frame.file.match(INTERNAL_CALLSITES_REGEX) === null);
                    const symbolicatedFrames = yield this._convertReactNativeFramesToSentryFrames(stackWithoutInternalCallsites);
                    this._replaceFramesInEvent(event, symbolicatedFrames);
                }
                else {
                    logger.error("The stack is null");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    logger.warn(`Unable to symbolicate stack trace: ${error.message}`);
                }
            }
        });
    }
    /**
     * Converts ReactNativeFrames to frames in the Sentry format
     * @param frames ReactNativeFrame[]
     */
    _convertReactNativeFramesToSentryFrames(frames) {
        return __awaiter(this, void 0, void 0, function* () {
            let getDevServer;
            try {
                getDevServer = require("react-native/Libraries/Core/Devtools/getDevServer");
            }
            catch (_oO) {
                // We can't load devserver URL
            }
            // Below you will find lines marked with :HACK to prevent showing errors in the sentry ui
            // But since this is a debug only feature: This is Fine (TM)
            return Promise.all(frames.map((frame) => __awaiter(this, void 0, void 0, function* () {
                let inApp = !!frame.column && !!frame.lineNumber;
                inApp =
                    inApp &&
                        frame.file !== undefined &&
                        !frame.file.includes("node_modules") &&
                        !frame.file.includes("native code");
                const newFrame = {
                    colno: frame.column,
                    filename: frame.file,
                    function: frame.methodName,
                    in_app: inApp,
                    lineno: inApp ? frame.lineNumber : undefined,
                    platform: inApp ? "javascript" : "node",
                };
                // The upstream `react-native@0.61` delegates parsing of stacks to `stacktrace-parser`, which is buggy and
                // leaves a trailing `(address at` in the function name.
                // `react-native@0.62` seems to have custom logic to parse hermes frames specially.
                // Anyway, all we do here is throw away the bogus suffix.
                if (newFrame.function) {
                    const addressAtPos = newFrame.function.indexOf("(address at");
                    if (addressAtPos >= 0) {
                        newFrame.function = newFrame.function
                            .substr(0, addressAtPos)
                            .trim();
                    }
                }
                if (inApp) {
                    yield this._addSourceContext(newFrame, getDevServer);
                }
                return newFrame;
            })));
        });
    }
    /**
     * Replaces the frames in the exception of a error.
     * @param event Event
     * @param frames StackFrame[]
     */
    _replaceFramesInEvent(event, frames) {
        if (event.exception &&
            event.exception.values &&
            event.exception.values[0] &&
            event.exception.values[0].stacktrace) {
            event.exception.values[0].stacktrace.frames = frames.reverse();
        }
    }
    /**
     * This tries to add source context for in_app Frames
     *
     * @param frame StackFrame
     * @param getDevServer function from RN to get DevServer URL
     */
    _addSourceContext(frame, getDevServer) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            const segments = (_b = (_a = frame.filename) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : [];
            if (getDevServer) {
                for (const idx in segments) {
                    if (Object.prototype.hasOwnProperty.call(segments, idx)) {
                        response = yield fetch(`${getDevServer().url}${segments.slice(-idx).join("/")}`, {
                            method: "GET",
                        });
                        if (response.ok) {
                            break;
                        }
                    }
                }
            }
            if (response && response.ok) {
                const content = yield response.text();
                const lines = content.split("\n");
                addContextToFrame(lines, frame);
            }
        });
    }
}
/**
 * @inheritDoc
 */
DebugSymbolicator.id = "DebugSymbolicator";
//# sourceMappingURL=debugsymbolicator.js.map