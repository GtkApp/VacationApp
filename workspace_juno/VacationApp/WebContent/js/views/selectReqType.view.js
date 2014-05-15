App.Views.SelectReqType = Backbone.View.extend({
	
	tagName: "select",
	 
	initialize: function()
	{
		console.log('selectReqTypeView init');
		_.bindAll(this, 'render');
		//this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-selectReqType').text(); 
		this.template = _.template( text ); 

		this.render();
		App.admin.set("vacTypeId", 0);
    },

    render: function() {
	//	console.log('selectUser render');
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		this.$el.html( html );

		var vacType = [];
		


		vacType.push("niezatwierdzone");
		vacType.push("wszystkie");

		
	//	App.users = new App.Collections.User(this.collection.model);

//		_.each(this.collection.models, function (user){


//			var userData = user.get("userList");

			for (var i in vacType)
			{
				var option = $("<option />").text(vacType[i]).attr("value", i);
				self.$( '#selReqType' ).append( option );
			}
	
			
//		});

    	return this; 
    },
    events: {
    	"change #selReqType": 'selectReqType'
    },

    selectReqType: function(){
    	console.log("zmiana typu wakacji ");

    	var vacTypeId = this.$("option:selected").val();
    	var emploee;


	    App.admin.set("vacTypeId", vacTypeId);
		


    },

});