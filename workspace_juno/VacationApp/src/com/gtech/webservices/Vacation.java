package com.gtech.webservices;
import java.util.Calendar;
import javax.xml.bind.annotation.XmlRootElement;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;

@Entity
@Table(name="VACATION_LIST")
@XmlRootElement
public class Vacation{
	@Id
	@GeneratedValue	
	private int idn;
	
	@NotNull
	private String userName;
	private Calendar vacationSince;
	private Calendar vacationUntil;
	@Min(1)
	private int numberOfDays;
	private VacationType typeOfVacation;
	private VacationStatus statusOfVacationRequest;
	@Min(0)
	private int numberOfOutstandingDaysUsed;

	public int getNumberOfOutstandingDaysUsed() {
		return numberOfOutstandingDaysUsed;
	}

	public void setNumberOfOutstandingDaysUsed(int numberOfOutstandingDaysUsed) {
		this.numberOfOutstandingDaysUsed = numberOfOutstandingDaysUsed;
	}

	public VacationStatus getStatusOfVacationRequest() {
		return statusOfVacationRequest;
	}

	public void setStatusOfVacationRequest(VacationStatus stausOfVacationRequest) {
		this.statusOfVacationRequest = stausOfVacationRequest;
	}

	public int getNumberOfDays() {
		return numberOfDays;
	}

	public void setNumberOfDays(int numberOfDays) {
		this.numberOfDays = numberOfDays;
	}

	public VacationType getTypeOfVacation() {
		return typeOfVacation;
	}

	public void setTypeOfVacation(VacationType typeOfVacation) {
		this.typeOfVacation = typeOfVacation;
	}

	public int getIdn() {
		return idn;
	}

	public void setIdn(int idn) {
		this.idn = idn;
	}

	  public String getUserName() {
		    return userName;
		  }

		  public void setUserName(String name) {
		    this.userName = name;
		  }
	
	  @Temporal(TemporalType.DATE)
	  public Calendar getVacationSince() { return vacationSince; }
	  public void setVacationSince(Calendar cal) { vacationSince = cal; }

	  @Temporal(TemporalType.DATE)
	  public Calendar getVacationUntil() { return vacationUntil; }
	  public void setVacationUntil(Calendar cal) { vacationUntil = cal; }

	  public String toString() {
		    return "Vacation";
		  }

}
