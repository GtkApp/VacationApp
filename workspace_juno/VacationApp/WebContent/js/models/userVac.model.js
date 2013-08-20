App.Models.UserVac = Backbone.Model.extend({

    defaults:{
        userId:"",
        vacationDays: [], //[{dateStr: 2013-12-01, status: 1}, ...]
        yearNumber: ""
        
	},

	initialize: function(){
/*
		//this.listenTo(parent, "change", function(model){
			
		this.on("change:yearNumber", function(model){
			this.fetch({
				success: function(model,response,options){
console.log("fetch success");					
console.log(response);
	//console.log(model.toJSON());
	//console.log(model.get("parent"));				
					//var userVac = new App.Models.UserVac(response);
					//model.get("parent").set("userVac", userVac);
				},
				error: function(model,xhr,options){
					alert('error');
				}
			});
console.log("fetch userVac!!!!");			
//			console.log("todo:  fetch userVac data on year change!!!!");			
		});
*/
	},
	
/*
	urlRoot : '/WebContent',
	
	url : function() {
	  	//console.log("data/userVac_"+this.get("userId")+"_"+this.get("yearNumber")+".json");
	    return "data/userVac_"+this.get("userId")+"_"+this.get("yearNumber")+".json";
	},
*/

	resetToDefaults: function(){
		this.clear();
    	this.set(this.defaults);
	}
	
/*
	 parse: function(response){
        return response.vacationDays;
     }
*/

});