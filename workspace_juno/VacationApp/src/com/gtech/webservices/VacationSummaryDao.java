package com.gtech.webservices;


import com.gtech.webservices.Vacation;
import com.gtech.webservices.VacationSummary;


public abstract interface VacationSummaryDao {
	
	public abstract void saveSummary(VacationSummary vacation);
	
	public abstract VacationSummary getVacationSummary(String user);

	public abstract VacationSummary fakeVacationSummary();
	
	public abstract void updateSummary(Vacation vacationRequest, VacationSummary vacationSummary, UpdateType updType);
}
