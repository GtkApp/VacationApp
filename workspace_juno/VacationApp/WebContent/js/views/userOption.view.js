App.Views.UserOption = Backbone.View.extend({

	tagName: "option",

	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind("change", this.render);

		var text = $("#template-userOption").text(); 
		this.template = _.template( text ); 

		this.render();
    },

    render: function() {
		console.log("userOption render");
		
		var self = this;
		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html( html );

    	return this;    
    },
    
    events: {
    	"change": "selectOption"
    },
    
    selectOption: function(){
    	this.model.set("selected", "selected");
    	console.log("click option");
    	console.log(this.model.toJSON());
    }    

});