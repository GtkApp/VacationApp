package com.gtech.webservices;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class EscalationListDaoImpl implements EscalationListDao{

	@Autowired
	private SessionFactory sf;
	
	@Override
	public EscalationList get() {
		
		EscalationList EscList = (EscalationList)sf.getCurrentSession().createQuery("FROM " + EscalationList.class.getName()).uniqueResult();

    	return EscList;
	}
	
	@Override
	public void save(EscalationList esl) {
		sf.getCurrentSession().save(esl);
		
	}
	
	@Override
	public EscalationList update(EscalationList esl) {
		sf.getCurrentSession().update(esl);
		
		return esl;
		
	}


}
