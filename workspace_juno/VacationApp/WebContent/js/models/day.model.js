App.Models.Day = Backbone.Model.extend({

	idAttribute: "dateStr",
		
    defaults: {
        dateStr: "",    	
        dayOfMonth:"",
        monthNumber:"",
        yearNumber: "",
        dayOfWeek:"",
        status:"",
        classNames:"",
        disabled:"",
        dateFormat: 'YYYY-MM-DD',
        selected: false
	},
	
	initialize: function(args){
	
		var dateStr = args.dateStr;
		var mObj = moment(dateStr, this.get("dateFormat"));
		
		this.set("dayOfMonth", mObj.date());
		this.set("monthNumber", mObj.month());
		this.set("yearNumber", mObj.year());
		this.set("dayOfWeek", mObj.day());
		
		var dw = this.get("dayOfWeek");
		var status = this.get("status");
		if (status == "" && this.isWeekendOrHoliday()){
			this.set("status", 7);	
		} 
		
		var parent = args.parent;
		this.set("parent", parent);
	},
	
	 //add or remove days to/from vacationDays collection; only working days can be added 
	 //another solution is to not modify model during day selecting, but after send button pressing
	 //the second solution would prevent delays during days selecting, because only DOM would be modified  
	toggle: function(){

		var workingDay = !this.isWeekendOrHoliday();
		if(workingDay){
			var status = this.get("status");
			var vacationDays = this.get("parent").get("userVac").get("vacationDays");			
	    	var dates = _.pluck(vacationDays, "dateStr");
	    	var idx = _.indexOf(dates, this.get("dateStr"));
	    	if (idx == -1 && (status == "" || status == CONST.statusMarked) ) {
	    		var obj = {"dateStr": this.get("dateStr"), "status": this.get("status")};
	    		vacationDays.push(obj);
	    		console.log(obj.dateStr+" added");
	    	}
	    	else{
	    		console.log("selected="+this.get("selected"));
	    		if (this.get("selected") && this.get("status")==CONST.statusMarked){
	    			var obj = vacationDays[idx];
		    		vacationDays.splice(idx,1);
		    		console.log(obj.dateStr+" removed");
	    		}
	    	}

			this.set("selected", !this.get("selected"));
			var selected = this.get("selected");
			
			if (status == "" || status == CONST.statusMarked){
				if (selected){
					this.set("status", CONST.statusMarked);
				}
				else{
					this.set("status", "");	
				}	
			}
			console.log("selected : "+ selected+" status : "+this.get("status"));
			console.log(vacationDays);
		}
	},

	resetStatus: function(){
		this.set("status","");
		if (this.isWeekendOrHoliday()){
			this.set("status", 7);	
		} 
	},
	
	isWeekendOrHoliday: function(){
		var dw = this.get("dayOfWeek")
		return (dw == 6 || dw == 0)	
	}
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