App.Models.Year = Backbone.Model.extend({

    defaults:{
        name:"",
        yearNumber: "",
        monthCollection: "",
        dateFormat: "YYYY-MM-DD"
	},

	initialize: function(args){
	
		var yearNumber = args.yearNumber;
		var parent = args.parent;
		var monthCollection = new App.Collections.Month();
		for (var i = 0; i < 12; i++) {
			var monthModel = new App.Models.Month({ yearNumber:yearNumber, monthNumber:i, parent: parent });
			monthCollection.add(monthModel);
		}
		this.set("yearNumber", yearNumber);
		this.set("monthCollection", monthCollection);

	},
	
	//find day by its date in YYYY-MM-DD format
	findDay: function(dateStr){
		var mObj = moment(dateStr, this.get("dateFormat"));
		var month = mObj.month();
		var monthModel = this.get("monthCollection").at(month);
		var dayCollection = monthModel.get("dayCollection");
		return dayCollection.get(dateStr);
	},
	
	//get array of all selected days in year
	selected: function(){
		return this.get("monthCollection").selected();
	},
	
	//clear selections for all selected days
	clearSelections: function(){
		this.get("monthCollection").clearSelections();
	},
	
	//clear status of marked days  
	resetStatus: function(){
		this.get("monthCollection").resetStatus();
	}
	

});