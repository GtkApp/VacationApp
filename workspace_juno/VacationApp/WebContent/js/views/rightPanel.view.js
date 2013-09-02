App.Views.RightPanel = Backbone.View.extend({

	initialize: function()
	{
		//console.log('RightPanelView init');
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);

		var text = $('#template-rightPanel').text(); 
		this.template = _.template( text ); 
		
		this.render();
    },

    render: function() {
		console.log('RightPanel render');

		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html( html ); 
    	return this; 
    },
    events: {
    	"click button.send-vac": 'send',
    	"click button.cancel-vac": 'cancel'
    },
    send: function(){
    	
//		console.log(this.model.toJSON());  

        //console.log(this);
        App.vacation = new App.Models.Vacation();

        
        var userVac = new App.Models.UserVac(this.model.userVac);
        vacationDays = (userVac.get("vacationDays"));
        
        var numberOfDays = 0;
        var vacationSince = 0;
        var vacationUntil = 0;


        for (var i in vacationDays)
        {      
            //check request integrity
            if (vacationSince == 0 || Date.parse(vacationDays[i].dateStr).compareTo(Date.parse(vacationSince)) == -1)
            {
                   vacationSince =  vacationDays[i].dateStr;
            }
            if (vacationUntil == 0 || Date.parse(vacationDays[i].dateStr).compareTo(Date.parse(vacationUntil)) == 1)
            {
                   vacationUntil =  vacationDays[i].dateStr;
            }

            numberOfDays++;

            vacationDays.splice(i,1);
            
        }


        //check if days are no used yet


        if (numberOfDays && vacationSince && vacationUntil)
        {
            
            App.vacation.set("idn", 0);         
            App.vacation.set("numberOfDays", numberOfDays);
            App.vacation.set("numberOfOutstandingDaysUsed", 0);
            App.vacation.set("statusOfVacationRequest", "WAITING_FOR_ACCEPTATION");
            App.vacation.set("typeOfVacation", "VACATION");
            App.vacation.set("userName", "gbielanski");
            App.vacation.set("vacationSince", vacationSince);
            App.vacation.set("vacationUntil", vacationUntil);
            console.log("vacation from "+vacationSince);
            console.log("vacation until "+vacationUntil);
   
            App.vacation.url = "https://localhost:8443/VacationApp/Deeper/Rest/NewVacation";
            console.log("send !!!");
            App.vacation.save({
            },
            {
                success: function(model,response,options){
                    console.log("urlop dodany");
                },
                error: function(model,response,options){
                    console.log("save error");
                }
            });
        
		}
		//this.model.saveData();
    },
    
    cancel: function(){
    	console.log("cancel !!!");
        var userVac = new App.Models.UserVac(this.model.userVac);
        vacationDays = (userVac.get("vacationDays"));




    	

        App.vacation = new App.Models.Vacation();
        App.vacation.set("idn", 11);
        App.vacation.set("numberOfDays", 2);
        App.vacation.set("numberOfOutstandingDaysUsed", 0);
        App.vacation.set("statusOfVacationRequest", "WAITING_FOR_CANCELLATION");
        App.vacation.set("typeOfVacation", "VACATION");
        App.vacation.set("userName", "gbielanski");
        //App.vacation.set("vacationSince", "2013-10-11");
        //App.vacation.set("vacationUntil", "2013-10-11");
        App.vacation.url = "https://localhost:8443/VacationApp/Deeper/Rest/ExistingVacation";
        /*
        App.vacation.save({
            },
            {
                success: function(model,response,options){
                    console.log("urlop usuniety");
                },
                error: function(model,response,options){
                    console.log("save error");
                    console.log(response);
                }
            });
*/
        //read day



        var userVac = new App.Models.UserVac(this.model.userVac);
        var vacation = this.model.get('vacations').vacations;

        console.log(vacationDays);

        //vacationDays = (userVac.get("vacationDays"));
        
        var found = 0;


       for (var j in vacationDays)
       {

 
           for (var i in vacation)
            {
                
                dcancel = new Date.parse(vacationDays[j].dateStr); 
                dsince = new Date(vacation[i].vacationSince).clearTime();        
                duntil = new Date(vacation[i].vacationUntil).clearTime();


                if (dcancel.between(dsince, duntil))
                {
                        if (vacation[i].statusOfVacationRequest == "ACCEPTED" || 
                            vacation[i].statusOfVacationRequest == "WAITING_FOR_ACCEPTATION")
                        {    

                            console.log("day in vacation id ="+vacation[i].idn);
                            found = 1;  
                            vacationDays.splice(j,1);
                            alert("Request for cancellation sent");
                            break;
                        }
                }    
        
            }
        }

        if (found == 0)
            console.log("no such vacation");

    }


});