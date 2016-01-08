var TemplateView = require ("./TemplateView"),
	projectCollection = require ("../Router");

var ProjectListView = TemplateView.extend({
    template: 'project-list',
	collection: projectCollection,
	getContext: function () {
      	return {
			projects: this.collection.toJSON()
      	}
    }
});

module.exports = ProjectListView;