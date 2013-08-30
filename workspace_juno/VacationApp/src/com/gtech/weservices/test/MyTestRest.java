package com.gtech.weservices.test;

import static org.junit.Assert.*;

import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.DefaultHttpClient;
import org.jboss.resteasy.client.ProxyFactory;
import org.jboss.resteasy.client.core.executors.ApacheHttpClient4Executor;
import org.junit.Before;
import org.junit.Test;

import com.gtech.webservices.VAppUserList;
import com.gtech.webservices.VacationAppInterface;

public class MyTestRest {

	@Before
	public void setUp() throws Exception {
		org.jboss.resteasy.plugins.providers.RegisterBuiltin.register(org.jboss.resteasy.spi.ResteasyProviderFactory.getInstance());
	}

	@Test
	public void test() {
		System.out.println("=>>"/* + r*/);
		DefaultHttpClient client = new DefaultHttpClient();
		 client.getCredentialsProvider().setCredentials(
                 new AuthScope("localhost", 8080),
                 new UsernamePasswordCredentials("gbielanski", "1234"));
 ApacheHttpClient4Executor executer = new ApacheHttpClient4Executor(
                 client);
 
		VacationAppInterface myREST = ProxyFactory.create(VacationAppInterface.class, "http://localhost:8080/VacationApp/Deeper/Rest/", executer);
		VAppUserList list = myREST.getUserList();
		
		//System.out.println("=>>" + list);
		fail("Not yet implemented");
	}

}
