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
import * as SentryTracing from "@sentry/tracing";
// END EXTRA CODE

/**
 * @param {Big} transactionId
 * @param {string} op
 * @param {string} description
 * @returns {Promise.<Big>}
 */
export async function StartChild(transactionId, op, description) {
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


	if (!SCOPE.hasOwnProperty("sentryTransactionChildren")) {
		SCOPE.sentryTransactionChildren = {};
		SCOPE.sentryTransactionChildId = 0;
	} 

	if (!SCOPE.hasOwnProperty("sentryTransactions")) {
		SCOPE.sentryTransactions = {};
		SCOPE.sentryTransactionId = 0;
	}

	let transaction = SCOPE.sentryTransactions["" + transactionId];
	if (!transaction) {
		console.warn("Unable to start child of " + transactionId + " because the transaction was not found.");
		return;
	}

	let newId = SCOPE.sentryTransactionChildId++;
	SCOPE.sentryTransactionChildren["" + newId] = transaction.startChild({
		op: op,
		description: description
	});
	return newId;
	// END USER CODE
}
