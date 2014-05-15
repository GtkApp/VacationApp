App.Views.SelectVacType = Backbone.View.extend({
	
	tagName: "select",
	 
	initialize: function()
	{
	//	console.log('selectVacTypeView init');
		_.bindAll(this, 'render');
		this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-selectVacType').text(); 
		this.template = _.template( text ); 

		this.render();
	//	App.admin.set("vacTypeId", 0);
    },

    render: function() {
    	//nie uruchamia sie po wyslaniu wniosku - nie sa odswiezane wartosci
		console.log('selectUser render');
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		this.$el.html( html );

		var vacType = [];
		var RestType = [];

		vacType.push("Wybierz typ urlopu...");
		vacType.push("wypoczynkowy");
		vacType.push("bezpłatny");
		vacType.push("specjalny");
		vacType.push("macierzynski");
		vacType.push("narodziny dziecka");
		vacType.push("na żądanie");
		vacType.push("opieka nad dzieckiem");
		vacType.push("poszukiwanie pracy");
		vacType.push("inny");



		RestType.push(0);
		RestType.push("VACATION");
		RestType.push("UNPAID");
		RestType.push("SPECIAL");
		RestType.push("PARENTAL");
		RestType.push("AFTER_THE_BIRTH");
		RestType.push("ON_DEMAND");
		RestType.push("CHILD_CARE");
		RestType.push("JOB_SEARCH");
		RestType.push("OTHER");





		
	//	App.users = new App.Collections.User(this.collection.model);

//		_.each(this.collection.models, function (user){


//			var userData = user.get("userList");

			for (var i in vacType)
			{
				var option = $("<option />").text(vacType[i]).attr("value", RestType[i]);
				self.$( '#selVacType' ).append( option );
			}
				
//		});

    	return this; 
    },
    events: {
    	"change #selVacType": 'selectVacType'
    },

    selectVacType: function(){

    	console.log("zmiana typu wakacji ");

    	//pobierz dostepny urlop	
    		App.vacSummary.fetch({
				success: function(model,response,options){
			//		App.calendar.set("userName", response.name);
					App.calendar.set("vacSummary", response);
				},
				error: function(model,xhr,options){
					console.log(model);
					console.log(xhr);
					console.log(options);
				}
				});


    	var vacTypeId = this.$("option:selected").val();
    	//console.log("vacTypeId "+vacTypeId);
    	var emploee;
    	daysAv = -1;
	    App.calendar.set("vacTypeId", vacTypeId);
    
	    vacSummary = App.calendar.get("vacSummary");
	
	    switch(vacTypeId)
	    {
	    	case "VACATION":
	    		daysAv = vacSummary.daysVacation;
	    		break;
	    	case "UNPAID": 
	    		daysAv = vacSummary.daysUnpaid;
	    		break;
	    	case "SPECIAL":
	    		daysAv = vacSummary.daysSpecial;
	    		break;
			case "PARENTAL":
	    		daysAv = vacSummary.daysParental;
	    		break;

	    }

	    App.freeDay.set("daysAvail", daysAv);

    },

});