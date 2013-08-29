package com.gtech.webservices;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name="VACATION_APP_USERS")
@XmlRootElement
public class VAppUser {

	@Id
	@GeneratedValue		
	private int		userIdn;

	@NotNull
	private String	userName;
	
	@Min(1)
	private int		userSupervisorIdn;
	
	@Min(0)
	private int		supervisorReplacementIdn;
	
	@NotNull
	private String	email;
	
	public int getUserIdn() {
		return userIdn;
	}
	public void setUserIdn(int userIdn) {
		this.userIdn = userIdn;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getUserSupervisorIdn() {
		return userSupervisorIdn;
	}
	public void setUserSupervisorIdn(int userSupervisorIdn) {
		this.userSupervisorIdn = userSupervisorIdn;
	}
	public int getSupervisorReplacementIdn() {
		return supervisorReplacementIdn;
	}
	public void setSupervisorReplacementIdn(int supervisorReplacementIdn) {
		this.supervisorReplacementIdn = supervisorReplacementIdn;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}	

}
