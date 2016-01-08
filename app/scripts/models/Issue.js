var Issue = Backbone.Model.extend({
	defaults: {
	  	id: '',
	  	projectId: '',
	  	name: '',
	  	details: ''
    }
});

module.exports = Issue;