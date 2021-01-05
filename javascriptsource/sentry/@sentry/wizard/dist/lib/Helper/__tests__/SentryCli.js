"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../../Constants");
var SentryCli_1 = require("../SentryCli");
var args = {
    debug: false,
    integration: Constants_1.Integration.reactNative,
    platform: Constants_1.Platform.ios,
    quiet: false,
    skipConnect: false,
    uninstall: false,
    url: 'https://localhost:1234',
};
var demoAnswers = {
    config: {
        auth: {
            token: 'abcd',
        },
        organization: {
            slug: 'test_org',
        },
        project: {
            slug: 'test_proj',
        },
    },
};
describe('SentryCli', function () {
    test('convertAnswersToProperties', function () {
        var resolveFunc = jest.fn().mockReturnValue('node_modules/sentry/cli');
        var sentry = new SentryCli_1.SentryCli(args);
        sentry.setResolveFunction(resolveFunc);
        var props = sentry.convertAnswersToProperties(demoAnswers);
        expect(props['defaults/url']).toBe('https://localhost:1234');
        expect(props['defaults/org']).toBe('test_org');
        expect(props['defaults/project']).toBe('test_proj');
        expect(props['auth/token']).toBe('abcd');
        expect(props['cli/executable']).toBe('node_modules/sentry/cli');
    });
    test('dump properties', function () {
        var resolveFunc = jest.fn().mockReturnValue('node_modules/sentry/cli');
        var sentry = new SentryCli_1.SentryCli(args);
        sentry.setResolveFunction(resolveFunc);
        var props = sentry.convertAnswersToProperties(demoAnswers);
        expect(sentry.dumpProperties(props)).toBe("defaults.url=https://localhost:1234\ndefaults.org=test_org\ndefaults.project=test_proj\nauth.token=abcd\ncli.executable=node_modules/sentry/cli\n");
    });
    test('convertAnswersToProperties windows', function () {
        var resolveFunc = jest.fn().mockReturnValue('node_modules\\sentry\\cli');
        var sentry = new SentryCli_1.SentryCli(args);
        sentry.setResolveFunction(resolveFunc);
        var props = sentry.convertAnswersToProperties(demoAnswers);
        expect(props['defaults/url']).toBe('https://localhost:1234');
        expect(props['defaults/org']).toBe('test_org');
        expect(props['defaults/project']).toBe('test_proj');
        expect(props['auth/token']).toBe('abcd');
        expect(props['cli/executable']).toBe('node_modules\\\\sentry\\\\cli');
    });
    test('dump properties windows', function () {
        var resolveFunc = jest.fn().mockReturnValue('node_modules\\sentry\\cli');
        var sentry = new SentryCli_1.SentryCli(args);
        sentry.setResolveFunction(resolveFunc);
        var props = sentry.convertAnswersToProperties(demoAnswers);
        expect(sentry.dumpProperties(props)).toBe("defaults.url=https://localhost:1234\ndefaults.org=test_org\ndefaults.project=test_proj\nauth.token=abcd\ncli.executable=node_modules\\\\sentry\\\\cli\n");
    });
});
//# sourceMappingURL=SentryCli.js.map