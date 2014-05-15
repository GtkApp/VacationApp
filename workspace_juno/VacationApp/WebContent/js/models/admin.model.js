App.Models.Admin = Backbone.Model.extend({

	defaults:{
		userId: "",
		vacTypeId: "",
		requestCollection: "default request collection",
		vacationRequests: "",
		year: moment().year(),
        },

   	urlRoot : '/WebContent',

    initialize: function() {
			this.set("userId", "1"); // it isn't in defaults, because selecting user with no requests would set data for user 1
			//this.fetchData();
			
    		this.on("change:userId", function(model, userId){
				console.log("Admin model: Changed userId from " + this.previous("userId") + " to " + userId);
				this.fetchAdminData(this.get("yearNumber"));
				}),
    		this.on("change:year", function(model){
				//console.log("Admin model: Changed userId from " + this.previous("userId") + " to " + userId);
				this.fetchAdminData(this.get("year"));
				})
        },
        
  	fetchAdminData: function(){
  		this.url = "Deeper/Rest/VacationListByUser/"+this.get("year")+"-01-01/"+this.get("year")+"-12-31/"+(this.get("userId") + 1);
		this.fetch({
			success: function(model,response,options){
				var admin = new App.Models.Admin(response);
				//model.set("requestCollection", admin);
			},
			error: function(model,xhr,options){
				console.log("Admin model: fetch failed: ");
				model.set(model.defaults);  // clear previous data not to confude them with the new user
			}
		});
	}

})
