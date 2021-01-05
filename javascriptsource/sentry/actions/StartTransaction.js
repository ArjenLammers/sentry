// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
import * as SentryAPI from "@sentry/react-native";
GLOBAL.sentryTransactions = {};
// END EXTRA CODE

/**
 * @param {string} name
 * @param {string} op
 * @returns {Promise.<Big>}
 */
export async function StartTransaction(name, op) {
	// BEGIN USER CODE
	let newId = Object.keys(GLOBAL.sentryTransactions).length;
	GLOBAL.sentryTransactions["" + newId] = SentryAPI.startTransaction({ 
		name: name,
		op: op
	});
	return newId;
	// END USER CODE
}
