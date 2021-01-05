import { Integration } from "@sentry/types";
/** Release integration responsible to load release from file. */
export declare class Release implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}
//# sourceMappingURL=release.d.ts.map