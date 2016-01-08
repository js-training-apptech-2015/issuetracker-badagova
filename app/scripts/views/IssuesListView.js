var TemplateView = require ("./TemplateView");

var IssueListView = TemplateView.extend({
    template: 'issues-list',
    getContext: function () {
      	return {
			issues: this.collection.toJSON(),
	  	}
    }
});

module.exports = IssueListView;