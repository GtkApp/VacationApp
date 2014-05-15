App.Views.VacSummary = Backbone.View.extend({


	tagName: "div",
	lang: '', 

	initialize: function()
	{
		_.bindAll(this, 'render');
		//this.collection.bind('change', this.render);
		this.collection.bind('reset', this.render); // the event fires when the collection has finished receiving data from the server
		
		var text = $('#template-availab').text(); 
		this.template = _.template( text ); 
		this.render();
    },

    render: function() {
		
		var self = this;	
		var data = this.collection.toJSON();
		var html = this.template(data);
		
		//lang = $.cookie("language");
		

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
		//console.log("render = "+this.options.lang);

		_.each(this.collection.models, function (req){
			//var userOptionView = new App.Views.UserOption({ model: user });
			//self.$( '#selUser' ).append( userOptionView.$el );
			
			Vacation[0][0] = req.get('daysVacation');
			Vacation[1][0] = req.get('daysUnpaid');
			Vacation[2][0] = req.get('daysUnpaid');
			Vacation[3][0] = req.get('daysUnpaid');
			Vacation[4][0] = req.get('daysParental');
			Vacation[5][0] = req.get('daysUnpaid');
			Vacation[6][0] = req.get('daysOnDemand');
			Vacation[7][0] = req.get('daysChildCare');
			Vacation[8][0] = req.get('daysJobSearch');
			
			/*
			Vacation[req.get('type') - 1][0] = req.get('currYearVac');
			Vacation[req.get('type') - 1][1] = req.get('prevYearVac');
			Vacation[req.get('type') - 1][2] = req.get('usedVac');
			Vacation[req.get('type') - 1][3] = Vacation[req.get('type') - 1][0] + Vacation[req.get('type') - 1][1] - Vacation[req.get('type') - 1][2];
*/


	//		var option = $("<option />").text(user.get("firstName")+ " "+user.get("lastName")).attr("value", user.get("id"));
	//		self.$( '#selUser' ).append( option );
		});




		if (this.options.lang == 2)		
		{	
			type.push('Vacation Type', 'Current', 'Previous years','Used', 'Remains');
	reqType.push('wypoczynkowy','Non Paid', 'okolicznościowy', 'odbiór godzin','wychowawczy', 'Maternity', 'On request', 'Opieka nad dzieckiem', 'Zwolnienie na poszukiwanie pracy', 'Other circumstances');

		}
		else
		{	
			type.push('Rodzaj urlopu', 'Bieżący', 'Zeszłe lata','Wykorzystano', 'Pozostało');
			reqType.push('wypoczynkowy','bezpłatny', 'okolicznościowy', 'odbiór godzin','wychowawczy', 'macierzyński', 'na żądanie', 'Opieka nad dzieckiem', 'Zwolnienie na poszukiwanie pracy', 'Inne nieobecności');	
		}		


		for (i = 0; i<type.length; i++)
		{
			var thText = $('<td>'+type[i]+'</td>');
			thText.appendTo(trow);
		}
		trow.appendTo(thead);
		
		thead.appendTo(table);

		
		for (i = 0; i<reqType.length; i++)
		{
			var row = $('<tr />');
			var col = $('<td>'+reqType[i]+'</td>');
			col.appendTo(row);
			for (j = 0; j<type.length-1; j++)
			{
				var val;
				if (Vacation[i][j] > 0 )
					val = Vacation[i][j];
				else
					val = 0;
					var col = $('<td>'+val+'</td>');
				col.appendTo(row);
			}
			//row.attr("id", "req-table-row");
			row.appendTo(tbody);		
		}
		
		tbody.appendTo(table);
		var tbody = $('<tbody />');

		table.attr("id", "req-table");		

		self.$( '#Avail' ).append( table );

    	return this; 
    },

/*
    events: {
    	"click button.lang-pol": 'langPol',
    	"click button.lang-eng": 'langEng'
    },
    langPol: function(){
    	console.log("click");
    	this.render(1);
    },
    
    langEng: function(){
    	this.render(2);
    	//console.log(this.model.toJSON());
    },
*/

 Create2DArray: function(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

});


