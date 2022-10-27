import { Component, createElement } from "react";
import * as SentryAPI from "@sentry/react-native";

if (mx.data) {
    console.info("[Sentry] Init..");
    mx.data.getOffline('Sentry.NativeConfiguration', [], {}, 
    function(objs) { 
        let genericConfig = null;
        for(let i = 0; i < objs.length; i++) {
            let config = objs[i];
            if (config.get("Scope") == 'USER') {
                console.info("[Sentry] Initializing using personalized configuration " + config.getGuid());
                initializeSentry(config);
                return;
            } else if (config.get("Scope") == 'GENERIC') {
                genericConfig = config;
            }
        }
        if (genericConfig == null) {
            console.error("[Sentry] No configuration found!");
        } else {
            console.info("[Sentry] Initializing using generic configuration " + genericConfig.getGuid());
            initializeSentry(genericConfig);
        }
    }, 
    function(e) { 
        console.error(e); 
    });
}

function logListener(level, message) {
    let severity = null;
    switch(level) {
        case "critical":
            severity = SentryAPI.Severity.Critical;
            break;
        case "error":
            switch (String(GLOBAL.MENDIXLOGLEVEL)) {
                case "CRITICAL": return;
            }
            severity = SentryAPI.Severity.Error;
            break;
        case "warning":
            switch (String(GLOBAL.MENDIXLOGLEVEL)) {
                case "CRITICAL": return;
                case "ERROR": return;
            }
            severity = SentryAPI.Severity.Warning;
            break;
        case "info":
            switch (String(GLOBAL.MENDIXLOGLEVEL)) {
                case "CRITICAL": return;
                case "ERROR": return;
                case "WARNING": {
                    alert("return");
                    return;
                }
            }
            severity = SentryAPI.Severity.Info;
            break;
        case "debug":
            switch (String(GLOBAL.MENDIXLOGLEVEL)) {
                case "CRITICAL": return;
                case "ERROR": return;
                case "WARNING": return;
                case "INFO": return;
            }

            severity = SentryAPI.Severity.Debug;
            break;
        case "trace":
            switch (String(GLOBAL.MENDIXLOGLEVEL)) {
                case "CRITICAL": return;
                case "ERROR": return;
                case "WARNING": return;
                case "INFO": return;
                case "DEBUG": return;
            }
            severity = SentryAPI.Severity.Trace;
            break;
        default:
            return;
    }
    SentryAPI.captureMessage(message, severity);
}

function initializeSentry(nativeConfiguration) {
    if (!nativeConfiguration.get('Enabled')) {
        console.info("[Sentry] Sentry is disabled.");
        return;
    }

    let sentryConfig = {
        dsn: nativeConfiguration.get("DSN"),
        defaultIntegrations: false
    };

    GLOBAL.MENDIXLOGLEVEL = nativeConfiguration.get("LogLevel");
    console.info("LOGLEVEL: " + GLOBAL.MENDIXLOGLEVEL);
	if (!GLOBAL.MENDIXLOGLEVEL) {
        GLOBAL.MENDIXLOGLEVEL = "WARNING";
    }
    
    let additionalConfig = nativeConfiguration.get("Configuration");
    if (additionalConfig && additionalConfig.startsWith('{')) {
        sentryConfig = {
            ...sentryConfig,
            ...JSON.parse(additionalConfig)
        };
    }

    console.info("[Sentry] Initializing using configuration: ", sentryConfig);
   
    SentryAPI.init(sentryConfig);

    if (typeof mx.logger.addHandler !== "undefined") {
        mx.logger.addHandler((level, message) => {
            logListener(level, message);
        });
    } else {
        // 9.13-9.15 don't have mx.logger.addHandler anymore, overriding standard log
        if (mx.logger.hasOwnProperty("_log")) {
            return;
        }
        mx.logger._log = mx.logger.log;
        mx.logger.log = function(level, ...messages) {
            try {
                const message = messages.map(m => m instanceof Error ? m.message + m.stack : String(m)).join(" ");
                logListener(level, message);
            } catch(e) {
            }
            let result = mx.logger._log.apply(this, arguments);
            return result;
        };
    }
    
    mx._onError = mx.onError;
    mx.onError = function(e) {
        SentryAPI.captureException(e, true);
        console.info("[Sentry] Exception catched!");
        mx._onError(e);
    }
    console.info("[Sentry] Initialized..");
    
}

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
