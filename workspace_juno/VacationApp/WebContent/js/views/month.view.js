App.Views.Month = Backbone.View.extend({

	// tagName: 'div',
	className: 'span3',

	initialize: function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.model.get("dayCollection").bind('change', this.render);

		var text = $('#template-month').text(); // robimy tylko jedno zapytanie do struktury DOM
		this.template = _.template( text ); // i od razu tworzymy funkcję z tym szablonem

		this.render();
    },

    render: function() {
		console.log('Month render');
		
		var self = this;
		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html( html );

		var dayCount = 0;
		var daysCollection = this.model.get("dayCollection");
		var weekdays = data.weekdaysMin;
		
		var map = [], i = 0, j = 0; 
		_(7).times( function(i) {
			if (i==6) i = 0;		 					
			else i++;	
			map[j] = i;
			j++;
		});
				
		var tr = $('<tr />');

		_(7).times( function(i) {	 
		 	var th = $('<th />').css("line-height", "10px").css("font-weight", "normal").css("font-size", "10px")
		 						.css('padding', '5px');
			//if (i==6) i = 0;		 					
			//else i++;	
			th.append(weekdays[map[i]]);
			tr.append(th);	
		}); 
        self.$('thead').append(tr);

		_(data.weeksInMonth).times( function(y) {
			var row = $('<tr />');
	        _(7).times( function(x) {
	            if (
	            	( ((x+1>=data.dayOfWeek || y > 0) && data.dayOfWeek!=0) ||
	            	  ((x-6>=data.dayOfWeek || y > 0) && data.dayOfWeek==0)
	            	) && dayCount < data.daysInMonth
	               ){
	            	var dayView = new App.Views.Day({model: daysCollection.at(dayCount) }); //, el: '#day-'+dayCount
		            row.append(dayView.$el);
		            dayCount++;
	            }
	            else 
	            {
	            	row.append($('<td />'));
	            }
	        });

	        self.$('tbody').append(row);
	    }); 

    	return this;    
    },
    
    events: {
    	"click button": 'addItem'
    },
    addItem: function(){
    	console.log('click button from month.view.js');
    }    

});