App.Views.RightPanel = Backbone.View.extend({

	initialize: function()
	{
		console.log('RightPanelView init');
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);

		var text = $('#template-rightPanel').text(); 
		this.template = _.template( text ); 
		
		this.render();
    },

    render: function() {
		console.log('RightPanel render');

		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html( html ); 
    	return this; 
    },
    events: {
    	"click button.send-vac": 'send',
    	"click button.cancel-vac": 'cancel'
    },
    send: function(){
    	console.log("send !!!");
		console.log(this.model.toJSON());    	
    	this.model.saveData();
    },
    
    cancel: function(){
    	console.log("cancel !!!")
    	console.log(this.model.toJSON());
    }


});