var Project = require ("./Project");

var ProjectCollection = Backbone.Collection.extend({
	model: Project,
	url: 'http://www.mocky.io/v2/567a37162500001045af0238',
	initialize: function () {
	  	this.comparator = function (prj) {
		  	return prj.get('id');
	  	};
	},
});

module.exports = ProjectCollection;