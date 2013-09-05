PROJECT CONFIGURATION


JBOSS CONFIGURATION

1). Use standalone.xml as configuration file for jboss-as-7.1.1.Final
    In this file: 
    Check/fix paths for keystores for following elements in the standalone.xml: 
    * javax.net.ssl.trustStore
    * jrest._domainKey.example.com
    
2). Replace jboss-as-7.1.1.Final's Javamail modules with the one from: jboss-as-mail-module-7.1.3.zip (These support TLS, the original ones don't).
    Goto: [JBOSS MAIN DIR]\modules\org\jboss\as\mail\main
    Backup content of this directory and unzip the files from jboss-as-mail-module-7.1.3.zip into it.