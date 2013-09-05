$(function() {


    

	//App.profile.save();
	App.router = new App.Router();

	/*App.router.on('route:defaultRoute', function (actions) {
		alert( actions );
	});*/
    Backbone.history.start();







  $('#lang-pol').click(function(){

	  console.log("click pl");
        if (document.location.hash.indexOf('/EN') == -1)    
            address = document.location.hash;
        else
        {
            address = document.location.hash.replace("/EN", "");
        }
 
        Backbone.history.navigate(address, true); 
    });


    $('#lang-eng').click(function(){
    	console.log("click en");
        if (document.location.hash.indexOf('/EN') == -1)    
	    {
           if (document.location.hash == '')
                address = "tab1/EN"
            else
                address = document.location.hash + '/EN';
           console.log("address= "+address); 
        }   

        else
            address = document.location.hash;

        Backbone.history.navigate(address, true); 
       }); 
		
});
