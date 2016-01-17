var IssueCollection = require("./IssueCollection");

var Project = Backbone.Model.extend({
	defaults: {
	  	id: '',
	  	name: '',
	  	code: '',
      	issues: ''
	},
	
	set: function (attributes, options){
		if (!(attributes.issues instanceof IssueCollection)){
			attributes.issues = new IssueCollection(attributes.issues);
			}
		return Backbone.Model.prototype.set.call(this, attributes, options);
	},
	
	toJSON: function(){
    	var json = _.clone(this.attributes);
    	for(var attr in json) {
			if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
            	json[attr] = json[attr].toJSON();
         	}
    	}
    	return json;
	}
});

module.exports = Project;