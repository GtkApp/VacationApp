App.Collections.User = Backbone.Collection.extend({
	model: App.Models.User,
	
	
	urlRoot : '/WebContent',
	url: "Deeper/Rest/DependentUserList",


		fetchDepUsers: function(){

           
            this.fetch({
                success: function(model,response,options){
 				if (response.userList.length > 0)
                {
 						$('#li_Adm').removeClass('hide');		
                        $('#li_AvUsers').removeClass('hide');	
                }
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