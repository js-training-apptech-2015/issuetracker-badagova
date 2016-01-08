var MainView = require ("./views/mainView"),
	ProjectListView = require ("./views/ProjectListView"),
	ProjectCollection = require ("./models/ProjectCollection"),
	IssueListView = require ("./views/IssuesListView"),
	IssueCollection = require ("./models/IssueCollection"),
	IssueView = require ("./views/IssueView"),
	Issue = require ("./models/Issue");

var projectCollection = new ProjectCollection(); 

var mainView = new MainView({
            		el: $('#application')
          		});

var Router = Backbone.Router.extend({
	
	routes: {
	  	'': 'start',
	  	'/': 'start',
	  	'project:id': 'issues',
	  	'project:id/issue:issueID': 'issueDetail'
	}, 
	 
	start: function(){
		projectCollection.fetch({
			success: function () {
		  		MainView.projectListView = new ProjectListView({
		  			el: this.$(".main"),
					collection: projectCollection
	  			});
	  			MainView.projectListView.render();
          	}
	  	});
	},
	  
	issues: function (id){
	  	MainView.issuesListView = new IssueListView({
	    	el: $('.main'),
	    	collection: new IssueCollection (projectCollection.get(id).get("issues"))
	  	});
      	MainView.issuesListView.render();
	},
	
	issueDetail: function(id, issueID){
	  	MainView.issueView = new IssueView({
	    	el: $('.main'),
	    	model: new Issue (_.findWhere(projectCollection.get(id).get("issues"), {id: issueID}))
	  	});
      	MainView.issueView.render();
    	}
  	});

mainView.render();

module.exports = Router;