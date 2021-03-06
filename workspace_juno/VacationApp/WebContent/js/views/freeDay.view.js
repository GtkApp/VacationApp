App.Views.DayFreeView = Backbone.View.extend({



	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind("change", this.render);

		var text = $("#template-dayFree").text(); 
		this.template = _.template( text ); 

		this.render();
    },
    render: function() {
//		console.log('RightPanel render');

		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html( html ); 
		console.log(this.model);
		$("#freeD").append("Dostepne dni: "+ this.model.get("daysAvail"));

    	return this; 
    }

    });
