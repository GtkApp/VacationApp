App.Collections.User = Backbone.Collection.extend({
	model: App.Models.User,
	urlRoot : '/WebContent',
	url: "Deeper/Rest/DependentUserList"
});