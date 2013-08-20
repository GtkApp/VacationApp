App.Views.Day = Backbone.View.extend({

    tagName: 'td',

	initialize: function()
	{
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);

        var text = $('#template-day').text(); // robimy tylko jedno zapytanie do struktury DOM
        this.template = _.template( text ); // i od razu tworzymy funkcję z tym szablonem

		this.render();
    },

    render: function() {
    	//console.log('Day render');
    	
        var data = this.model.toJSON();

        var dayOfMonth = data.dayOfMonth;
        var text = (dayOfMonth<10 ? '&nbsp;'+dayOfMonth+'&nbsp;': dayOfMonth);
        data.text = text;

        var html = this.template(data);
        this.$el.html( html ).css('width', '14.28%');
        
        var btn = this.$('button');
        btn.addClass(this.getStatusClassName(data.status));
        
/*
        if (data.selected) btn.addClass("btn-marked");
        else btn.removeClass("btn-marked");
*/
        
        /*
        if (btn.hasClass("weekendClass")){
             btn.attr("disabled","true");
         }*/
        
    	return this; 
    },
    
    events: {
    	"click button": "dayClicked"
    },

    dayClicked: function() {
var m1 = moment();
    	
        var data = this.model.toJSON();
        this.model.toggle();

var m2 = moment();
console.log("m2.diff(m1)="+m2.diff(m1));
  
    },
    
	//return css class name for given day status 
    getStatusClassName: function(status) {
    	switch (status) {
	      case CONST.statusAccepted: return "acceptedClass";
	      case CONST.statusRejected: return "rejectedClass";
	      case CONST.statusCanceled: return "canceledClass";
	      case CONST.statusAcceptWait: return "acceptWaitClass";
	      case CONST.statusCancelWait: return "cancelWaitClass";
	      case CONST.statusAcceptedOverdue: return "acceptedOverdueClass";
	      case CONST.statusWeekend: return "weekendClass";
	      case CONST.statusMarked: return "btn-marked";
	      default: ""
	    }
    }
    
}); 