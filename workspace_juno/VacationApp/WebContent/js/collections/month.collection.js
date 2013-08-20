App.Collections.Month = Backbone.Collection.extend({
	model: App.Models.Month,

	selected: function(){
		var s = new App.Collections.Day();
		this.each(function(month){
			var selDays = month.get("dayCollection").selected();
			s.add(selDays);
		});
		return s;
	},	
	
	clearSelections: function(){
		this.each(function(month){
			month.get("dayCollection").clearSelections();
		});
	},
	
	resetStatus: function(){
		this.each(function(month){
			month.get("dayCollection").resetStatus();
		});
	}

});