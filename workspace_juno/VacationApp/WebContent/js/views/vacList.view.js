App.Views.ListView = Backbone.View.extend({


	tagName: "div",
	lang: '', 

	initialize: function()
	{
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.model.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-list').text(); 
		this.template = _.template( text ); 
		this.render();
    },

    render: function() {
		
		var self = this;	
		var data = this.model.toJSON();
		var html = this.template(data);
		//console.log("listVac render");
		this.$el.html( html );
		var Vacation = this.Create2DArray(10);

		
		var table = $("<table />");
		var en_table = $("<table />");
		var thead = $('<thead />');
		var tbody = $('<tbody id="buttons" />');
		var trow = $('<tr />');
		var tcol = $('<td />');

		var type = [];
		var	reqType = [];


		Vacation = this.model.get("vacations");


/*
		
		_.each(this.collection.models, function (req){

			Vacation = req.get("vacations");

		});

*/


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

   events:{
        "click button.cancel":"cancelAction",  
    	"click button.next-year": "gotoNextYear",
    	"click button.prev-year": "gotoPrevYear",
   },

   cancelAction:function(e) {
   	var clickedEl = $(e.currentTarget);
  	var id = clickedEl.attr("id");

  		_.each(this.collection.models, function (req){
			Vacation = req.get("vacations");
		});

	CanVacation = new App.Models.Vacation(Vacation[id]);
	console.log(CanVacation);

	CanVacation.set("statusOfVacationRequest", "WAITING_FOR_CANCELLATION");
	CanVacation.existData();

   },

     gotoNextYear: function() {
    	
		var yearNumber = this.model.get("year");
		this.model.set("year", moment().year(yearNumber).add('y',1).year());
    },
	
	
	gotoPrevYear: function() {

		var yearNumber = this.model.get("year");
		this.model.set("year", moment().year(yearNumber).subtract('y',1).year());
		
	},

 statusToFullName: function(status) {
 	switch(status) {
 		case "WAITING_FOR_ACCEPTATION":
 			return "Oczekuje na akceptację";
 		case "ACCEPTED":
 			return "Zaakceptowany";
 		case "CANCELLED":
 			return "Anulowany";
 		case "WAITING_FOR_CANCELLATION":
 			return "Oczekuje na anulowanie";
 		case "REJECTED":
 			return "Odrzucony";
 		default:
 			return "Nieznany "+status;	
 	}
 },
   





 Create2DArray: function(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

});


