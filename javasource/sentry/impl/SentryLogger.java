package sentry.impl;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;

import io.sentry.ILogger;
import io.sentry.SentryLevel;

public class SentryLogger implements ILogger {
	public static String LOGNODE = "Sentry";
	private static ILogNode logger = Core.getLogger(LOGNODE);
	@Override
	public void log(SentryLevel level, String message, Object... args) {
		logLogline(level, String.format(message, args), null);
	}
	
	@Override
	public void log(SentryLevel level, String message, Throwable throwable) {
		logLogline(level, message, throwable);
	}
	
	@Override
	public void log(SentryLevel level, Throwable throwable, String message, Object... args) {
		logLogline(level, String.format(message, args), throwable);
	}
	
	private void logLogline(SentryLevel level, String logline, Throwable throwable) {
		switch(level) {
		case DEBUG:
			logger.debug(logline, throwable);
			break;
		case ERROR:
			logger.error(logline, throwable);
			break;
		case FATAL:
			logger.critical(logline, throwable);
			break;
		case INFO:
			logger.info(logline, throwable);
			break;
		case WARNING:
			logger.warn(logline, throwable);
			break;
		}
	}

	@Override
	public boolean isEnabled(SentryLevel level) {
		switch (level) {
		case DEBUG:
			return logger.isDebugEnabled();
		default:
			return true;
		}
	}
	
}
