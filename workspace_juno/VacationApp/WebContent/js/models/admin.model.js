App.Models.Admin = Backbone.Model.extend({

	defaults:{
		userId: "",
		requestCollection: "default request collection",
		vacationRequests: ""
        },

   	urlRoot : '/WebContent',
	url : function() {
	    //return "data/userReqs_"+this.get("userId")+".json";

		return  "Deeper/Rest/VacationListByUser/2013-01-01/2013-12-31/"+(this.get("userId") + 1);
	},

    initialize: function() {
			this.set("userId", "1"); // it isn't in defaults, because selecting user with no requests would set data for user 1
			//this.fetchData();
			
    		this.on("change:userId", function(model, userId){
				console.log("Admin model: Changed userId from " + this.previous("userId") + " to " + userId);
				this.fetchData();
				})
        },
        
  	fetchData: function(){
		this.fetch({
			success: function(model,response,options){
				console.log("admin model taken successfully");
				var admin = new App.Models.Admin(response);
				//model.set("requestCollection", admin);
			},
			error: function(model,xhr,options){
				console.log("Admin model: fetch failed: " + model.url());
				model.set(model.defaults);  // clear previous data not to confude them with the new user
			}
		});
	}

})
