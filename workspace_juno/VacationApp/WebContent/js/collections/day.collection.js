App.Collections.Day = Backbone.Collection.extend({
	model: App.Models.Day,
	
	selected: function(){
		return this.filter(function(day){
			return day.get("selected");
		});
	},
	
	marked: function(){
		return this.filter(function(day){
			var status = day.get("status");
			return (status != "" && status != 7);
		});
	},

	weekend: function(){
		return this.filter(function(day){
			var dw = day.get("dayOfWeek");
			return (dw==6 || dw==0);
		});
	},
	
	clearSelections: function(){
		var selDays = this.selected();
		_.each(selDays, function(day){
			day.toggle();
		});
	},
	
	resetStatus: function(){
		var markedDays = this.marked();
		_.each(markedDays, function(day){
			day.resetStatus();
		});
	}
	
});