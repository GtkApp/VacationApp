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
    	console.log("send !!!");
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
        }

        App.vacation.set("idn", 0);         
        App.vacation.set("numberOfDays", numberOfDays);
        App.vacation.set("numberOfOutstandingDaysUsed", 0);
        App.vacation.set("stausOfVacationRequest", "WAITING_FOR_ACCEPTATION");
        App.vacation.set("typeOfVacation", "VACATION");
        App.vacation.set("userName", "gbielanski");
        App.vacation.set("vacationSince", vacationSince);
        App.vacation.set("vacationUntil", vacationUntil);
        console.log(vacationSince);
        console.log(vacationUntil);
        /*
        App.vacation.url = "https://localhost:8443/VacationApp/Deeper/Rest/NewVacation";
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
        */
		
		//this.model.saveData();
    },
    
    cancel: function(){
    	console.log("cancel !!!")
    	console.log(this.model.toJSON());

        App.vacation = new App.Models.Vacation();
        App.vacation.set("idn", 11);
        App.vacation.set("numberOfDays", 2);
        App.vacation.set("numberOfOutstandingDaysUsed", 0);
        App.vacation.set("stausOfVacationRequest", "WAITING_FOR_CANCELLATION");
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
        var vacations = new App.Collections.Vacations(this.model.vacations);
        vacationDays = (userVac.get("vacationDays"));
        console.log("vacation = ");
        console.log(vacation);
        for (var i in vacationDays)
        {      
                   

//zaznaczony urlop do skasowania
                   vacationDays[i].dateStr;
                   



            

        }




        //find vacation id


    }


});