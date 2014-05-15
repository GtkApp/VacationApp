package com.gtech.webservices;

public interface EscalationListDao {

	public abstract EscalationList get();
	
	public abstract void save(EscalationList EscList);
	
	public abstract EscalationList update(EscalationList EscList);	
}
