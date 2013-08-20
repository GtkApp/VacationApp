App.Calendar = {
	
	cols: 4,
    dateFormat: 'YYYY-MM-DD',

	displayMonth: function(yearNumber, monthNumber) {
		var x = 0;
		var y = 0;
        var i = 0;
        var dayCount = 0;

        moment.lang('pl', {
            months : [
                "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec",
                "Sierpień","Wrzesień","Październik","Listopad","Grudzień"
            ]
        });
        moment.lang('pl', {
            weekdaysMin : ["Nd","Pn", "Wt", "Śr", "Cz", "Pt", "So"]
        });


        var mObj = moment([yearNumber, monthNumber]);
        var daysInMonth = mObj.daysInMonth();
        var dayOfWeek = mObj.day();
        var monthName = mObj.format('MMMM');

        var modulo = (dayOfWeek+daysInMonth) % 7;
        var weeksInMonth = Math.floor((dayOfWeek+daysInMonth)/7) + (modulo > 0 ? 1 : 0);

		
        return table;
	},

	createMonth: function(yearNumber, monthNumber) {
		var x = 0;
		var y = 0;
        var i = 0;
        var dayCount = 0;

        moment.lang('pl', {
            months : [
                "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec",
                "Sierpień","Wrzesień","Październik","Listopad","Grudzień"
            ]
        });
        moment.lang('pl', {
            weekdaysMin : ["Nd","Pn", "Wt", "Śr", "Cz", "Pt", "So"]
        });


        var mObj = moment([yearNumber, monthNumber]);
        var daysInMonth = mObj.daysInMonth();
        var dayOfWeek = mObj.day();
        var monthName = mObj.format('MMMM');

        var modulo = (dayOfWeek+daysInMonth) % 7;
        var weeksInMonth = Math.floor((dayOfWeek+daysInMonth)/7) + (modulo > 0 ? 1 : 0);

		var table = $("<table class='table-bordered' />");
        var thead = $('<thead />');
        var tbody = $('<tbody />');
        var trMonth = $('<tr />');
        var thMonth = $('<th colspan="7">'+monthName+'</th>');
        var trDays = $('<tr />');

        for (i = 0; i < 7; i++) {
            var thDay = $('<th>'+moment().day(i).format('dd')+'</th>');
            thDay.appendTo(trDays);
        }

        thMonth.appendTo(trMonth);
        trMonth.appendTo(thead);
        trDays.appendTo(thead);
        thead.appendTo(table);

		for (y = 0; y < weeksInMonth; y++) {
			var row = $('<tr />');
			for (x = 0; x < 7; x++) {
                var cell = $('<td />');
                if ( (x>=dayOfWeek || y > 0) && dayCount < daysInMonth){
                    dayCount++;

                    var text = dayCount;
                    if (dayCount<10){
                        text = '0'+dayCount;
                    }
                    var button = $('<button id="btn-'+mObj.format(this.dateFormat)+'" class="btn btn-mini">'+text+'</button>');
                    button.appendTo(cell);
                    mObj.add('days',1);
                }
				// item.attr('id', order);
				cell.appendTo(row);
			}
            row.appendTo(tbody);
		}
        tbody.appendTo(table);

        table.attr("id", "tbl-month-"+monthNumber);
        thMonth.attr("id", "th-month-"+monthNumber);
        //table.appendTo('#calendar');

        return table;
	},

    createYear: function(yearNumber) {
        var x = 0;
        var y = 0;
        var i = 0;
        var cols = (this.cols >0 ? this.cols: 4);
        var rows = 12 / cols;
        var prevYear = moment().year(yearNumber).subtract('y',1).year();
        var nextYear = moment().year(yearNumber).add('y',1).year();

console.log("!!!!prevYear="+prevYear+" "+nextYear);

        var table = $("<table />");
        var thead = $('<thead />');
        var tbody = $('<tbody />');
        var tr = $('<tr />');
        var th = $('<th colspan="'+ cols +'"><a href="#displayYear/'+prevYear+'"> <<&nbsp;&nbsp; </a>'+yearNumber+'<a href="#displayYear/'+nextYear+'">  &nbsp;&nbsp;>> </a></th>');

        th.appendTo(tr);
        tr.appendTo(thead);
        thead.appendTo(table);

        for (y = 0; y < rows; y++) {
            var row = $('<tr />');
            for (x = 0; x < cols; x++) {
                var cell = $('<td />');
                var calMonth = this.createMonth(yearNumber, i);
                calMonth.appendTo(cell);
                cell.appendTo(row);
                i++;
            }
            row.appendTo(tbody);
            row.attr("id", "tr-year-"+y);
        }
        tbody.appendTo(table);
        table.attr("id", "tbl-year-"+yearNumber);

        return table;
    }
    
}