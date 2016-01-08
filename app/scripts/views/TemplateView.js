var TemplateView = Backbone.View.extend({
    render: function () {
      	var template = templates[this.template];
      	this.$el.html(template.render(this.getContext()));
    },
    getContext: function () {
      	return this.model ? this.model.toJSON() : {};
    }
});

module.exports = TemplateView;