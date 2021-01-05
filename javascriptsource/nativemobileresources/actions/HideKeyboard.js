// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";
import { Keyboard } from "react-native";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * @returns {Promise.<void>}
 */
export async function HideKeyboard() {
	// BEGIN USER CODE
    // Documentation https://facebook.github.io/react-native/docs/keyboard
    Keyboard.dismiss();
    return Promise.resolve();
	// END USER CODE
}
