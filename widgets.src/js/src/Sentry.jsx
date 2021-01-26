import { Component, createElement } from "react";
import * as SentryAPI from "@sentry/react-native";

console.info("Sentry init..");

let sentryConfig = null;
mx.session.getConstants().forEach(element => {
    if (element.name == "Sentry.NativeConfig") {
        sentryConfig = JSON.parse(element.value);
    }
});

if (sentryConfig == null) {
    alert("Please configure Sentry by setting the constant Sentry.SentryConfig.");
}

SentryAPI.init(sentryConfig);

mx.logger.addHandler((level, message) => {
    let severity = null;
    switch(level) {
        case "critical":
            severity = SentryAPI.Severity.Critical;
            break;
        case "error":
            severity = SentryAPI.Severity.Error;
            break;
        case "warning":
            severity = SentryAPI.Severity.Warning;
            break;
        case "info":
            severity = SentryAPI.Severity.Info;
            break;
        case "debug":
            severity = SentryAPI.Severity.Debug;
            break;
        case "trace":
            severity = SentryAPI.Severity.Trace;
            break;
        default:
            alert("Unknown level: " + level);
            return;
    }
    SentryAPI.captureMessage(message, severity);
});

mx._onError = mx.onError;
mx.onError = function(e) {
    SentryAPI.captureException(e);
    console.info("Exception catched!");
    mx._onError(e);
}

console.info("Sentry initialized..");

export class Sentry extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            null
        );
    }
}
