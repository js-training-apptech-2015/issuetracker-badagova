var TemplateView = require ("./TemplateView");

var IssueView = TemplateView.extend({
    template: 'issue-detail',
    getContext: function () {
      	return {
			issue: this.model.toJSON()
      	}
    }
});

module.exports = IssueView;