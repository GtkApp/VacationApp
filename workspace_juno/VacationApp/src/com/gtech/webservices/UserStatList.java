package com.gtech.webservices;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Collection;


@XmlRootElement(name = "user_status_list")
public class UserStatList {
    private Collection<UserStat> userStatusList;

    @XmlElement(name = "user_status")
    public Collection<UserStat> getUserStatusList()
    {
        return userStatusList;
    }

    public void setUserStatusList(Collection<UserStat> userStatusList)
    {
        this.userStatusList = userStatusList;
    }
    
    public void addUserToStatusList(UserStat userStat)
    {
        this.userStatusList.add(userStat);
    }     
    
}