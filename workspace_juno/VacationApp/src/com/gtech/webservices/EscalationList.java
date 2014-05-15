package com.gtech.webservices;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ESCALATION_LIST")
public class EscalationList {
	@Id
	@GeneratedValue	
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	private String senderMail;
	
	private int nameIdn1;
	private int nameIdn2;
	private int nameIdn3;

	private String mail1;
	private String mail2;
	private String mail3;
	
	public String getSenderMail() {
		return senderMail;
	}
	public void setSenderMail(String senderMail) {
		this.senderMail = senderMail;
	}
	
	public int getNameIdn1() {
		return nameIdn1;
	}
	public void setNameIdn1(int nameIdn1) {
		this.nameIdn1 = nameIdn1;
	}
	public int getNameIdn2() {
		return nameIdn2;
	}
	public void setNameIdn2(int nameIdn2) {
		this.nameIdn2 = nameIdn2;
	}
	public int getNameIdn3() {
		return nameIdn3;
	}
	public void setNameIdn3(int nameIdn3) {
		this.nameIdn3 = nameIdn3;
	}
	public String getMail1() {
		return mail1;
	}
	public void setMail1(String mail1) {
		this.mail1 = mail1;
	}
	public String getMail2() {
		return mail2;
	}
	public void setMail2(String mail2) {
		this.mail2 = mail2;
	}
	public String getMail3() {
		return mail3;
	}
	public void setMail3(String mail3) {
		this.mail3 = mail3;
	}


	
}
