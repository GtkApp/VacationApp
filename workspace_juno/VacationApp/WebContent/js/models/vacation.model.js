App.Models.Vacation = Backbone.Model.extend({
	
	/*	
    defaults: {
        dateStr: "",    	
        status:""
	},
	*/

		newData: function(){
			console.log(this);

			this.url = "Deeper/Rest/NewVacation";

			this.save({
            },
            {
                success: function(model,response,options){
                    //alert("Urlop dodany");
                    console.log("Urlop dodany");
                    App.calendar.fetchData();
                    
                    App.vacSummary.fetch({
                        success: function(model,response,options){
                            //console.log(model.get("App.calendar"));
                            //App.calendar.set("userName", response.name);
                            //console.log(response);
                            App.calendar.set("vacSummary", response);
                        },
                        error: function(model,xhr,options){
                        console.log(model);
                        console.log(xhr);
                        console.log(options);
                        }
                });


                },
                error: function(model,response,options){
                    console.log("save error");
                }
            });
		},

		existData: function(){
			console.log("existData");

			this.url = "Deeper/Rest/ExistingVacation";

			this.save({
            },
            {
                success: function(model,response,options){

                    alert("Urlop zmodyfikowany");
                    App.calendar.fetchData();
                    var year = new Date().getFullYear();
                    App.listVac.fetchListVac(year);
                    //admin view refresh
                    App.admin.fetchAdminData(); 
                    
                    return 0;
                },
                error: function(model,response,options){
                    console.log("save error");
                    return 1;
                }
            });
		}



});