App.Models.Calendar = Backbone.Model.extend({

    defaults:{
        userVac: "",
        yearNumber: moment().year(),
        yearModel: "",
        userId:"1",
        dateFormat: "YYYY-MM-DD"
	},

	initialize: function(){
		var yearNumber = this.get("yearNumber");
		this.buildNewYear(yearNumber);
		this.fetchData();
		
/*//////// 
może parent dodać do userVac, ale jak przekazać referencje ? - this nie działa bo się zmienia w zależności w jakim 
obiekcie jest użyty 
 
 ////////////*/

		this.on("change:userVac", function(model){
			console.log("change:userVac");
			this.get("yearModel").resetStatus();
			var userVac = this.get("userVac");		
			var vacationDays = userVac.get("vacationDays");
			this.updateDayStatus(vacationDays);
			userVac.resetToDefaults();
		});

		this.on("change:yearNumber", function(model, yearNumber){
			console.log("Changed yearNumber from " + this.previous("yearNumber") + " to " + yearNumber);
			this.buildNewYear(yearNumber);
			this.fetchData();
		});
		
		this.on("change:userId", function(model, userId){
			console.log("Changed userId from " + this.previous("userId") + " to " + userId);
			this.fetchData();
		});
	},
	
	buildNewYear: function(yearNumber){
		
        var prevYear = moment().year(yearNumber).subtract('y',1).year();
        var nextYear = moment().year(yearNumber).add('y',1).year();
		var yearModel = new App.Models.Year({yearNumber:yearNumber, parent:this});
		
		this.set("yearNumber", yearNumber);
		this.set("prevYear", prevYear);
		this.set("nextYear", nextYear);
		this.set("yearModel", yearModel);
		
	},

	fetchData: function(){
		this.fetch({
			success: function(model,response,options){
				//console.log(response);
				//console.log(model.toJSON());
				var userVac = new App.Models.UserVac(response);
				model.set("userVac", userVac);
			},
			error: function(model,xhr,options){
				alert('error');
			}
		});
	},
	
	saveData: function(){
		this.save(this.get("userVac"), {
	        success: function (userVac) {
	            console.log(userVac.toJSON());
	        },
			error: function(model,xhr,options){
				alert('error');
			}
	    })		
	},
	
	
	// set status for days fetched from database 
	updateDayStatus: function(vacationDays){

		var yearModel = this.get("yearModel");
		var monthCollection = yearModel.get("monthCollection");
		vacationDays = this.addDayAndMonthAttr(vacationDays);
		
		var groupedVacDays = this.groupVacDays(vacationDays);
		for(month in groupedVacDays) { 
		    var vacDaysInMonth = groupedVacDays[month];
			var monthModel = monthCollection.at(month);
		    var dayCollection = monthModel.get("dayCollection");
		    
		    var model_idx = 0;
		    for (var model_idx in vacDaysInMonth) {  
		    	var vacDay = vacDaysInMonth[model_idx];
		        var day = dayCollection.at(vacDay.dayOfMonth-1);
		        day.set("status", vacDay.status);
		    }
		}
	},
	
	groupVacDays: function(vacationDays){
		return _.groupBy(vacationDays, function(item){
			return item.month;	
		});
	},
	
	//date in YYYY-MM-DD format is parsed to retrieve month and day of month
	addDayAndMonthAttr: function(vacationDays){
		_.each(vacationDays, function(item){
			var mObj = moment(item.dateStr, this.dateFormat);
			var month = mObj.month();
			var dayOfMonth = mObj.date();
			item.month = month;
			item.dayOfMonth = dayOfMonth;
		});
		return vacationDays;
	},
	
	parse: function(response){
        return response.userVac;
    },

	urlRoot : '/WebContent',
	
	url : function() {
	  	//console.log("data/userVac_"+this.get("userId")+"_"+this.get("yearNumber")+".json");
	    return "data/userVac_"+this.get("userId")+"_"+this.get("yearNumber")+".json";
	},



	/*
	urlRoot : '/WebContent',
	
	url : function() {
	  
	  if (this.isNew()) {
	  	console.log("data/days_"+this.get("yearNumber")+".json");
	    return "data/days_"+this.get("yearNumber")+".json";
	  } else {
	  	console.log("data/days_"+this.get("yearNumber")+".json");
	    return "data/days_" +this.get("yearNumber")+"/"+ this.id;
	  }
	},
	*/
/*	
	methodUrl:  function(method){
	if(method == "delete"){
    		return this.attributes.urlRoot +"http://www.api.com/mymodel/" + this.attributes.id+"/delete";
    	}else if(method == "update"){
                return "http://www.api.com/mymodel/" + this.attributes.id+"/update";
        }else if(method == "create"){
                return "http://www.api.com/mymodel/create";
        } 
    	return false;
	},
	
	sync : function(method, model, options) {
	    if (model.methodUrl && model.methodUrl(method.toLowerCase())) {
	      	options = options || {};
	      	options.url = model.methodUrl(method.toLowerCase());
	    }
	    Backbone.sync(method, model, options);
	},

	sync : function(method, model, options) {
		//alert("1!!!!!!!"+this.get("yearNumber")+" "+model.attributes.yearNumber)
	    //model.set("yearNumber", this.get("yearNumber"));
	    //model.set("yearNumber", "2013");
	    //alert("2!!!!!!!"+this.get("yearNumber"))
	    console.log(model);
	    Backbone.sync(method, model, options);
	},
*/	


		
	/*,
	urlRoot: 'getListOfDays'
*/
	/*,toggleSelection: function(number) {

		var array = this.get('selections');
		var index = $.inArray( number, array );

		if (index == -1) // nie jest w tablicy
		{
			array.push( number );
		}
		else
		{
			array.splice(index, 1);
		}

		// wager.set('selections', array );

		this.set({'selections': array });
	}*/

});