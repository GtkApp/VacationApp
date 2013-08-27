package com.gtech.webservices;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Collection;

@XmlRootElement(name = "user_list")
public class VAppUserList {
    private Collection<VAppUser> userList;

    @XmlElement(name = "user")
    public Collection<VAppUser> getUserList()
    {
        return userList;
    }

    public void setUserList(Collection<VAppUser> userList)
    {
        this.userList = userList;
    } 
    
}