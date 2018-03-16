  package com.ncfrmiidpapp;

	import com.facebook.react.bridge.NativeModule;
	import com.facebook.react.bridge.ReactApplicationContext;
	import com.facebook.react.bridge.ReactContext;
	import com.facebook.react.bridge.ReactContextBaseJavaModule;
	import com.facebook.react.bridge.ReactMethod;
	import com.facebook.react.bridge.Callback;
	import java.util.Map;
	import java.util.HashMap;
	import android.content.Context;


	  public class BIOCapture extends ReactContextBaseJavaModule
	  {

	   private String fp = "";
		 public static Context context;


	   public BIOCapture(ReactApplicationContext reactContext)
	   {	 
		    super(reactContext);
				context = reactContext.getApplicationContext();
	   }


      @Override
		  public String getName()
		  {
			  return "BIOCapture";
		  }

     @ReactMethod
     public void TestModule(Callback successCallback)
     {
        successCallback.invoke("Hello working...");
     }

		  @ReactMethod
		  public void CaptureFinger( Callback errorCallback,Callback successCallback)
		  {
			   BIO b = new BIO();
				try
				{				 
 
				  fp = b.doCapture();

					if("" == fp)
					{
					  errorCallback.invoke(fp);

					}
					else
					{
					  successCallback.invoke(fp);
					}
				}
				catch (Exception e)
				{
				  errorCallback.invoke(e.getMessage());
				}
				finally
				{
				  b = null;
				}

		  }

  }
