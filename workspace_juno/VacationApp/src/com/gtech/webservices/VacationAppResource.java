package com.gtech.webservices;


//import javax.xml.bind.DatatypeConverter;
import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
//import javax.mail.Message;
//import javax.mail.MessagingException;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
//import javax.ws.rs.QueryParam;
//import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.cache.Cache;
import org.springframework.beans.factory.annotation.Autowired;

public class VacationAppResource implements VacationAppInterface{
	 /* @Resource(mappedName = "java:jboss/mail/VacApp_GMAIL")
	 javax.mail.Session mailSession; */
	 @Context javax.servlet.http.HttpServletRequest sr; 
	/*@Autowired
	private VacationDao vacationDAO;*/
	
	@Autowired
	private VacationManager vacationManager;
	
	@Autowired
	private EmailBroadcaster emailBROADCASTER;
	
	@GET
	@Path("/Bogus/{emailRecipients}/{mailContent}")
	public void sendEmail(/*@PathParam("emailRecipients")*/ String emailRecipients, /*@PathParam("mailContent")*/ String mailContent)
	{
		if(emailBROADCASTER != null)
		{
			System.out.println("EMAIL BROADCASTER IS WIRED IN !!!");
			String mailContent1 = "Ala ma kota !!!";
			String emailRecipients1 = "Boguslaw.Koseda@gtech.com";
			emailBROADCASTER.sendEmail(new BroadcastedEmail("WarsawVacationRequests@gtech.com","Subj.",mailContent,emailRecipients.split(",")));
		}
	}
	
	@Override
	@GET
	@Path("/VacationList/{vacationSince}/{vacationUntil}")
	@Produces({ "application/json", "application/xml" })
	public VacationList getVacationList(String vacationSince, String vacationUntil) {		
		
		//System.out.println(String.format("[OKO getRemoteUse] %s", sr.getRemoteUser()));
		
		VacationList vacationList = new VacationList();
		vacationList.setVacations(vacationManager.manageGetVacationList(sr.getRemoteUser(), vacationSince, vacationUntil));
		
		/*
		if(emailBROADCASTER != null)
		{
			System.out.println("EMAIL BROADCASTER IS WIRED IN !!!");
			String mailContent = "Ala ma kota !!!";
			String emailRecipients = "Boguslaw.Koseda@gtech.com";
			emailBROADCASTER.sendEmail(new BroadcastedEmail("WarsawVacationRequests@gtech.com","Subj.",mailContent,emailRecipients.split(",")));
		}
		*/
		
		return vacationList;
	}

	@GET
	@Path("/VacationSummary")
	@Produces({ "application/json", "application/xml" })
	public VacationSummary getVacationSummary() {
        
        return vacationManager.manageGetVacationSummary(sr.getRemoteUser());

	}
	
	@Override
	@GET
	@Path("/VacationListByUser/{vacationSince}/{vacationUntil}/{userIdn}")
	@Produces({ "application/json", "application/xml" })
	public VacationList getVacationList(String vacationSince, String vacationUntil, int userIdn) {		
					
		VacationList vacationList = new VacationList();
		
		vacationList.setVacations(vacationManager.manageGetVacationList(sr.getRemoteUser(), vacationSince, vacationUntil, userIdn));
		
		return vacationList;
	}

	@GET
	@Path("/VacationSummaryByUser/{userIdn}")
	@Produces({ "application/json", "application/xml" })
	public VacationSummary getVacationSummary(int userIdn) {
        
        return vacationManager.manageGetVacationSummary(sr.getRemoteUser(), userIdn);

	}

	@Override
	@POST
	@Path("/NewVacation")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Vacation addVacation(Vacation vacation) {
		// TODO Auto-generated method stub
		//EscalationList escalation = 
	    //vacationDAO.addVacationRequest(vacation, auth/*getUserFromAuth(auth)*/);
	    vacationManager.manageNewVacationRequest(vacation, sr.getRemoteUser());
		//TODO ESCALATE!!!
		//vacationDAO.save(vacation);
		return vacation;
		
	}

	@Override
	@POST
	@Path("/ExistingVacation")
	@Consumes({ "application/json", "application/xml" })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Vacation updateVacation(Vacation vacation) {
		
		//Vacation vUpdated = vacationDAO.updateVacationRequest(vacation, auth/*getUserFromAuth(auth)*/);
		Vacation vUpdated = vacationManager.updateExistingVacation(vacation, sr.getRemoteUser());
		return vUpdated;
	}

	@RolesAllowed({"admin"})
	@GET() @Path("/DependentUserList")	
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public VAppUserList getUserList()
	{
		VAppUserList userList =  new VAppUserList();
		
		userList.setUserList(vacationManager.manageGetUserList(sr.getRemoteUser()));
		
		return userList;
	}
	/*
	public VacationDao getVacationDao() {
		return vacationDAO;
	}

	public void setVacationDao(VacationDao vacationDao) {
		this.vacationDAO = vacationDao;
		}*/
	
	@RolesAllowed({"admin"})
	@GET() @Path("/ReportUserStat")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public UserStatList getUserStatusList()
	{
		UserStatList userStatList = new UserStatList();
		
		userStatList.setUserStatusList(vacationManager.manageGetUserStatusList(sr.getRemoteUser()));
		
		return userStatList;
	}
	
}
