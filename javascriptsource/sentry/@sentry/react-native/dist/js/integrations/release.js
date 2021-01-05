import { __awaiter } from "tslib";
import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { NATIVE } from "../wrapper";
/** Release integration responsible to load release from file. */
export class Release {
    constructor() {
        /**
         * @inheritDoc
         */
        this.name = Release.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        addGlobalEventProcessor((event) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const self = getCurrentHub().getIntegration(Release);
            if (!self) {
                return event;
            }
            try {
                const release = yield NATIVE.fetchRelease();
                if (release) {
                    event.release = `${release.id}@${release.version}+${release.build}`;
                    event.dist = `${release.build}`;
                }
            }
            catch (_Oo) {
                // Something went wrong, we just continue
            }
            const options = (_a = getCurrentHub().getClient()) === null || _a === void 0 ? void 0 : _a.getOptions();
            /*
              __sentry_release and __sentry_dist is set by the user with setRelease and setDist. If this is used then this is the strongest.
              Otherwise we check for the release and dist in the options passed on init, as this is stronger than the release/dist from the native build.
            */
            if (typeof ((_b = event.extra) === null || _b === void 0 ? void 0 : _b.__sentry_release) === "string") {
                event.release = `${event.extra.__sentry_release}`;
            }
            else if (typeof (options === null || options === void 0 ? void 0 : options.release) === "string") {
                event.release = options.release;
            }
            if (typeof ((_c = event.extra) === null || _c === void 0 ? void 0 : _c.__sentry_dist) === "string") {
                event.dist = `${event.extra.__sentry_dist}`;
            }
            else if (typeof (options === null || options === void 0 ? void 0 : options.dist) === "string") {
                event.dist = options.dist;
            }
            return event;
        }));
    }
}
/**
 * @inheritDoc
 */
Release.id = "Release";
//# sourceMappingURL=release.js.map