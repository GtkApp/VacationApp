App.Collections.ListVac = Backbone.Collection.extend({
	model: App.Models.ListVac,
	urlRoot : '/WebContent',
	url: "Deeper/Rest/VacationList/2013-01-01/2013-12-31"
});