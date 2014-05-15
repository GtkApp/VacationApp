App.Router = Backbone.Router.extend({

	routes: {
		"tab1": "index",
		"tab1/EN": "index_EN",
		"tab2":"vacSummary",
		"tab2/EN": "vacSummary_EN",
		"tab3": "admin",
		"tab3/EN": "admin_EN",
		"":"index",
		"tab4": "avail",
		"tab5": "avusers"
	},


	common_Pl: function() {
			$("#cal-but").prop("href", "#tab1");
			$('#cal-but').text("Kalendarz");
			$('#Reqs').prop("href", "#tab2");
			$('#Reqs').text("Wnioski");		
			$('#Adm').prop("href", "#tab3");
			$('#Adm').text("Zarządzanie");	
			$('#Avail').prop("href", "#tab4");
			$('#Avail').text("Dostępny urlop");
			$('#appName').text("Aplikacja Urlopowa");
			$('#appName').prop("href", "#");
	},


	common_En: function() {

			$("#cal-but").prop("href", "#tab1/EN");
			$('#cal-but').text("Calendar");
			$('#Reqs').prop("href", "#tab2/EN");
			$('#Reqs').text("Requests");
			$('#Adm').prop("href", "#tab3/EN");
			$('#Adm').text("Admin");
			$('#appName').text("Vacation Application");
			$('#appName').prop("href", "#tab1/EN");
	},

	common_Cal: function() {
	
			$('#calendar').removeClass('hide');
    		$('#tab1').removeClass('hide');
    		$('#tab1').addClass('active');
    		$('#tab2').addClass('hide');
    		$('#tab2').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab3').removeClass('active');
    		$('#tab4').addClass('hide');
    		$('#tab4').removeClass('active'); 
			$('#tab5').addClass('hide');
    		$('#tab5').removeClass('active'); 
    		$('#rightPanel').removeClass('hide');
    		$('#li_Adm').removeClass('active');
			$('#li_Cal').addClass('active');
			$('#li_Req').removeClass('active');
			$('#li_Avail').removeClass('active');
			$('#li_AvUsers').removeClass('active');
	},

	common_Req: function() {

			$('#calendar').addClass('hide');    	
			$('#rightPanel').addClass('hide');
    		$('#tab1').addClass('hide');
    		$('#tab1').removeClass('active');
    		$('#tab2').addClass('active');
    		$('#tab2').removeClass('hide');
    		$('#tab3').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab4').addClass('hide');
    		$('#tab4').removeClass('active'); 
    		$('#tab5').addClass('hide');
    		$('#tab5').removeClass('active');
    		$('#year').removeClass('active');
			$('#li_Cal').removeClass('active');
			$('#li_Req').addClass('active');
			$('#li_Adm').removeClass('active');
			$('#li_Avail').removeClass('active');
			$('#li_AvUsers').removeClass('active');
	},
		common_Adm: function() {

			$('#calendar').addClass('hide');
			$('#rightPanel').addClass('hide');
    		$('#tab1').addClass('hide');
    		$('#tab1').removeClass('active');
    		$('#tab2').addClass('hide');
    		$('#tab2').removeClass('active');
    		$('#tab3').removeClass('hide');
    		$('#tab3').addClass('active');
			$('#tab4').addClass('hide');
    		$('#tab4').removeClass('active');
    		$('#tab5').addClass('hide');
    		$('#tab5').removeClass('active');  		
    		$('#year').removeClass('active');
			$('#li_Cal').removeClass('active');
			$('#li_Req').removeClass('active');
			$('#li_Adm').addClass('active');
			$('#li_Avail').removeClass('active');
			$('#li_AvUsers').removeClass('active');

	},
	common_Avail: function() {

			$('#calendar').addClass('hide');
			$('#rightPanel').addClass('hide');
    		$('#tab1').addClass('hide');
    		$('#tab1').removeClass('active');
    		$('#tab2').addClass('hide');
    		$('#tab2').removeClass('active');
    		$('#tab3').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab3').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab4').removeClass('hide');
    		$('#tab4').addClass('active');
    		$('#tab5').addClass('hide');
    		$('#tab5').removeClass('active');
    		$('#year').removeClass('active');
			$('#li_Cal').removeClass('active');
			$('#li_Req').removeClass('active');
			$('#li_Adm').removeClass('active');
			$('#li_Avail').addClass('active');
			$('#li_AvUsers').removeClass('active');
	},

common_AvUsers: function() {

			$('#calendar').addClass('hide');
			$('#rightPanel').addClass('hide');
    		$('#tab1').addClass('hide');
    		$('#tab1').removeClass('active');
    		$('#tab2').addClass('hide');
    		$('#tab2').removeClass('active');
    		$('#tab3').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab3').removeClass('active');
    		$('#tab3').addClass('hide');
    		$('#tab5').removeClass('hide');
    		$('#tab5').addClass('active');
    		$('#tab4').addClass('hide');
    		$('#tab4').removeClass('active');
    		$('#year').removeClass('active');
			$('#li_Cal').removeClass('active');
			$('#li_Req').removeClass('active');
			$('#li_Adm').removeClass('active');
			$('#li_Avail').removeClass('active');
			$('#li_AvUsers').addClass('active');
	},



    index: function() {
        //this.displayYear(moment().year());
    	this.common_Cal();
		this.common_Pl();


		if (App.calendar == undefined)
		{
   			App.freeDay = new App.Models.FreeDay();
   			App.freeDayView = new App.Views.DayFreeView({model:App.freeDay, el:"#freeD"});
   			App.calendar = new App.Models.Calendar();
 			if (App.calendar.get("userName") == "")
			{
				App.vacSummary = new App.Collections.VacSummary();
				App.vacSummary.fetch({
				success: function(model,response,options){
					//console.log(model.get("App.calendar"));
					App.calendar.set("userName", response.name);
					//console.log(response);
					App.calendar.set("vacSummary", response);
				},
				error: function(model,xhr,options){
					console.log(model);
					console.log(xhr);
					console.log(options);
				}
				});
			}
	//		var year = new Date().getFullYear();
			App.listVac = new App.Models.ListVac();
			App.listView = new App.Views.ListView({model: App.listVac, el: '#list', lang: '1'});

			
		//	App.listVac = new App.Collections.ListVac();
	
		//	App.listVac.fetchListVac(year);
	//		App.listView = new App.Views.ListView({collection: App.listVac, el: '#list', lang: '1'});
			App.users = new App.Collections.User();
			App.users.fetchDepUsers();

		}
			App.calendarView = new App.Views.Calendar({model: App.calendar, el:'#calendar'});

			App.rightPanel = new App.Models.RightPanel();
			App.rightPanelView = new App.Views.RightPanel({model: App.calendar, el:'#rightPanel'});
			App.selectVacTypeView = new App.Views.SelectVacType({collection: App.users,el:'#selectVacTypeAdm'});

			App.availUser = new App.Collections.AvailUser();
			App.availUser.fetchAvailUser();
			App.userAvailView = new App.Views.UserAvailView({collection: App.availUser, el: '#listAvail', lang: '1'});




	//	App.calendarView = new App.Views.Calendar({model: App.calendar, el:'#calendar'});
		
	//	App.users = new App.Collections.User();
	/*
		App.selectUserView = new App.Views.SelectUser({collection: App.users, el:'#selectUser'});
		App.users.fetch({
			success: function(model,response,options){
			},
			error: function(model,xhr,options){
				//console.log('error'+model+' xhr='+xhr+' options='+options);
				console.log(model);
				console.log(xhr);
				console.log(options);
			}//,async:false
		});
	*/	
	//	App.rightPanel = new App.Models.RightPanel();
	//	App.rightPanelView = new App.Views.RightPanel({model: App.calendar, el:'#rightPanel'});

	//	App.selectVacTypeView = new App.Views.SelectVacType({collection: App.users,el:'#selectVacTypeAdm'});

	

  	
			

			
    },


    index_EN: function(){
    		
			this.common_Cal();
			this.common_En();

    },



    vacSummary: function() {

    		this.common_Req();
			this.common_Pl();

/*
			App.listVac = new App.Models.ListVac();
			App.listView = new App.Views.ListView({model: App.listVac, el: '#list', lang: '1'});
*/			

			  		
			
	



    },
    vacSummary_EN: function() {

	
		this.common_Req();
		this.common_En();

		App.vacSummary = new App.Collections.VacSummary();
		App.summaryView = new App.Views.VacSummary({collection: App.vacSummary, el:'#request', lang: '2'});
    
		console.log("Fetching...");

		
			App.vacSummary.fetch({
			success: function(model,response,options){
			},
			error: function(model,xhr,options){
				console.log(model);
				console.log(xhr);
				console.log(options);
			}
		});

    },
        admin: function() {

	    this.common_Adm();
	    this.common_Pl();

	    App.admin = new App.Models.Admin();
	    App.adminView = new App.Views.Admin({model: App.admin, el: '#admin1', lang: '1'});

		
		App.users = new App.Collections.User();
		App.selectUserView = new App.Views.SelectUser({collection: App.users, el:'#selectUserAdm'});
		App.users.fetch({
			success: function(model,response,options){
				//console.log("users read success");
				//console.log(response);
			},
			error: function(model,xhr,options){
				console.log('error'+model+' xhr='+xhr+' options='+options);
				alert('error');
			}//,async:false
		});

		App.selectReqTypeView = new App.Views.SelectReqType({collection: App.users,el:'#selectReqTypeAdm'});


	    
    },
    
    admin_EN: function() {

	    this.common_Adm();
	    this.common_En();
	    
		App.users = new App.Collections.User();
		App.selectUserView = new App.Views.SelectUser({collection: App.users, el:'#selectUserAdm'});
		App.users.fetch({
			success: function(model,response,options){
				console.log("users read success");
				console.log(response);
			},
			error: function(model,xhr,options){
				console.log('error'+model+' xhr='+xhr+' options='+options);
//				alert('error');
			}//,async:false
		});

	    App.admin = new App.Models.Admin();
	    App.adminView = new App.Views.Admin(/*{model: App.admin, el: '#admin1', lang: '2'}*/);

    },
    avail: function()
    {
   		this.common_Avail();
	    this.common_Pl();

	    App.vacSummary = new App.Collections.VacSummary();
			
			App.vacSummary.fetch({
				success: function(model,response,options){
				},
				error: function(model,xhr,options){
					console.log(model);
					console.log(xhr);
					console.log(options);
				}
			
			});    		    		
			App.summaryView = new App.Views.VacSummary({collection: App.vacSummary, el:'#request', lang: '1'});
    },
    avusers: function()
    {
    	this.common_AvUsers();
	    this.common_Pl();

    }

});