"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
var File_1 = require("../File");
describe('SentryCli', function () {
    test('exists', function () {
        expect(File_1.exists("**/File.ts")).toBeTruthy();
        expect(File_1.exists("Filea.ts")).toBeFalsy();
    });
    test('matchesContent', function () {
        expect(File_1.matchesContent("**/File.ts", /exists/g)).toBeTruthy();
        expect(File_1.matchesContent("**/File.ts", /blabla/g)).toBeFalsy();
        expect(File_1.matchesContent("Filea.ts", /exists/g)).toBeFalsy();
    });
});
//# sourceMappingURL=File.js.map