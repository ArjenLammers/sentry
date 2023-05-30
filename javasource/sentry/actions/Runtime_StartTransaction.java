// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package sentry.actions;

import java.util.Stack;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.ISession;
import com.mendix.systemwideinterfaces.core.IUser;
import com.mendix.webui.CustomJavaAction;
import io.sentry.ITransaction;
import io.sentry.Sentry;
import sentry.impl.SentryConstants;

public class Runtime_StartTransaction extends CustomJavaAction<java.lang.Void>
{
	private java.lang.String name;
	private java.lang.String op;

	public Runtime_StartTransaction(IContext context, java.lang.String name, java.lang.String op)
	{
		super(context);
		this.name = name;
		this.op = op;
	}

	@java.lang.Override
	public java.lang.Void executeAction() throws Exception
	{
		// BEGIN USER CODE
		Stack<ITransaction> transactionStack;
		if (getContext().getData().containsKey(SentryConstants.TRANSACTION_KEY)) {
			transactionStack = (Stack<ITransaction>) getContext().getData().get(SentryConstants.TRANSACTION_KEY);
		} else {
			transactionStack = new Stack<>();
			getContext().getData().put(SentryConstants.TRANSACTION_KEY, transactionStack);
		}
		
		ITransaction transaction = Sentry.startTransaction(name, op);
		
		ISession session = getContext().getSession();
		if (session != null) {
			try {
				transaction.setTag("username", session.getUserName());
			} catch (Exception e) {}
		}
		
		transactionStack.push(transaction);
		return null;
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 * @return a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "Runtime_StartTransaction";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
