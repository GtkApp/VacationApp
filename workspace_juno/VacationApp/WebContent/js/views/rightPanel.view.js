App.Views.RightPanel = Backbone.View.extend({

	initialize: function()
	{
		//console.log('RightPanelView init');
		_.bindAll(this, 'render');
	//	this.model.bind('change', this.render);

		var text = $('#template-rightPanel').text(); 
		this.template = _.template( text ); 
		
		this.render();
    },

    render: function() {
//		console.log('RightPanel render');

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

   
        App.vacation = new App.Models.Vacation();     
        var userVac = new App.Models.UserVac(this.model.userVac);


        vacationDays = (userVac.get("vacationDays"));
        
        var numberOfDays = 0;
        var vacationSince = 0;
        var vacationUntil = 0;

        for (var i in vacationDays)
        {      
           
          // console.log(i);         
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

        

        //check if days are no used yet


        if (numberOfDays && vacationSince && vacationUntil)
        {
           
            if (this.model.get("vacTypeId") == 0)
                alert("Wybierz typ urlopu!");
            else
            {
            App.vacation.set("idn", 0);         
            App.vacation.set("numberOfDays", numberOfDays);
            App.vacation.set("numberOfOutstandingDaysUsed", 0);
            App.vacation.set("statusOfVacationRequest", "WAITING_FOR_ACCEPTATION");
            App.vacation.set("typeOfVacation", this.model.get("vacTypeId"));
            App.vacation.set("userName", this.model.get("userName"));
            App.vacation.set("vacationSince", vacationSince);
            App.vacation.set("vacationUntil", vacationUntil);
            App.vacation.newData();
            //console.log(this.model);
            }
            
		}
        var yearModel = this.model.get('yearModel');
        yearModel.clearSelections();
    },
    
        cancel: function(){
        var userVac = new App.Models.UserVac(this.model.userVac);
        var vacation;
 
        vacationDays = (userVac.get("vacationDays"));   //days for cancellation

        var i=0;

        _.each(App.listVac.models, function (req){
            vacation = (req.get("vacations"));          //list of vacation
        });

        console.log(vacationDays);
        console.log(vacation);



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
                                   vacation[i].statusOfVacationRequest == "WAITING_FOR_ACCEPTATION"                         
                            )
                        {               
                            CanVacation = new App.Models.Vacation(vacation[i]);
                            CanVacation.set("statusOfVacationRequest", "WAITING_FOR_CANCELLATION");
                            CanVacation.existData();
                            found = 1;  
                            vacationDays.splice(j,1);
                            alert("Request for cancellation sent");
                            return false;
                        }
                }    
            }
        }

        if (found == 0)
            console.log("no such vacation");

    }


});