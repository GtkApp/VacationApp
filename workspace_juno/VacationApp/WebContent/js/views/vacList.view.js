App.Views.ListView = Backbone.View.extend({


	tagName: "div",
	lang: '', 

	initialize: function()
	{
		_.bindAll(this, 'render');
		//this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-list').text(); 
		this.template = _.template( text ); 
		this.render();
    },

    render: function() {
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
	
		this.$el.html( html );
		var Vacation = this.Create2DArray(10);

		
		var table = $("<table />");
		var en_table = $("<table />");
		var thead = $('<thead />');
		var tbody = $('<tbody />');
		var trow = $('<tr />');
		var tcol = $('<td />');

		var type = [];
		var	reqType = [];
		
		
		_.each(this.collection.models, function (req){
			//var userOptionView = new App.Views.UserOption({ model: user });
			//self.$( '#selUser' ).append( userOptionView.$el );
			Vacation = req.get("vacations");

			console.log("vacList:");			
			console.log(Vacation);
			

	//		var option = $("<option />").text(user.get("firstName")+ " "+user.get("lastName")).attr("value", user.get("id"));
	//		self.$( '#selUser' ).append( option );
		});




		if (this.options.lang == 2)		
		{	
			type.push('LP', 'Vacation date', 'Print request');
		}
		else
		{	
			type.push('LP', 'Od', 'Do', 'Dni',  'Drukuj wniosek');
		}		


		for (i = 0; i<type.length; i++)
		{
			var thText = $('<td>'+type[i]+'</td>');
			thText.appendTo(trow);
		}
		trow.appendTo(thead);
		thead.appendTo(table);

		
		for (i in Vacation )
		{
			var row = $('<tr />');
			var col = $('<td>'+Vacation[i].idn+'</td>');
			col.appendTo(row);
			
			var d = new Date(Vacation[i].vacationSince); // The 0 there is the key, which sets the date to the epoch
			col = $('<td>'+d.toString("yyyy-MM-dd")+'</td>').appendTo(row);
			col.appendTo(row);
			

			d =  new Date(Vacation[i].vacationUntil);
			col = $('<td>'+d.toString("yyyy-MM-dd")+'</td>');


			col.appendTo(row);
			
			col = $('<td>'+Vacation[i].numberOfDays+'</td>');
			col.appendTo(row);
			row.appendTo(tbody);		
		}
		tbody.appendTo(table);
		var tbody = $('<tbody />');
		table.attr("id", "req-table");		
		self.$( '#lst' ).append( table );
    	return this; 
    },



 Create2DArray: function(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

});


