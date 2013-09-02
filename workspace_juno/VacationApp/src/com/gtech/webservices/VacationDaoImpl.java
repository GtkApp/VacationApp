package com.gtech.webservices;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class VacationDaoImpl implements VacationDao{
	
	@Autowired
	private SessionFactory sf;
	
	public VacationDaoImpl()
	{
		
	}
	


	//private void save(Vacation vacation) {
	public void save(Vacation vacation) {	
		sf.getCurrentSession().save(vacation);
	}
	
	public Vacation update(Vacation vacation) {
		
		Vacation vacationForUpd= (Vacation)sf.getCurrentSession().get(Vacation.class, vacation.getIdn());
		
		vacationForUpd.setNumberOfDays(vacation.getNumberOfDays());
		vacationForUpd.setTypeOfVacation(vacation.getTypeOfVacation());
		vacationForUpd.setStatusOfVacationRequest(vacation.getStatusOfVacationRequest());
		
		/* I am not sure if required*/
		vacationForUpd.setUserName(vacation.getUserName());
		vacationForUpd.setVacationSince(vacation.getVacationSince());
		vacationForUpd.setVacationUntil(vacation.getVacationUntil());
		
		
		sf.getCurrentSession().update(vacationForUpd);
		
		return vacationForUpd;
	}

	public Vacation get(int id) {
		return (Vacation) sf.getCurrentSession().get(Vacation.class, id);
	}
	
    /* (non-Javadoc)
	 * @see org.jboss.samples.webservices.VacationDao#fakeVacation()
	 */
    @Override
	public Vacation fakeVacation(){
        Vacation vacation = new Vacation();
        
        vacation.setIdn(1);
        vacation.setUserName("gbielanski");
        
        Calendar cal1 = Calendar.getInstance();
        cal1.clear();
        cal1.set(2013,7, 3);
        
        Calendar cal2 = Calendar.getInstance();
        cal2.clear();
        cal2.set(2013,8, 3);
        vacation.setVacationSince(cal1);
        vacation.setVacationUntil(cal2);
        vacation.setNumberOfDays(20);
        vacation.setTypeOfVacation(VacationType.VACATION);
        vacation.setStatusOfVacationRequest(VacationStatus.WAITING_FOR_ACCEPTATION);
        vacation.setNumberOfOutstandingDaysUsed(2);

        return vacation;
    }
    
    /* (non-Javadoc)
	 * @see org.jboss.samples.webservices.VacationDao#fakeVacationSummary()
	 */
    @Override
	public VacationSummary fakeVacationSummary(){
        VacationSummary vacationSum = new VacationSummary();
        
        vacationSum.setName("gbielanski");
        vacationSum.setDaysAfterTheBirth(11);
        vacationSum.setDaysChildCare(12);
        vacationSum.setDaysJobSearch(13);
        vacationSum.setDaysOnDemand(14);
        vacationSum.setDaysOther(15);
        vacationSum.setDaysParental(16);
        vacationSum.setDaysSpecial(17);
        vacationSum.setDaysUnpaid(18);
        vacationSum.setDaysVacation(19);

        return vacationSum;
    }
    
    public List<Vacation> getVacationList(String user, String vSince, String vUntil)
    {
    	List<Vacation> vacationList = sf.getCurrentSession().createQuery("FROM " + Vacation.class.getName() + 
    			" WHERE username = :user AND vacationsince > \'" + vSince + "\' AND vacationsince < \'" + vUntil +"\'")
    			.setString("user", user)
    			.list();
    	
    	return vacationList;
    	
    }
    
    public VacationSummary getVacationSummary(String user)
    {
    	VacationSummary vacationSum= (VacationSummary)sf.getCurrentSession().createQuery("FROM " + VacationSummary.class.getName() + " WHERE name = :user").setString("user", user).uniqueResult();
    	return vacationSum;
    }
    
    public  List<Vacation>  isUserAvailable(String username)
    {
    	Calendar calendardate = Calendar.getInstance();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	
    	String strdate = sdf.format(calendardate.getTime());
    	
    	System.out.println(String.format("[OKO8] %s", strdate));
    	
    	List<Vacation> vacationList = sf.getCurrentSession().createQuery("FROM " + Vacation.class.getName() + 
    			" WHERE username = :user AND vacationsince < \'" + strdate + "\' AND vacationuntil > \'" + strdate +"\'")
    			.setString("user", username)
    			.list(); 
    	
    	return vacationList;
    }
   /* 
    private EscalationList getEscalationList(String user)
    {
    	EscalationList escList= (EscalationList)sf.getCurrentSession().createQuery("FROM " + EscalationList.class.getName() + " WHERE name = :user").setString("user", user).uniqueResult();
    	return escList;
    }*/
}
