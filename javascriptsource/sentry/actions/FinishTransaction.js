// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE
import * as SentryRNAPI from "@sentry/react-native";
import * as SentryWebAPI from "@sentry/browser";
// END EXTRA CODE

/**
 * @param {Big} transactionId
 * @returns {Promise.<void>}
 */
export async function FinishTransaction(transactionId) {
	// BEGIN USER CODE
	var SentryAPI = null;
	var SCOPE = window;

	if (navigator && navigator.product === "ReactNative") {
		// SCOPE = GLOBAL;
        SentryAPI = SentryRNAPI;
    } else {
		SentryAPI = SentryWebAPI;
		// SCOPE = window;
	}

	let transaction = SCOPE.sentryTransactions["" + transactionId];
	if (!transaction) {
		console.warn("Expected to finish transaction " + transactionId + " but it wasn't found.")
		return;
	}
	transaction.finish();
	delete SCOPE.sentryTransactions["" + transactionId];
	// END USER CODE
}
