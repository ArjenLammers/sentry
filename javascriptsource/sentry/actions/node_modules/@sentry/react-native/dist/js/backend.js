import { __awaiter } from "tslib";
import { BrowserBackend } from "@sentry/browser/dist/backend";
import { BaseBackend, NoopTransport } from "@sentry/core";
import { Transports } from "@sentry/react";
import { Severity } from "@sentry/types";
// @ts-ignore LogBox introduced in RN 0.63
import { Alert, LogBox, YellowBox } from "react-native";
import { NativeTransport } from "./transports/native";
import { NATIVE } from "./wrapper";
/** The Sentry ReactNative SDK Backend. */
export class ReactNativeBackend extends BaseBackend {
    /** Creates a new ReactNative backend instance. */
    constructor(_options) {
        super(_options);
        this._options = _options;
        this._browserBackend = new BrowserBackend(_options);
        // This is a workaround for now using fetch on RN, this is a known issue in react-native and only generates a warning
        // YellowBox deprecated and replaced with with LogBox in RN 0.63
        if (LogBox) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            LogBox.ignoreLogs(["Require cycle:"]);
        }
        else {
            // eslint-disable-next-line deprecation/deprecation
            YellowBox.ignoreWarnings(["Require cycle:"]);
        }
        void this._startWithOptions();
    }
    /**
     * If native client is available it will trigger a native crash.
     * Use this only for testing purposes.
     */
    nativeCrash() {
        if (this._options.enableNative) {
            NATIVE.crash();
        }
    }
    /**
     * @inheritDoc
     */
    eventFromException(exception, hint) {
        return this._browserBackend.eventFromException(exception, hint);
    }
    /**
     * @inheritDoc
     */
    eventFromMessage(message, level = Severity.Info, hint) {
        return this._browserBackend.eventFromMessage(message, level, hint);
    }
    /**
     * @inheritDoc
     */
    _setupTransport() {
        if (!this._options.dsn) {
            // We return the noop transport here in case there is no Dsn.
            return new NoopTransport();
        }
        const transportOptions = Object.assign(Object.assign({}, this._options.transportOptions), { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        if (this._isNativeTransportAvailable()) {
            return new NativeTransport();
        }
        return new Transports.FetchTransport(transportOptions);
    }
    /**
     * If true, native client is availabe and active
     */
    _isNativeTransportAvailable() {
        return (this._options.enableNative === true &&
            NATIVE.isNativeClientAvailable() &&
            NATIVE.isNativeTransportAvailable());
    }
    /**
     * Starts native client with dsn and options
     */
    _startWithOptions() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let didCallNativeInit = false;
            try {
                didCallNativeInit = yield NATIVE.startWithOptions(this._options);
                NATIVE.setLogLevel(this._options.debug ? 2 : 1);
            }
            catch (_) {
                this._showCannotConnectDialog();
                (_b = (_a = this._options).onReady) === null || _b === void 0 ? void 0 : _b.call(_a, { didCallNativeInit: false });
                return;
            }
            (_d = (_c = this._options).onReady) === null || _d === void 0 ? void 0 : _d.call(_c, { didCallNativeInit });
        });
    }
    /**
     * If the user is in development mode, and the native nagger is enabled then it will show an alert.
     */
    _showCannotConnectDialog() {
        if (__DEV__ && this._options.enableNativeNagger) {
            Alert.alert("Sentry", "Warning, could not connect to Sentry native SDK.\nIf you do not want to use the native component please pass `enableNative: false` in the options.\nVisit: https://docs.sentry.io/platforms/react-native/#linking for more details.");
        }
    }
}
//# sourceMappingURL=backend.js.map