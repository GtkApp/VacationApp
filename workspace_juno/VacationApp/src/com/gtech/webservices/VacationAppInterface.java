package com.gtech.webservices;


import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/Deeper/Rest")
public interface VacationAppInterface {
	
	@RolesAllowed({"admin", "user"})
	@GET
	@Path("/Bogus/{emailRecipients}/{mailContent}")
	public void sendEmail(@PathParam("emailRecipients") String emailRecipients, @PathParam("mailContent") String mailContent);
	
	@RolesAllowed({"admin", "user"})
	@GET() @Path("/VacationList/{vacationSince}/{vacationUntil}")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract VacationList getVacationList(@PathParam("vacationSince") String vacationSince, @PathParam("vacationUntil") String vacationUntil);
			

	@RolesAllowed({"admin", "user"})
	@GET() @Path("/VacationSummary")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract VacationSummary getVacationSummary();	
		
	@RolesAllowed({"admin", "user"})
	@POST() @Path("/NewVacation")
	@Consumes({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract Vacation addVacation( Vacation vacation);	
	
	@RolesAllowed({"admin", "user"})
	@POST() @Path("/ExistingVacation")	
	@Consumes({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract Vacation updateVacation(Vacation vacation);

	@RolesAllowed({"admin", "user"})
	@POST() @Path("/ExistingVacationByUser")	
	@Consumes({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract Vacation updateVacation(Vacation vacation, @PathParam("userId") int userId);
	
	
	@RolesAllowed({"admin"})
	@GET() @Path("/VacationListByUser/{vacationSince}/{vacationUntil}/{userId}")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract VacationList getVacationList(@PathParam("vacationSince") String vacationSince, @PathParam("vacationUntil") String vacationUntil, 		
			@PathParam("userId") int userId);

	@RolesAllowed({"admin"})
	@GET() @Path("/VacationSummaryByUser/{userId}")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract VacationSummary getVacationSummary(@PathParam("userId") int userId);	
	
	@RolesAllowed({"admin"})
	@GET() @Path("/DependentUserList")	
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract VAppUserList getUserList();
	
	@RolesAllowed({"admin"})
	@GET() @Path("/ReportUserStat")
	@Produces({ MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public abstract UserStatList getUserStatusList();
	
}
