App.Views.Calendar = Backbone.View.extend({

	initialize: function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);

		var text = $('#template-calendar').text(); // robimy tylko jedno zapytanie do struktury DOM
		this.template = _.template( text ); // i od razu tworzymy funkcję z tym szablonem

		this.render();
    },

    render: function() {
    	
    	console.log('Calendar render');
    	
		var data = this.model.toJSON();
		var html = this.template(data);
		
		// ustawiamy główny szablon dla #calendar
		this.$el.html(html);
		
		// tworzymy podwidoki
		var year = new App.Views.Year({ el: "#year", model: this.model.get("yearModel") });
		this.$el.append(year.$el);
		
     	return this; 
    },
    
    events: {
    	"click table button": "mark4",
    	"click button.next-year": "gotoNextYear",
    	"click button.prev-year": "gotoPrevYear",
		"click button.clear-selected": "clearSelected",
    },
    
    mark4: function(){
    	console.log('calendar');
    },

    gotoNextYear: function() {
    	var yearNumber = this.model.get('yearNumber');
    	this.model.set('yearNumber', moment().year(yearNumber).add('y',1).year());
    },
	
	
	gotoPrevYear: function() {
		var yearNumber = this.model.get('yearNumber');
		this.model.set('yearNumber', moment().year(yearNumber).subtract('y',1).year());
	},
	
	//trigerred by 'clear-selected' button
	clearSelected: function() {
		var yearModel = this.model.get('yearModel');
		yearModel.clearSelections();
	}
	    
});