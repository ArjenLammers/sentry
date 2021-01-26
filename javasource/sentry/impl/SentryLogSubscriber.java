package sentry.impl;

import java.util.Date;

import com.mendix.logging.LogLevel;
import com.mendix.logging.LogMessage;
import com.mendix.logging.LogSubscriber;

import io.sentry.Sentry;
import io.sentry.SentryEvent;
import io.sentry.SentryLevel;
import io.sentry.protocol.Message;

public class SentryLogSubscriber extends LogSubscriber {

	public SentryLogSubscriber(LogLevel level) {
		super("Sentry", level);
	}

	@Override
	public void processMessage(LogMessage logMessage) {
		if (logMessage.node.name().equals(SentryLogger.LOGNODE)) {
			return; // avoid echo
		}
		
		SentryEvent event = new SentryEvent(new Date(logMessage.timestamp));
		Message message = new Message();
		if (logMessage.message != null) {
			message.setMessage(logMessage.message.toString());
		}
		event.setLogger(logMessage.node.name());
		event.setMessage(message);

		if (logMessage.cause != null) {
			event.setThrowable(logMessage.cause);
		}
		
		switch(logMessage.level) {
		case CRITICAL:
			event.setLevel(SentryLevel.FATAL);
			break;
		case ERROR:
			event.setLevel(SentryLevel.ERROR);
			break;
		case DEBUG:
			event.setLevel(SentryLevel.DEBUG);
			break;
		case INFO:
			event.setLevel(SentryLevel.INFO);
			break;
		case TRACE:
			event.setLevel(SentryLevel.DEBUG);
			break;
		case WARNING:
			event.setLevel(SentryLevel.WARNING);
			break;
		case NONE:
			event.setLevel(SentryLevel.INFO);
			break;
		}
		
		Sentry.captureEvent(event);
	}
}
