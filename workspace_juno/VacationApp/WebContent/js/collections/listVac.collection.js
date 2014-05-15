App.Collections.ListVac = Backbone.Collection.extend({
	model: App.Models.ListVac,
	urlRoot : '/WebContent',


    initialize: function(){
        //var yearNumber = this.get("yearNumber");
        //this.buildNewYear(yearNumber);
        console.log("initialize listVac");
    //   console.log(this); 
    //   console.log(this.model);

        var yearNumber =  this.get("yearNumber");


        console.log("yearNumber = "+yearNumber);


    //    


               
        this.on("change:yearNumber", function(model) {

//            console.log("this");
            
            var currYear = this.models[0].get("yearNumber");
            var prevYear = this.models[0].get("prevYear");
//            console.log(this.models[0].get("yearNumber"));
//            console.log(this.models[0].get("prevYear"));

            if (currYear != prevYear)
            {
                console.log("CurrYear = "+currYear +" prevYear = "+prevYear);
                this.models[0].set("prevYear", currYear);
                App.listVac.fetchListVac(currYear);                

            }    



                //App.listVac.fetchListVac(currYear);
            //



//odkomentuj to//
/*
            console.log("Zmiana roku w liscie");
      
            _.each(this.models, function (req){

             console.log("req");
             console.log(req);
             yearNumber =  req.get('yearNumber');



            console.log(yearNumber); 
            App.listVac.fetchListVac(yearNumber);


            //req.set('yearNumber', moment().year(yearNumber).add('y',1).year());

        
            //console.log("next year "+req.get('yearNumber'));    

        });

*/



 
      //      App.listView = new App.Views.ListView({collection: App.listVac, el: '#list', lang: '1'});

        });



       /* _.each(this.collection.models, function (req){

             console.log("req");
             console.log(req);
             //yearNumber =  req.get('yearNumber');
            //req.set('yearNumber', moment().year(yearNumber).add('y',1).year());

        
            //console.log("next year "+req.get('yearNumber'));    

        });
*/


        },




	fetchListVac: function(year){

		  console.log("fetch listVac for year "+year)

            this.url = "Deeper/Rest/VacationList/"+ year +"-01-01/"+year+"-12-31";
            
            this.fetch({
                success: function(model,response,options){
          //      model.save("yearNumber", year);
//                 _.each(model.models, function (req){
             //       console.log(req.set("yearNumber", year));
              //  });


                console.log(model.models[0].get("yearNumber"));
            	return 0;
            },
            error: function(model,xhr,options){
                console.log(model);
                console.log(xhr);
                console.log(options);
        		return 1;
            }


			
    
			});
        }




});