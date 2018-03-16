
package com.ncfrmiidpapp;

import com.digitalpersona.uareu.ReaderCollection;
import com.digitalpersona.uareu.UareUException;
import com.digitalpersona.uareu.*;
import com.digitalpersona.uareu.Fid;
import com.digitalpersona.uareu.Reader;
import com.digitalpersona.uareu.Reader.Priority;
import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.content.Context;

public class BIO extends Activity
{

	private Reader                 m_reader;
	private ReaderCollection       readers;
//	private Fid.Format             m_format = Fid.Format.ANSI_381_2004;
//	private Reader.ImageProcessing m_proc   = Reader.ImageProcessing.IMG_PROC_DEFAULT;
	private boolean                bReady   = false;
    private String                 encoded = "On Declared";
	private String m_deviceName = "";
	private int m_DPI = 0;
	private Reader.CaptureResult cap_result = null;
	boolean m_reset;

     public BIO()
	 {
		 // initiliaze dp sdk
		try 
		{
			Context applContext = BIOCapture.context;
			readers = Globals.getInstance().getReaders(applContext);
			m_deviceName = readers.get(0).GetDescription().name;
			m_reader = Globals.getInstance().getReader(m_deviceName, applContext);
			m_reader.Open(Priority.EXCLUSIVE);
			m_DPI = Globals.GetFirstDPI(m_reader);
			encoded = "";
		} 
		catch (Exception e)
		{
			encoded = e.toString();
			Log.w("UareUSampleJava", "error during init of reader");	
			return;
		}
	 }

	public String  doCapture()
	{
		try
		{
		//	encoded="On Capturing";
		//	String deviceName = m_collection.get(0).GetDescription().name;
		
			
			new Thread(new Runnable()
			{
				@Override
				public void run()
				{
					
					try 
					{
						m_reset = false;
						
						while (!m_reset)
						{
						    cap_result = m_reader.Capture(Fid.Format.ANSI_381_2004, Globals.DefaultImageProcessing, m_DPI, -1);
							// an error occurred
							if (cap_result == null || cap_result.image == null) continue;
							 encoded = cap_result.image.getData().toString();
							 m_reset = true;
							 finish();
								try {m_reader.CancelCapture(); } catch (Exception e) {}
							//	m_reader.Close();							
							// save bitmap image locally
							//m_bitmap = Globals.GetBitmapFromRaw(cap_result.image.getViews()[0].getImageData(), cap_result.image.getViews()[0].getWidth(), cap_result.image.getViews()[0].getHeight());
							//m_text_conclusionString = Globals.QualityToString(cap_result);
							
						}
					}
					catch (Exception e1)
					{	
						if(!m_reset)
						{
							m_reset = true;						
							
							finish();
							try {m_reader.CancelCapture(); } catch (Exception e2) {}
							//m_reader.Close();
							Log.w("UareUSampleJava", "error during capture: " + e1.toString());
							
						}
					}
				}
			}).start();
		}
		catch (Exception e3)
		{
			e3.printStackTrace();
		}

		return encoded;

	}
}

