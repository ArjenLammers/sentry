"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Key value should be the same here */
var Integration;
(function (Integration) {
    Integration["reactNative"] = "reactNative";
    Integration["cordova"] = "cordova";
    Integration["electron"] = "electron";
})(Integration = exports.Integration || (exports.Integration = {}));
/** Key value should be the same here */
var Platform;
(function (Platform) {
    Platform["ios"] = "ios";
    Platform["android"] = "android";
})(Platform = exports.Platform || (exports.Platform = {}));
function getPlatformChoices() {
    return Object.keys(Platform).map(function (platform) { return ({
        checked: true,
        name: getPlatformDescription(platform),
        value: platform,
    }); });
}
exports.getPlatformChoices = getPlatformChoices;
function getPlatformDescription(type) {
    switch (type) {
        case Platform.ios:
            return 'iOS';
        default:
            return 'Android';
    }
}
exports.getPlatformDescription = getPlatformDescription;
function getIntegrationDescription(type) {
    switch (type) {
        case Integration.reactNative:
            return 'React Native';
        case Integration.cordova:
            return 'Cordova';
        case Integration.electron:
            return 'Electron';
        default:
            return 'React Native';
    }
}
exports.getIntegrationDescription = getIntegrationDescription;
function getIntegrationChoices() {
    return Object.keys(Integration).map(function (type) { return ({
        name: getIntegrationDescription(type),
        value: type,
    }); });
}
exports.getIntegrationChoices = getIntegrationChoices;
exports.DEFAULT_URL = 'https://sentry.io/';
//# sourceMappingURL=Constants.js.map