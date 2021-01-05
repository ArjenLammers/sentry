/** Key value should be the same here */
export declare enum Integration {
    reactNative = "reactNative",
    cordova = "cordova",
    electron = "electron"
}
/** Key value should be the same here */
export declare enum Platform {
    ios = "ios",
    android = "android"
}
export declare function getPlatformChoices(): any[];
export declare function getPlatformDescription(type: string): string;
export declare function getIntegrationDescription(type: string): string;
export declare function getIntegrationChoices(): any[];
export interface Args {
    url: string;
    debug: boolean;
    uninstall: boolean;
    integration: Integration;
    platform: Platform;
    skipConnect: boolean;
    quiet: boolean;
}
export declare const DEFAULT_URL = "https://sentry.io/";
