var TemplateView = require ("./TemplateView");

var HeaderView = TemplateView.extend({
    template: 'header',
    getContext: function () {
      	return {
			breadcrumbs: this.model.get("breadcrumbs").toJSON()
		}
    }
});

module.exports = HeaderView;