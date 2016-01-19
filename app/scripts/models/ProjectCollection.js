var Project = require ("./Project");

var ProjectCollection = Backbone.Collection.extend({
	model: Project,
	url: 'http://localhost:8888/',
	/*initialize: function () {
	  	this.comparator = function (prj) {
		  	return prj.get('id');
	  	};
	},*/
	
});

module.exports = ProjectCollection;