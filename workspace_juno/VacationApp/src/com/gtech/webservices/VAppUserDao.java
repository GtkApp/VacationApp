package com.gtech.webservices;

import java.util.List;

public interface VAppUserDao {
	public abstract void save(VAppUser user);
	
	public abstract VAppUser update(VAppUser user);

	public abstract VAppUser get(int idn);
	
	public abstract VAppUser getByName(String userName);
	
	public abstract List<VAppUser> getDependentUserList(int supervisor);
	
	
	
}
