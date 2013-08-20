App.Models.Month = Backbone.Model.extend({

    defaults: {
    	dateFormat: 'YYYY-MM-DD',
        monthNumber:"",
        yearNumber: "",
        
        weekdaysMin: ["Nd","Pn", "Wt", "Śr", "Cz", "Pt", "So"],
        months : ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec",
                  "Sierpień","Wrzesień","Październik","Listopad","Grudzień"],
                  
        monthName:"",
        dayOfWeek: "",
        weeksInMonth: "",        
        daysInMonth: "",
        
        dayCollection: ""
	},
	
	initialize: function(args){
	
		moment.lang('pl', {
			months : this.get("months")
		});

		moment.lang('pl', {
			weekdaysMin : this.get("weekdaysMin")
		});
		
		var monthNumber = args.monthNumber;
		var yearNumber = args.yearNumber;
		
		var mObj = moment([yearNumber, monthNumber]); 
		var dayOfWeek = mObj.day(); // 0 - Nd, 1 - Po, ...
		 
		var daysInMonth = mObj.daysInMonth();
		var modulo = (dayOfWeek+daysInMonth) % 7;
        var weeksInMonth = Math.floor(( (dayOfWeek==0?dayOfWeek+7:dayOfWeek) + daysInMonth)/7) + (modulo > 0 ? 1 : 0);
        
        var parent = args.parent;
        
   		var dayCollection = new App.Collections.Day();
		for (var i = 0; i < daysInMonth; i++) {
			var dateStr = moment([yearNumber, monthNumber, i+1]).format(this.get("dateFormat"));
			var dayModel = new App.Models.Day({ dateStr: dateStr, parent:parent });
			dayCollection.add(dayModel);
		}

        
        this.set("monthName", mObj.format('MMMM'));
        this.set("dayOfWeek", dayOfWeek);
        this.set("weeksInMonth", weeksInMonth);
        this.set("daysInMonth", daysInMonth);
        this.set("monthNumber", monthNumber);
        this.set("dayCollection", dayCollection);
		
		

	}
	
	
});