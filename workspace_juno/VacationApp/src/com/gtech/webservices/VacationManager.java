package com.gtech.webservices;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract interface VacationManager {
	
	public abstract VacationSummary manageGetVacationSummary(String auth);
	public abstract List<Vacation> manageGetVacationList(String user, String vSince, String vUntil);
	public abstract Vacation manageNewVacationRequest(Vacation vacationRequest, String user);
	public abstract Vacation updateExistingVacation(Vacation vacationRequest, String user);
	
}
