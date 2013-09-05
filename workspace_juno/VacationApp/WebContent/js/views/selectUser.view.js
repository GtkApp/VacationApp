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
	//	console.log('selectUser render');
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		this.$el.html( html );


console.log("this.collection.models");
		

		
		
	//	App.users = new App.Collections.User(this.collection.model);

		_.each(this.collection.models, function (user){


			var userData = user.get("userList");

			for (var i in userData)
			{
				var option = $("<option />").text(userData[i].userName).attr("value", userData[i].userIdn);
				self.$( '#selUser' ).append( option );
			}
	
			
		});

    	return this; 
    },
    events: {
    	"change #selUser": 'selectUser'
    },

    selectUser: function(){
    	console.log("select user ");
    	var userId = this.$("option:selected").val();
    	var emploee;

    	console.log("userId ="+userId);

		_.each(this.collection.models, function (user){


			var userData = user.get("userList");
			emploee = userData[userId - 1];

		});
/*
    	var user  = this.collection.get(userId);
*/




    	//user.set("selected", "selected");
/*
    	if(App.calendar)
    	{
    	 	console.log("App calendar");
    	    App.calendar.set("userId", userId - 1);
    	}
    	if(App.admin)
   */
    	{
		 	console.log("app admin");
		    App.admin.set("userId", userId - 1);
    	}





    //	App.calendar.set("userId", user.get("id"));
    },

});