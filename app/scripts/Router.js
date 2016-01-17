var MainView = require ("./views/mainView"),
	ProjectListView = require ("./views/ProjectListView"),
	ProjectCollection = require ("./models/ProjectCollection"),
	IssueListView = require ("./views/IssuesListView"),
	IssueCollection = require ("./models/IssueCollection"),
	IssueView = require ("./views/IssueView"),
	Issue = require ("./models/Issue"),
	HeaderView = require("./views/HeaderView");

var projectCollection = new ProjectCollection(); 
//var issueCollectionArr = [];

var mainView = new MainView({
            		el: $('#application')
          		});

var header = new Backbone.Model({
	breadcrumbs: new Backbone.Collection({
		model: new Backbone.Model({
			route: '',
			name: ''
		})
	})
});

var Router = Backbone.Router.extend({
	
	routes: {
	  	'': 'start',
	  	'/': 'start',
	  	'project:projectID': 'issues',
	  	'project:projectID/issue:issueID': 'issueDetail'
	}, 
	 
	start: function(){
		projectCollection.fetch({
			success: function () {
		  		MainView.projectListView = new ProjectListView({
		  			el: this.$(".main"),
					collection: projectCollection
	  			});
				header.get("breadcrumbs").reset([]);
				header.get("breadcrumbs").set({
					route: "#", 
					name: "Projects"
				});
				
	  			MainView.header = new HeaderView({
					model: header,
					el: this.$(".header"),
				});

				MainView.projectListView.render();
				MainView.header.render();
          	}
	  	});
	},
	  
	issues: function (projectID){
		projectCollection.fetch({
			success: function () {
				header.get("breadcrumbs").set([{
					route: "#", 
					name: "Projects"
					},
					{
					route: "#/project"+projectID,
					name: projectCollection.get(projectID).get("name")
				}]);
				
	  			MainView.header = new HeaderView({
					model: header,
					el: this.$(".header"),
				});
				
				MainView.issuesListView = new IssueListView({
	    			el: $('.main'),
	    			collection: projectCollection.get(projectID).get("issues")//issueCollectionArr[projectID-1]
	  			});
				
				MainView.issuesListView.render();
				MainView.header.render();
			}
		});
	},
	
	issueDetail: function(projectID, issueID){
	  	projectCollection.fetch({
			success: function () {
				header.get("breadcrumbs").set([{
					route: "#", 
					name: "Projects"
				},
				{
					route: "#/project"+projectID,
					name: projectCollection.get(projectID).get("name")
				},
				{
					route: "#/project"+projectID+"/issue"+issueID, 
					name: projectCollection.get(projectID).get("issues").get(issueID).get("name")
				}]);
				
	  			MainView.header = new HeaderView({
					model: header,
					el: this.$(".header"),
				});
				
				MainView.issueView = new IssueView({
	    			el: $('.main'),
	    			model: projectCollection.get(projectID).get("issues").get(issueID)
	  			});
				
      			MainView.issueView.render();
				MainView.header.render();
    		}
	  	});
	}
});

mainView.render();

module.exports = Router;