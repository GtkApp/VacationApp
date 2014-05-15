App.Models.ListVac = Backbone.Model.extend({

	defaults:{
        year: moment().year(),
		vacations:"",
        vacationSince:"",
        vacationUntil: "",
        
        },




        initialize: function(){
        var yearNumber = this.get("year");
        console.log("year ="+yearNumber);       
                    this.fetchListVac();        

        this.on("change:year", function(model) {

            console.log("Zmiana roku w liscie");
            this.fetchListVac(); 


        });


        
   },    


     fetchListVac: function(){
//			console.log(this);
			console.log("pobieranie listy urlopow "+this.get("year"));

            this.url = "Deeper/Rest/VacationList/"+ this.get("year") +"-01-01/"+this.get("year")+"-12-31";
            
            this.fetch({
                success: function(model,response,options){
            	return 0;
            },
            error: function(model,xhr,options){
                console.log(model);
                console.log(xhr);
                console.log(options);
        		return 1;
            }

			
    
			});
        }
   });