package com.gtech.webservices;

import java.util.LinkedList;
import java.util.Queue;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailBroadcasterImpl implements Runnable, EmailBroadcaster
{
	@Resource(mappedName = "java:jboss/mail/VacApp_GMAIL")
	javax.mail.Session mailSession;
		
	private Queue<BroadcastedEmail> que;
	
	public EmailBroadcasterImpl() 
    {
    	que = new LinkedList<BroadcastedEmail>();
    }
	
	public synchronized void sendEmail(BroadcastedEmail e)
	{
		que.add(e);
	}
	
	private synchronized BroadcastedEmail popEmail()
	{
		return que.poll();
	}
	
	private void letTheMailOut(BroadcastedEmail e)
	{
		String rcpts_str = "";
		for (String r : e.getRecipients())
			rcpts_str += "|"+r;
		System.out.println("Sending: "+e.getMessage()+" to: "+e.getRecipients()[0]);
				
		   String to = e.getRecipients()[0];
		   String from = e.getFrom();
		   String subject = e.getSubject();
		   
		   Message msg = new MimeMessage(mailSession);
		   try {
		      msg.setFrom(new InternetAddress(from));
		      msg.setRecipient(Message.RecipientType.TO , new InternetAddress(to));
		      msg.setSubject(subject);
		      msg.setText(e.getMessage());
		    }  catch(Exception exc) {
		       }


        try {
			Transport.send(msg);
		} catch (MessagingException z) {
			// TODO Auto-generated catch block
			z.printStackTrace();
		}	
		
	}
	
    public void run() 
    {
    	while(true) 
    	{
    		for (BroadcastedEmail eml = popEmail(); eml != null; eml = popEmail())
    		{
    			letTheMailOut(eml);
    		}
    		    		
            try {	Thread.sleep(500);	} 
            catch (InterruptedException ie) 
            {	System.out.println("Child thread interrupted! " + ie);	}
        }
    }
}
