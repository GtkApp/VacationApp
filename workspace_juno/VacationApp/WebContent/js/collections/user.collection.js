App.Collections.User = Backbone.Collection.extend({
	model: App.Models.User,
	urlRoot : '/WebContent',
	url: "data/users.json"
});