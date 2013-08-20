App.Views.Year = Backbone.View.extend({

	initialize: function()
	{
		_.bindAll(this, 'render');
		
		this.model.bind('change', this.render);
		this.model.get("monthCollection").bind('change', this.render);
		
		var text = $('#template-year').text(); // robimy tylko jedno zapytanie do struktury DOM
		this.template = _.template( text ); // i od razu tworzymy funkcję z tym szablonem
		
		this.render();
    },

    render: function() {
    	console.log('Year render');
    	
		var data = this.model.toJSON();
		
		var monthCollection = this.model.get("monthCollection"); 
	
		var html = this.template(data);
		var self = this;

		this.$el.html( html );

		var month = 0;

		_(3).times( function(y) {
			_(4).times( function(x) {

				var monthView = new App.Views.Month({ model: monthCollection.at(month)  });
				self.$( '#year-'+y ).append( monthView.$el );
				month++; // go next
			});
		});
		
     	return this; 
    },
    
    events: {
    	click: "mark3"
    },
    
    mark3: function(){
    	console.log("mark3 from year.view.js");
   	    //var $btn = $(event.currentTarget); // to nie jest zalecane, powinno byc cos w stylu: this.model.get('id');
    	//console.log($btn.attr("id"));
    	//alert('year '+$btn.attr("id"));
    }
    
});