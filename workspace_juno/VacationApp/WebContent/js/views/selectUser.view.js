App.Views.SelectUser = Backbone.View.extend({
	
	tagName: "select",
	 
	initialize: function()
	{
		console.log('selectUserView init');
		_.bindAll(this, 'render');
		//this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-selectUser').text(); 
		this.template = _.template( text ); 

		this.render();
    },

    render: function() {
		console.log('selectUser render');
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		this.$el.html( html );
		
		_.each(this.collection.models, function (user){
			//var userOptionView = new App.Views.UserOption({ model: user });
			//self.$( '#selUser' ).append( userOptionView.$el );
			
			var option = $("<option />").text(user.get("firstName")+ " "+user.get("lastName")).attr("value", user.get("id"));
			self.$( '#selUser' ).append( option );
		});

    	return this; 
    },
    events: {
    	"change #selUser": 'selectUser'
    },

    selectUser: function(){
    	console.log("select user ");
    	var userId = this.$("option:selected").val();
    	var user  = this.collection.get(userId);
    	user.set("selected", "selected");
    	App.calendar.set("userId", user.get("id"));
    },

});