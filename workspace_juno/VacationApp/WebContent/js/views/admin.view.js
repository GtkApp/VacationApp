App.Views.Admin = Backbone.View.extend({


	tagName: "div",
	lang: '', 

	initialize: function()
	{
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.model.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-admin').text(); 
		this.template = _.template( text ); 
		this.render();
    },

    render: function() {
      //  	console.log(this);

		var self = this;	

		var data = this.model.toJSON();
		var html = this.template(data);   // to dodaje template <script id="template-admin" type="text/template"> z index.html
		
		//lang = $.cookie("language");
		this.$el.html(html);


		var vacType = this.model.get("vacTypeId");


		var Vacation = this.model.get("vacations");

		var table = $("<table style='width:100%;'/>");
		var thead = $('<thead />');
		var tbody = $('<tbody />');
		var trow = $('<tr />');
		var tcol = $('<td />');

		var order = 0;

    	for (var i in Vacation )
    	{
    		if (vacType == 0 && Vacation[i].statusOfVacationRequest != 'WAITING_FOR_ACCEPTATION'
    			&& Vacation[i].statusOfVacationRequest != 'WAITING_FOR_CANCELLATION'
    		 )
    		{
     			continue;
    		}
    		
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
			col = $('<td>'+Vacation[i].typeOfVacation+'</td>');
			col.appendTo(row);
			col = $('<td>'+Vacation[i].statusOfVacationRequest+'</td>');
			col.appendTo(row);
			if (Vacation[i].statusOfVacationRequest == 'WAITING_FOR_ACCEPTATION')
			{
				col = $('<td><button id='+i+' class="btn change" name="acc">'+"Zatwierdz urlop"+'</button></td>');
				col.appendTo(row);
				col = $('<td><button id='+i+' class="btn change" name="rej">'+"Odrzuc wniosek"+'</button></td>');
				col.appendTo(row);
			}	
			else if (Vacation[i].statusOfVacationRequest == 'WAITING_FOR_CANCELLATION')
			{
				col = $('<td><button id='+i+' class="btn change" name="can">'+"Anuluj urlop"+'</button></td>');
				col.appendTo(row);
				col = $('<td><button id='+i+' class="btn change" name="rej">'+"Odrzuc wniosek"+'</button></td>');
				col.appendTo(row);
			}
			if (Vacation[i].statusOfVacationRequest == 'ACCEPTED')
			{
				col = $('<td><button id='+i+' class="btn change" name="rej">'+"Odrzuc wniosek"+'</button></td>');
				col.appendTo(row);
				col = $('<td></td>');
				col.appendTo(row);
			}

			else
			{
				col = $('<td></td>');
				col.appendTo(row);
				col = $('<td></td>');
				col.appendTo(row);

			}
		


			row.appendTo(tbody);		
			order++;

    	}

		tbody.appendTo(table);
	//	var tbody = $('<tbody />');
		table.attr("id", "req-table");		
		this.$el.append( table );
		//self.$( '#admin' ).append( table );
    	
    	return this; 

},

   events:{
      "click button.change":"buttonAction",
    	"click button.next-year": "gotoNextYear",
    	"click button.prev-year": "gotoPrevYear",
   },


   buttonAction: function(e)
   {
   		console.log("button pushed");
   		   	var clickedEl = $(e.currentTarget);
  			var id = clickedEl.attr("id");
  			var name = clickedEl.attr("name");
  			console.log(clickedEl);

  			console.log("id = "+id);
  		 	Vacation = this.model.get("vacations");
  		 	console.log(Vacation[id]);

  		 	AccVacation = new App.Models.Vacation(Vacation[id]);


  			switch(name)
  			{
  				case 'acc':
 				  		
					AccVacation.set("statusOfVacationRequest", "ACCEPTED");
  					break;
  				case 'rej':
					AccVacation.set("statusOfVacationRequest", "REJECTED");
  					console.log("rejected!");
  					break;
  				case 'can':
					AccVacation.set("statusOfVacationRequest", "CANCELLED");
  					console.log("cancelled");
  					break;

  			}
  			AccVacation.existData();

   },



        gotoNextYear: function() {
    	
		var yearNumber = this.model.get("year");
		this.model.set("year", moment().year(yearNumber).add('y',1).year());
    },
	
	
	gotoPrevYear: function() {

		var yearNumber = this.model.get("year");
		this.model.set("year", moment().year(yearNumber).subtract('y',1).year());
		
	},



 Create2DArray: function(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

});


