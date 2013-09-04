package com.gtech.webservices;

public class BroadcastedEmail 
{
	private String[] recipients;
	private String		message;
	private String		from;

	private String		subject;
	
	public BroadcastedEmail(String from, String subject, String message, String... rcpts)
	{
		int i = 0;
		this.from		= from;
		this.subject	= subject;
		this.message	= message;
		this.recipients = new String[rcpts.length];
		
		for (String email : rcpts)
			this.recipients[i++] = email;
	}

	public String[] getRecipients()
	{
		return this.recipients;
	}

	public String getMessage()
	{
		return this.message;
	}
	
	public String getFrom()
	{
		return from;
	}
	
	public String getSubject()
	{
		return subject;
	}
}
