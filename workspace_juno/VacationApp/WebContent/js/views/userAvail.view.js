App.Views.UserAvailView = Backbone.View.extend({


	tagName: "div",
	lang: '', 

	initialize: function()
	{
		_.bindAll(this, 'render');
		//this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-AvUs').text(); 
		this.template = _.template( text ); 
		this.render();
    },

    render: function() {
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		//console.log("listVac render");
		this.$el.html( html );
		//var Vacation = this.Create2DArray(10);

		
		var table = $("<table />");
		var en_table = $("<table />");
		var thead = $('<thead />');
		var tbody = $('<tbody />');

		var tcol = $('<td />');

		var type = [];
		var	reqType = [];




		
		_.each(this.collection.models, function (req){

			var user = req.get("userStatusList");
			
			for (i in user)
			{
				var trow = $('<tr />');
				console.log(user[i]);
				var thText = $('<td>'+user[i].userName+'</td>');
				thText.appendTo(trow);
				var thText = $('<td>'+user[i].available+'</td>');
				thText.appendTo(trow);
				trow.appendTo(tbody);
			}	
				
		tbody.appendTo(table);
	//	var tbody = $('<tbody />');
		table.attr("id", "req-table");		
		self.$( '#Avus' ).append( table );
    	return this; 

			
		});
}

});

/*




		if (this.options.lang == 2)		
		{	
			type.push('LP', 'From', 'To', 'Days', 'Status', '');
		}
		else
		{	
			type.push('LP', 'Od', 'Do', 'Dni', 'Status', '');
		}		


		for (i = 0; i<type.length; i++)
		{
			var thText = $('<td>'+type[i]+'</td>');
			thText.appendTo(trow);
		}
		trow.appendTo(thead);
		thead.appendTo(table);

		var order = 0;
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
			col = $('<td>'+this.statusToFullName(Vacation[i].statusOfVacationRequest)+'</td>');
			col.appendTo(row);
			if (Vacation[i].statusOfVacationRequest == 'WAITING_FOR_ACCEPTATION' || 
				Vacation[i].statusOfVacationRequest == 'ACCEPTED' )
				col = $('<td><button id="'+i+'" class="btn cancel">'+"Anuluj urlop"+'</button></td>');
			else
				col = $('<td></td>');


			//col = $('<td><button id="btn-'+order+'" class="btn">'+"Anuluj urlop"+'</button></td>');
			col.appendTo(row);
			row.appendTo(tbody);		
			order++;
		}
		tbody.appendTo(table);
	//	var tbody = $('<tbody />');
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
*/

