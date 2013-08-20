App.Router = Backbone.Router.extend({

	routes: {
		"tab1": "index",
		"tab1/EN": "index_EN",
		"tab2":"vacSummary",
		"tab2/EN": "vacSummary_EN",
		"":"index",
	},


	common_Pl: function() {
			$("#cal-but").prop("href", "#tab1");
			$('#cal-but').text("Kalendarz");
			$('#Reqs').prop("href", "#tab2");
			$('#Reqs').text("Wnioski");			
			$('#appName').text("Aplikacja Urlopowa");
			$('#appName').prop("href", "#");
	},


	common_En: function() {

			$("#cal-but").prop("href", "#tab1/EN");
			$('#cal-but').text("Calendar");
			$('#Reqs').prop("href", "#tab2/EN");
			$('#Reqs').text("Requests");
			
			$('#appName').text("Vacation Application");
			$('#appName').prop("href", "#tab1/EN");
	},

	common_Cal: function() {
	
			$('#calendar').removeClass('hide');

    		$('#tab2').addClass('hide');
    		$('#tab2').removeClass('active');
    		$('#rightPanel').removeClass('hide');
    		
			$('#li_Cal').addClass('active');
			$('#li_Req').removeClass('active');



	},

	common_Req: function() {

			$('#calendar').addClass('hide');    	
			$('#rightPanel').addClass('hide');
    		$('#tab2').addClass('active');
    		$('#year').removeClass('active');
			$('#li_Cal').removeClass('active');
			$('#li_Req').addClass('active');



	},




    index: function() {
        //this.displayYear(moment().year());
   		

   		App.calendar = new App.Models.Calendar();
		App.calendarView = new App.Views.Calendar({model: App.calendar, el:'#calendar'});
		
		App.users = new App.Collections.User();
		App.selectUserView = new App.Views.SelectUser({collection: App.users, el:'#selectUser'});
		App.users.fetch({
			success: function(model,response,options){
			},
			error: function(model,xhr,options){
				console.log('error'+model+' xhr='+xhr+' options='+options);
				alert('error');
			}//,async:false
		});
		
		App.rightPanel = new App.Models.RightPanel();
		App.rightPanelView = new App.Views.RightPanel({model: App.calendar, el:'#rightPanel'});

		
		App.calendar.fetch({
			success: function(model,response,options){
				model.set("selectedDays", response);
			},
			error: function(model,xhr,options){
				console.log('error'+model+' xhr='+xhr+' options='+options);
				//alert('error');
			}
		});

    		
			this.common_Cal();
			this.common_Pl();

			
    },


    index_EN: function(){
    		
			this.common_Cal();
			this.common_En();

    },



    vacSummary: function() {


    		App.vacSummary = new App.Collections.VacSummary();
			App.summaryView = new App.Views.VacSummary({collection: App.vacSummary, el:'#request', lang: '1'});

			App.vacSummary.fetch({
			success: function(model,response,options){
			},
			error: function(model,xhr,options){
				console.log('error'+model+' xhr='+xhr+' options='+options);
				alert('error');
			}//,async:false
		});

      		
			this.common_Req();
			this.common_Pl();
	



    },
    vacSummary_EN: function() {

		this.common_Req();
		this.common_En();

		App.vacSummary = new App.Collections.VacSummary();
		App.summaryView = new App.Views.VacSummary({collection: App.vacSummary, el:'#request', lang: '2'});
    }

});