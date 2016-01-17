var TemplateView = require ("./TemplateView");

var MainView = TemplateView.extend({
	template: 'main',
	render: function () {
    	TemplateView.prototype.render.call(this);
    }
});

module.exports = MainView;