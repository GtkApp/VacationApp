package com.gtech.webservices;


//import javax.xml.bind.DatatypeConverter;
import javax.annotation.Resource;
//import javax.mail.Message;
//import javax.mail.MessagingException;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
//import javax.ws.rs.QueryParam;
//import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;


public class VacationAppResource implements VacationAppInterface{
	 @Resource(mappedName = "java:jboss/mail/VacApp_GMAIL")
	 javax.mail.Session mailSession;
	 
	/*@Autowired
	private VacationDao vacationDAO;*/
	
	@Autowired
	private VacationManager vacationManager;
	
	@Override
	@GET
	@Path("/VacationList/{vacationSince}/{vacationUntil}")
	@Produces({ "application/json", "application/xml" })
	public VacationList getVacationList(String codedAuth, String vacationSince, String vacationUntil) {		
					
		VacationList vacationList = new VacationList();
		vacationList.setVacations(vacationManager.manageGetVacationList(codedAuth, vacationSince, vacationUntil));
		
		return vacationList;
	}

	@GET
	@Path("/VacationSummary")
	@Produces({ "application/json", "application/xml" })
	public VacationSummary getVacationSummary(String auth) {
        
        return vacationManager.manageGetVacationSummary(auth);

	}

	@Override
	@POST
	@Path("/NewVacation")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Vacation addVacation(String codedAuth, Vacation vacation) {
		// TODO Auto-generated method stub
		//EscalationList escalation = 
	    //vacationDAO.addVacationRequest(vacation, auth/*getUserFromAuth(auth)*/);
	    vacationManager.manageNewVacationRequest(vacation, codedAuth);
		//TODO ESCALATE!!!
		//vacationDAO.save(vacation);
		return vacation;
		
	}

	@Override
	@POST
	@Path("/ExistingVacation")
	@Consumes({ "application/json", "application/xml" })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Vacation updateVacation(String codedAuth, Vacation vacation) {
		
		//Vacation vUpdated = vacationDAO.updateVacationRequest(vacation, auth/*getUserFromAuth(auth)*/);
		Vacation vUpdated = vacationManager.updateExistingVacation(vacation, codedAuth);
		return vUpdated;
	}
	/*
	public VacationDao getVacationDao() {
		return vacationDAO;
	}

	public void setVacationDao(VacationDao vacationDao) {
		this.vacationDAO = vacationDao;
		}*/
	
}
