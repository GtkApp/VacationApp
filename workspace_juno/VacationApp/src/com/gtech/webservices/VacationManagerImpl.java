package com.gtech.webservices;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.text.ParseException;

import org.jboss.resteasy.spi.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;

public class VacationManagerImpl implements VacationManager {
	@Autowired
	private VacationDao vacationDao;
	
	@Autowired
	private VacationSummaryDao vacationSummaryDao;
	
	@Autowired
	private VAppUserDao vacationAppUserDao;

	@Autowired
	private EscalationListDao escalatioListDao;	
	
	@Autowired
	private EmailBroadcaster emailBROADCASTER;
	
	public VacationManagerImpl()
	{
		
	}

	private Boolean updateVacationSummaryAfterVacationUpdate(Vacation newVacation)
	{
		if(newVacation.getStatusOfVacationRequest() == VacationStatus.CANCELLED || 
				newVacation.getStatusOfVacationRequest() == VacationStatus.REJECTED)
			return true;
		
		return false;
	}		
	
	private Boolean isUpdatePossible(Vacation currentVacationRequest, Vacation newVacationRequest)
	{
		VacationStatus currentVacationStatus = currentVacationRequest.getStatusOfVacationRequest();
		VacationStatus newVacationStatus = newVacationRequest.getStatusOfVacationRequest();
		
		if(currentVacationStatus == VacationStatus.CANCELLED || currentVacationStatus == VacationStatus.REJECTED)
			return false;
		
		if(currentVacationStatus.ordinal() > newVacationStatus.ordinal())
			return false;
		
		return true;
	}	
	
	private Boolean isVacationPossible(Vacation vacationRequest, VacationSummary vacationSum)
	{
		int numberOfDays = vacationRequest.getNumberOfDays();
		
		switch(vacationRequest.getTypeOfVacation())
		{
		case VACATION: return numberOfDays<=vacationSum.getDaysVacation();
		case UNPAID: return numberOfDays<=vacationSum.getDaysUnpaid();
		case SPECIAL: return numberOfDays<=vacationSum.getDaysSpecial();
		case AFTER_THE_BIRTH: return numberOfDays<=vacationSum.getDaysAfterTheBirth();
		case CHILD_CARE: return numberOfDays<=vacationSum.getDaysChildCare();
		case JOB_SEARCH: return numberOfDays<=vacationSum.getDaysJobSearch();
		case ON_DEMOND: return numberOfDays<=vacationSum.getDaysOnDemand();
		case OTHER: return numberOfDays<=vacationSum.getDaysOther();
		case PARENTAL: return numberOfDays<=vacationSum.getDaysParental();
		default:
			return false; 
			
		}
	}
	private String getUserFromAuth(String auth)
	{
		if (auth == null)
			return "gbielanski";
		String userAndPassword64 = auth.replace("Basic ", "");
		
		byte[] encodedDataAsBytes =  javax.xml.bind.DatatypeConverter.parseBase64Binary(userAndPassword64);
		String val ="";
		try {
			val = new String(encodedDataAsBytes, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//System.out.println(String.format(val));
		
        String user = val.substring(0, val.indexOf(':'));
        /*String pass = val.substring(val.indexOf(':') + 1);*/	
		
        return user;
	}
	
    public VacationSummary manageGetVacationSummary(String loggedUser)
    {
        //vacationSummaryDao.saveSummary(vacationSummaryDao.fakeVacationSummary(loggedUser));
		//return vacationDAO.fakeVacationSummary();
    	//System.out.println(String.format("manageGetVacationSummary"));

    	return vacationSummaryDao.getVacationSummary(loggedUser);
    }
    
    public List<Vacation> manageGetVacationList(String loggedUser, String vSince, String vUntil)
    {
    	//vacationDao.save(vacationDao.fakeVacation());
		DateFormat formatter ; 
		
		formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dateVacationSince, dateVacationUntil;
			dateVacationSince = formatter.parse(vSince);
			dateVacationUntil = formatter.parse(vUntil);
			
			if( dateVacationSince.compareTo(dateVacationUntil) > 0 )
				throw new NotFoundException("It is not possible to add vacation. Date \"Since\" is after date \"Until\".");
		
		} catch (ParseException e) {
			throw new NotFoundException("It is not possible to add vacation. Invalid date format.");
		}
		
		System.out.println(String.format("manageGetVacationList"));
		return vacationDao.getVacationList(loggedUser, vSince, vUntil);
    }
       
    public VacationSummary manageGetVacationSummary(String loggedUser, int userIdn)
    {
    	VAppUser user = vacationAppUserDao.get(userIdn);
        //vacationSummaryDao.saveSummary(vacationSummaryDao.fakeVacationSummary());
		//return vacationDAO.fakeVacationSummary();
    	System.out.println(String.format("manageGetVacationSummary"));
    	return vacationSummaryDao.getVacationSummary(user.getUserName());
    }
    
    public List<Vacation> manageGetVacationList(String loggedUser, String vSince, String vUntil, int userIdn)
    {
    	//vacationDAO.save(vacationDAO.fakeVacation());
		DateFormat formatter ; 
		
		formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date dateVacationSince, dateVacationUntil;
			dateVacationSince = formatter.parse(vSince);
			dateVacationUntil = formatter.parse(vUntil);
			
			if( dateVacationSince.compareTo(dateVacationUntil) > 0 )
				throw new NotFoundException("It is not possible to add vacation. Date \"Since\" is after date \"Until\".");
		
		} catch (ParseException e) {
			throw new NotFoundException("It is not possible to add vacation. Invalid date format.");
		}
		
		VAppUser user = vacationAppUserDao.get(userIdn);
		
		if(user == null )
			throw new NotFoundException("User id does not exist.");
		
		System.out.println(String.format("manageGetVacationList"));
		return vacationDao.getVacationList(user.getUserName(), vSince, vUntil);
    }    

    private void sendMailNotifivation(String mailSubject, String mailContent, VAppUser user)
    {
		if(emailBROADCASTER != null)
		{
			/* "WarsawVacationRequests@gtech.com" */
			
			EscalationList escList = escalatioListDao.get();
			
			String emailRecipients = user.getEmail();
			emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail() ,mailSubject , mailContent, emailRecipients));
			
			if(user.getUserSupervisorIdn()!=0)
			{
				VAppUser userSuper =  vacationAppUserDao.get(user.getUserSupervisorIdn());			
				emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail(),mailSubject , mailContent, userSuper.getEmail()));
			}
			
			if(user.getSupervisorReplacementIdn()!=0)
			{
				VAppUser userSuper =  vacationAppUserDao.get(user.getSupervisorReplacementIdn());			
				emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail(),mailSubject , mailContent, userSuper.getEmail()));
			}
			
			if(escList.getNameIdn1() != 0)
			{
				emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail(),mailSubject , mailContent, escList.getMail1()));
			}
			if(escList.getNameIdn2() != 0)
			{
				emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail(),mailSubject , mailContent, escList.getMail2()));
			}
			if(escList.getNameIdn3() != 0)
			{
				emailBROADCASTER.sendEmail(new BroadcastedEmail(escList.getSenderMail(),mailSubject , mailContent, escList.getMail3()));
			}			
			
		}else
			System.out.println("ERROR. Could not send an email");   	
    	
    }
    
    private String prepareMailMessage(String subject, Vacation vacationRequest)
    {
    	String msgBody="";
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    	
    	msgBody = "User " + subject + " from " + format.format(vacationRequest.getVacationSince().getTime())  
    			+ " until " + format.format(vacationRequest.getVacationUntil().getTime()) + " " + "Number of days " + vacationRequest.getNumberOfDays()
    			+ " " + ". Type of vacation " +  vacationRequest.getTypeOfVacation()
    			+ " " + ". Status of vacation" + vacationRequest.getStatusOfVacationRequest() + ".";
    	
    	return msgBody;
    }
    
	public Vacation manageNewVacationRequest(Vacation vacationRequest, String loggedUser)
	{
		
		VacationSummary vacationSum = vacationSummaryDao.getVacationSummary(loggedUser);
		
		if(isVacationPossible(vacationRequest, vacationSum) == false)
			throw new NotFoundException("It is not possible to add vacation. Not enough days.");

		
		vacationDao.save(vacationRequest);
		
		vacationSummaryDao.updateSummary(vacationRequest, vacationSum, UpdateType.UPDATE_DECREASE);
		
		VAppUser user =  vacationAppUserDao.getByName(loggedUser);
		String mailSubject = user.getUserName() + " new vacation request";
		String mailContent = prepareMailMessage(mailSubject,  vacationRequest); 
		sendMailNotifivation(mailSubject, mailContent, user);

		/* Return requested vacation with updated id*/
		return vacationRequest; 
		
	}
	
	public Vacation updateExistingVacation(Vacation vacationRequest, String loggedUser)
	{
		VacationSummary vacationSum = vacationSummaryDao.getVacationSummary(loggedUser);
		
		Vacation currentVacationRequest = vacationDao.get(vacationRequest.getIdn());
		
		if(isUpdatePossible(currentVacationRequest, vacationRequest) == false)
			throw new NotFoundException("It is not possible to update vacation");
		
		Vacation vacationUpdated =  vacationDao.update(vacationRequest);
		
		if(updateVacationSummaryAfterVacationUpdate(vacationUpdated)== true)
			vacationSummaryDao.updateSummary(vacationUpdated, vacationSum, UpdateType.UPDATE_INCREASE);
		
		VAppUser user =  vacationAppUserDao.getByName(loggedUser);
		String mailSubject = user.getUserName() + " vacation request update";
		String mailContent = prepareMailMessage(mailSubject,  vacationRequest); 
		
		sendMailNotifivation(mailSubject, mailContent, user);
				
		return vacationUpdated;
	}

	public Vacation updateExistingVacation(Vacation vacationRequest, int userId)
	{
		VAppUser user = vacationAppUserDao.get(userId);
		VacationSummary vacationSum = vacationSummaryDao.getVacationSummary(user.getUserName());
		
		Vacation currentVacationRequest = vacationDao.get(vacationRequest.getIdn());
		
		if(isUpdatePossible(currentVacationRequest, vacationRequest) == false)
			throw new NotFoundException("It is not possible to update vacation");
		
		Vacation vacationUpdated =  vacationDao.update(vacationRequest);
		
		if(updateVacationSummaryAfterVacationUpdate(vacationUpdated)== true)
			vacationSummaryDao.updateSummary(vacationUpdated, vacationSum, UpdateType.UPDATE_INCREASE);
		
		String mailSubject = user.getUserName() + " vacation request update";
		String mailContent = prepareMailMessage(mailSubject,  vacationRequest); 
		
		sendMailNotifivation(mailSubject, mailContent, user);
				
		return vacationUpdated;
	}
	
	
	public  List<VAppUser> manageGetUserList(String loggedUser)
	{
		String supervisorName = loggedUser;
		VAppUser user = vacationAppUserDao.getByName(supervisorName);
		
		if(user == null)
			throw new NotFoundException("User not found: " + loggedUser);
		
		int supervisorId = user.getUserIdn();
		
		return vacationAppUserDao.getDependentUserList(supervisorId);
	} 	
	
	public  List<UserStat> manageGetUserStatusList(String loggedUser)
	{
		 List<UserStat> userStatList =  new ArrayList<UserStat>();
		 
		String supervisorName = loggedUser;
		VAppUser user = vacationAppUserDao.getByName(supervisorName);
		if(user == null)
			throw new NotFoundException("User not found: " + supervisorName);
		
		int supervisorId = user.getUserIdn();
		
		List<VAppUser> allUserList = vacationAppUserDao.getDependentUserList(supervisorId);
		
		Iterator<VAppUser> userIterator = allUserList.iterator();
		
		while(userIterator.hasNext())
		{
			VAppUser element = userIterator.next();
			
			List<Vacation> vacationList = vacationDao.isUserAvailable(element.getUserName());
			
			if(vacationList.isEmpty())
				userStatList.add(new UserStat(true, element.getUserName()));
			else
			{
				Iterator<Vacation> vacationIterator = vacationList.iterator();
				
				userStatList.add(new UserStat(false, element.getUserName(), vacationIterator.next().getVacationUntil()));;
			}	
		}
		return userStatList;
		

	}	
	
}
