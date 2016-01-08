var TemplateView = require ("./TemplateView");

var MainView = TemplateView.extend({
	template: 'main',
    render: function () {
    	TemplateView.prototype.render.call(this);
      	/*this.projectListView = new ProjectListView({
		  	el: this.$(".main")
	  	});
	  	this.projectListView.render();*/
    }
});

module.exports = MainView;