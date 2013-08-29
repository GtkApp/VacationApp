package com.gtech.webservices;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class VacationSummaryDaoImpl implements VacationSummaryDao{

	@Autowired
	private SessionFactory sf;
	
	public VacationSummaryDaoImpl()
	{
		
	}
	@Override
	public void saveSummary(VacationSummary vacation) {
		sf.getCurrentSession().save(vacation);
		
	}

	@Override
	public VacationSummary getVacationSummary(String user) {

	    	VacationSummary vacationSum= (VacationSummary)sf.getCurrentSession().createQuery("FROM " + VacationSummary.class.getName() + " WHERE name = :user").setString("user", user).uniqueResult();
	    	return vacationSum;

	}

	@Override
	public VacationSummary fakeVacationSummary() {
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

	@Override
	public void updateSummary(Vacation vacationRequest, VacationSummary vacationSummary, UpdateType updType) {

		int factor = 1;
		
		if(updType == UpdateType.UPDATE_DECREASE)
			factor = -1;

		switch(vacationRequest.getTypeOfVacation())
		{
		case VACATION: vacationSummary.setDaysVacation(vacationSummary.getDaysVacation() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case UNPAID: vacationSummary.setDaysUnpaid(vacationSummary.getDaysUnpaid() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case SPECIAL: vacationSummary.setDaysSpecial(vacationSummary.getDaysSpecial() + factor * ( vacationRequest.getNumberOfDays()));
			break;
		case AFTER_THE_BIRTH: vacationSummary.setDaysAfterTheBirth(vacationSummary.getDaysAfterTheBirth() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case CHILD_CARE: vacationSummary.setDaysChildCare(vacationSummary.getDaysChildCare() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case JOB_SEARCH: vacationSummary.setDaysJobSearch(vacationSummary.getDaysJobSearch() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case ON_DEMOND: vacationSummary.setDaysOnDemand(vacationSummary.getDaysOnDemand() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case OTHER: vacationSummary.setDaysOther(vacationSummary.getDaysOther() + factor * (vacationRequest.getNumberOfDays()));
			break;
		case PARENTAL: vacationSummary.setDaysParental(vacationSummary.getDaysParental() + factor * (vacationRequest.getNumberOfDays()));
			break;
		default:
			break; 
			
		}
		
		sf.getCurrentSession().update(vacationSummary);
	}

}
