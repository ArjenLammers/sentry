Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browser_1 = require("./browser");
var hubextensions_1 = require("./hubextensions");
exports.addExtensionMethods = hubextensions_1.addExtensionMethods;
var TracingIntegrations = require("./integrations");
var Integrations = tslib_1.__assign(tslib_1.__assign({}, TracingIntegrations), { BrowserTracing: browser_1.BrowserTracing });
exports.Integrations = Integrations;
var span_1 = require("./span");
exports.Span = span_1.Span;
var transaction_1 = require("./transaction");
exports.Transaction = transaction_1.Transaction;
var spanstatus_1 = require("./spanstatus");
exports.SpanStatus = spanstatus_1.SpanStatus;
// We are patching the global object with our hub extension methods
hubextensions_1.addExtensionMethods();
var utils_1 = require("./utils");
exports.extractTraceparentData = utils_1.extractTraceparentData;
exports.getActiveTransaction = utils_1.getActiveTransaction;
exports.hasTracingEnabled = utils_1.hasTracingEnabled;
exports.stripUrlQueryAndFragment = utils_1.stripUrlQueryAndFragment;
//# sourceMappingURL=index.js.map