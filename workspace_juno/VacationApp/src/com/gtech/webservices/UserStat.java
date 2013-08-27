package com.gtech.webservices;

import java.util.Calendar;

public class UserStat {
	
	public UserStat()
	{
		Calendar cal = Calendar.getInstance();
		cal.clear();
		available = false;
		userName = "";
		notAvailableUntil = cal;
		
	}
	
	public UserStat(boolean a, String u)
	{
		Calendar cal = Calendar.getInstance();
		cal.clear();
		available = a;
		userName = u;
		notAvailableUntil = cal;
	}
	
	
	public UserStat(boolean a, String u, Calendar n)
	{
		available = a;
		userName = u;
		notAvailableUntil = n;
	}
	
	
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Calendar getNotAvailableUntil() {
		return notAvailableUntil;
	}
	public void setNotAvailableUntil(Calendar notAvailableUntil) {
		this.notAvailableUntil = notAvailableUntil;
	}

	private boolean available;
	private String userName;
	private Calendar notAvailableUntil;
}
