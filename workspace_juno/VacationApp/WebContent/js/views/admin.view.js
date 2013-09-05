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
    	console.log("Admin view render");
    	console.log(this);
		var self = this;	

		var data = this.model.toJSON();
		var html = this.template(data);   // to dodaje template <script id="template-admin" type="text/template"> z index.html
		
		//lang = $.cookie("language");
		this.$el.html(html);

		var request = this.Create2DArray(this.model.get("vacationRequests").length);
		
		// the following scary loop formats dates into string 'A,B,C-E,F etc...' with A-C ranges if there are more than two consecutive dates
		for(ii = 0; ii < this.model.get("vacationRequests").length; ii++) {
		    request[ii][0] = this.model.get("vacationRequests")[ii].vacationType;
		    request[ii][1] = JSON.stringify(this.model.get("vacationRequests")[ii].vacationDays.length);
		
		    // get first date
		    request[ii][2] = this.model.get("vacationRequests")[ii].vacationDays[0].dateStr;
		    latestWritten = request[ii][2];
		    // format consecutive dates
		    for(jj = 1; jj < this.model.get("vacationRequests")[ii].vacationDays.length; jj++) {
				//console.log("1:" + this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr);
				//console.log("2:" + latestWritten);
				//console.log("3:" + this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr);
				//console.log(moment(this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr, "YYYY-MM-DD").diff(moment(this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr, "YYYY-MM-DD"), 'days'));
			    if(moment(this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr, "YYYY-MM-DD").diff(moment(this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr, "YYYY-MM-DD"), 'days') > 1)
			    {
			        if(this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr == latestWritten)
			            request[ii][2] += ', ' + this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
			        else
			        {
			            if(moment(this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr, "YYYY-MM-DD").diff(moment(latestWritten,"YYYY-MM-DD"),'days') == 1)
			                request[ii][2] += ', ';
			            else
			                request[ii][2] += ' - ';
			            request[ii][2] += this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr + ', ' + this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
		            }
			        latestWritten = this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
		        }
	    	}
	    	jj--;
	        if(latestWritten != this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr)
	        {
		        if(this.model.get("vacationRequests")[ii].vacationDays[jj-1].dateStr == latestWritten)
		            request[ii][2] += ', ' + this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
		        else
		            request[ii][2] += ' - ' + this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
		        latestWritten = this.model.get("vacationRequests")[ii].vacationDays[jj].dateStr;
	        }
	    }

		
		var table = $("<table style='width:100%;'/>");
		var thead = $('<thead />');
		var tbody = $('<tbody />');
		var trow = $('<tr />');
		var tcol = $('<td />');

		var headers = [];
		var	reqType = [];

		if (this.options.lang == 2)
		{
			headers.push('#', 'Vacation Type', 'Days', 'Detailed Period', 'Select');
            reqType.push('relax','free', 'celebration', 'hours in lieu', 'prison', 'maternity', 'on demand', 'kid protection', 'job search', 'other');	
            $("button.confirm-selected").html("Confirm Selected");
            $("button.reject-selected").html("Reject Selected");
        }
		else
		{
			headers.push('#', 'Rodzaj urlopu', 'Liczba dni', 'Szczegółowy harmonogram', 'Wybierz');
			reqType.push('wypoczynkowy','bezpłatny', 'okolicznościowy', 'odbiór godzin','wychowawczy', 'macierzyński', 'na żądanie', 'Opieka nad dzieckiem', 'Zwolnienie na poszukiwanie pracy', 'Inne nieobecności');	
		}

		for (i = 0; i < headers.length; i++)
		{
			var thText = $('<td>'+headers[i]+'</td>');
			thText.appendTo(trow);
		}
		trow.appendTo(thead);
		
		thead.appendTo(table);

		
		for (i = 0; i < request.length; i++)
		{
			var row = $('<tr />');
			var col = $('<td>'+(i+1)+'</td>');
			col.appendTo(row);
			var col = $('<td>'+reqType[request[i][0]]+'</td>');
			col.appendTo(row);
			// Num of days
    		var col = $('<td>'+request[i][1]+'</td>');
			col.appendTo(row);
			// Detailed days, this only column has flexible width
    		var col = $('<td style="text-align: left; width: auto">'+request[i][2]+'</td>');
			col.appendTo(row);
			// "select" switch
    		var col = $('<td><input type="checkbox" id="sel-'+i+'"></td>');
			col.appendTo(row);
			//row.attr("id", "req-table-row");
			row.appendTo(tbody);		
		}
		
		tbody.appendTo(table);
		var tbody = $('<tbody />');

		table.attr("id", "req-table");		

		this.$el.append( table );

    	return this; 
    },


    events: {
    	"click button.reject-selected": 'rejectSelected',
    	"click button.confirm-selected": 'confirmSelected'
    },
    
    rejectSelected: function() {
    },
    
    
    confirmSelected: function() {
    },
    

/*
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


