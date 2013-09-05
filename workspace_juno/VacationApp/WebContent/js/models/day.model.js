App.Models.Day = Backbone.Model.extend({

	idAttribute: "dateStr",
		
    defaults: {
        dateStr: "",    	
        dayOfMonth:"",
        monthNumber:"",
        yearNumber: "",
        dayOfWeek:"",
        status:"",
        classNames:"",
        disabled:"",
        dateFormat: 'YYYY-MM-DD',
        selected: false
	},
	
	initialize: function(args){
	

//		console.log("args");
//		console.log(args);

		var dateStr = args.dateStr;
		var mObj = moment(dateStr, this.get("dateFormat"));

			
		this.set("dayOfMonth", mObj.date());
		this.set("monthNumber", mObj.month());
		this.set("yearNumber", mObj.year());
		this.set("dayOfWeek", mObj.day());
		
		var dw = this.get("dayOfWeek");
		var status = this.get("status");
		if (status == "" && this.isWeekendOrHoliday()){
			this.set("status", 7);	
		} 
		
		var parent = args.parent;
		this.set("parent", parent);
	},
	
	 //add or remove days to/from vacationDays collection; only working days can be added 
	 //another solution is to not modify model during day selecting, but after send button pressing
	 //the second solution would prevent delays during days selecting, because only DOM would be modified  
	toggle: function(){
		
		var workingDay = !this.isWeekendOrHoliday();

		if(workingDay){
			var status = this.get("status");
			var vacationDays = this.get("parent").get("userVac").get("vacationDays");			
	    	var dates = _.pluck(vacationDays, "dateStr");
	    	var idx = _.indexOf(dates, this.get("dateStr"));
	    	if (idx == -1 && (status == "" || status == CONST.statusMarked) || status == 4 ) {
	    		var obj = {"dateStr": this.get("dateStr"), "status": this.get("status")};
	    		vacationDays.push(obj);

	    		console.log(obj.dateStr+" added");
	    	}
	    	else{
	    		console.log("selected="+this.get("selected"));
	    		if (this.get("selected") && this.get("status")==CONST.statusMarked){
	    			var obj = vacationDays[idx];
		    		vacationDays.splice(idx,1);
		    		console.log(obj.dateStr+" removed");
	    		}
	    	}

			this.set("selected", !this.get("selected"));
			var selected = this.get("selected");
			
			if (status == "" || status == CONST.statusMarked)
			{	
				if (selected){
					this.set("status", CONST.statusMarked);
				}
				else{
					this.set("status", "");	
				}	
			}
			
			console.log("selected : "+ selected+" status : "+this.get("status"));
			console.log(vacationDays);
		}
	},

	resetStatus: function(){
		this.set("status","");
		if (this.isWeekendOrHoliday()){
			this.set("status", 7);	
		} 
	},

/*
	var swietaStatyczne = function(){return[
  {d:1,m:1,o:'Nowy Rok'},
  {d:6,m:1,o:'6 stycznia – Objawienie Pańskie (pot. święto Trzech Króli) obowiązuje od 1 stycznia 2011 roku'},
  {d:1,m:5,o:'Święto Państwowe (ustawa nie nazywa tego dnia \'Świętem Pracy\')'},
  {d:3,m:5,o:'Święto Narodowe Trzeciego Maja (tj. w rocznicę uchwalenia Konstytucji w 1791 r.)'},
  {d:15,m:8,o:'Wniebowzięcie Najświętszej Maryi Panny (to święto liturgiczne wymienia ustawa; data ta jest zbieżna z wprowadzonym w 1992 r. Świętem Wojska Polskiego)'},
  {d:1,m:11,o:'Wszystkich Świętych'},
  {d:11,m:11,o:'Narodowe Święto Niepodległości (tj. w rocznicę odzyskania niepodległości w 1918 r.)'},
  {d:25,m:12,o:'pierwszy dzień Bożego Narodzenia'},
  {d:26,m:12,o:'drugi dzień Bożego Narodzenia'}]};
*/

	staticHolliday: function(day, month) {

	
			return (day == 1 && month == 1) ||
			(day == 6 && month == 1) ||
			(day == 1 && month == 5) ||
			(day == 3 && month == 5) ||
			(day == 15 && month == 8) ||
			(day == 1 && month == 11) ||
			(day == 11 && month == 11) ||
			(day == 25 && month == 12) ||
			(day == 26 && month == 12) 

	},
/*
	var swietaDynamiczne = function(y) {
    var r = []; // tablica ze swietami
    var d = new Date(), e = easter(y);
    r.push({d:e.d,m:e.m,o:'pierwszy dzień Wielkanocy (tj. Niedziela Wielkanocna)'});
    d.setFullYear(y);d.setDate(e.d);d.setMonth(e.m-1);
    var et = d.getTime(); // easter timestamp
    d.setTime(et+86400000); // (1 dzień po wielkanocy)
    r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'drugi dzień Wielkanocy (tj. Poniedziałek Wielkanocny)'});
    d.setTime(et+4233600000); // (49 dni po wielkanocy)
    r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'pierwszy dzień Zielonych Świątek (tj. liturgiczne Zesłanie Ducha Świętego)'});
    d.setTime(et+5184000000); // (60 dni po wielkanocy)
    r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'dzień Bożego Ciała (tj. liturgiczna uroczystość Najświętszego Ciała i Krwi Pańskiej)'});
    return r;
  };
*/
	 easterForYear:function(year) {
  var a = year % 19;
  var b = Math.floor(year / 100);
  var c = year % 100;
  var d = Math.floor(b / 4); 
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3); 
  var h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var n0 = (h + l + 7 * m + 114)
  var n = Math.floor(n0 / 31) - 1;
  var p = n0 % 31 + 1;
  var date = new Date(year,n,p);
  return date; 
},


	dynamicHolliday: function(year) {
		
		var r = []; // tablica ze swietami
		var d = new Date(this.easterForYear(year));
		var et = d.getTime(); // easter timestamp
    	d.setTime(et+86400000); // (1 dzień po wielkanocy)
    	r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'drugi dzień Wielkanocy (tj. Poniedziałek Wielkanocny)'});
    	//console.log("WIelkanoc = "+e);
    	d.setTime(et+4233600000); // (49 dni po wielkanocy)
    	r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'pierwszy dzień Zielonych Świątek (tj. liturgiczne Zesłanie Ducha Świętego)'});
    	d.setTime(et+5184000000); // (60 dni po wielkanocy)
    	r.push({d:parseInt(d.getDate()),m:parseInt(d.getMonth())+1,o:'dzień Bożego Ciała (tj. liturgiczna uroczystość Najświętszego Ciała i Krwi Pańskiej)'});
    	return r;
	},

	
	isWeekendOrHoliday: function(){
		var dw = this.get("dayOfWeek")
		
		
		if (dw == 6 || dw == 0 || (this.staticHolliday(this.get('dayOfMonth'), this.get('monthNumber') + 1)))
			return 1;
		var p = this.dynamicHolliday(this.get('yearNumber'));
		for (var r in p)
		{
			var k = p[r];
			if (k.d == this.get('dayOfMonth') && k.m == this.get('monthNumber') + 1)
			{
				return 1;
			}
		}
		
	}
	/*,toggleSelection: function(number) {

		var array = this.get('selections');
		var index = $.inArray( number, array );

		if (index == -1) // nie jest w tablicy
		{
			array.push( number );
		}
		else
		{
			array.splice(index, 1);
		}

		// wager.set('selections', array );

		this.set({'selections': array });
	}*/

});