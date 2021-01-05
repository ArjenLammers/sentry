"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../Helper/Logging'); // We mock logging to not pollute the output
var Constants_1 = require("../Constants");
var Setup_1 = require("../Setup");
describe('Wizard', function () {
    describe('React Native', function () {
        test('run', function () {
            expect(Setup_1.run({
                quiet: true,
                integration: Constants_1.Integration.reactNative,
                platform: [Constants_1.Platform.ios, Constants_1.Platform.android],
                skipConnect: true,
            })).toBeTruthy();
        });
    });
});
//# sourceMappingURL=Setup.js.map