// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies.microflows;

import java.util.HashMap;
import java.util.Map;
import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.MendixRuntimeException;
import com.mendix.systemwideinterfaces.core.IContext;

public class Microflows
{
	// These are the microflows for the MyFirstModule module
	public static void iVK_Me(IContext context)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		Core.microflowCall("MyFirstModule.IVK_Me").withParams(params).execute(context);
	}
	public static void iVK_PerformanceError(IContext context)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		Core.microflowCall("MyFirstModule.IVK_PerformanceError").withParams(params).execute(context);
	}
	public static void iVK_PerformanceTest(IContext context)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		Core.microflowCall("MyFirstModule.IVK_PerformanceTest").withParams(params).execute(context);
	}
}