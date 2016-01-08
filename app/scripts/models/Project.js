var Project = Backbone.Model.extend({
	defaults: {
	  	id: '',
	  	name: '',
	  	code: '',
      	issues: ''
	}
});

module.exports = Project;