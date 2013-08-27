package com.gtech.webservices;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class VAppUserDaoImpl implements VAppUserDao{

	@Autowired
	private SessionFactory sf;
	
	public void save(VAppUser user) {	
		sf.getCurrentSession().save(user);
	}
	
	public VAppUser update(VAppUser user) {
		
		VAppUser userForUpd= (VAppUser)sf.getCurrentSession().get(VAppUser.class, user.getUserIdn());
		
		userForUpd.setUserName(user.getUserName());
		userForUpd.setUserSupervisorIdn(user.getUserSupervisorIdn());
		userForUpd.setSupervisorReplacementIdn(user.getSupervisorReplacementIdn());
		
		sf.getCurrentSession().update(userForUpd);
		
		return userForUpd;
	}

	public VAppUser get(int idn) {
		return (VAppUser) sf.getCurrentSession().get(VAppUser.class, idn);
	}
	
	public VAppUser getByName(String userName) {
		
		return (VAppUser)sf.getCurrentSession().createQuery("FROM " + VAppUser.class.getName() + " WHERE userName = :user").setString("user", userName).uniqueResult();
	}
	
	public  List<VAppUser> getDependentUserList(int supervisor)
	{
    	List<VAppUser> dependentUserList = sf.getCurrentSession().createQuery("FROM " + VAppUser.class.getName() + 
    			" WHERE userSupervisorIdn = :supervisor OR supervisorReplacementIdn = :supervisor").setInteger("supervisor", supervisor)
    			.list();
    	
    	return dependentUserList;		
	}	
}
