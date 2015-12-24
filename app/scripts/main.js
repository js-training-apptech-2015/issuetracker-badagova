(function () {
  'use strict';
	
  var Project = Backbone.Model.extend({
	defaults: {
	  id: '',
	  name: '',
	  code: '',
      issues: ''
	}
  });
	
  var Issue = Backbone.Model.extend({
	defaults: {
	  id: '',
	  projectId: '',
	  name: '',
	  details: ''
    }
  });
	
  var IssueCollection = Backbone.Collection.extend();/*{
	  //collection: Issue,
	  initialize: function (projectId) {
		 this.collection = new IssueCollection(projectCollection.findWhere({id: projectId}).get("issues"));
	  }
  });*/
	
  var ProjectCollection = Backbone.Collection.extend({
	model: Project,
	url: 'http://www.mocky.io/v2/567a37162500001045af0238',
	initialize: function () {
	  //this.reset(Project);
	  this.comparator = function (prj) {
		  return prj.get('id');
	  };
	},
  });
	
  var projectCollection = new ProjectCollection(); 
	/*projectCollection.reset();[
    {
	  "id": "1",
	  "name": "test", 
	  "code": "jsfnfkdnfl",
      "issues":[
          {
            "id": "11",
            "projectId": "1",
            "name": "bug1",
            "detail": "Everything is very bad"
          },
          {
            "id": "12",
            "projectId": "1",
            "name": "bug2",
            "detail": "Everything doesn't work"
          }
        ]
	},
	  
	{
	  "id": "2",
      "name": "test2", 
	  "code": "dklkfmjlkfd",
      "issues":[
          {
            "id": "21",
            "projectId": "2",
            "name": "bug1",
            "detail": "Everything is very bad"
          },
          {
            "id": "22",
            "projectId": "2",
            "name": "bug2",
            "detail": "Everything doesn't work"
          }
        ]
	},
	  
	{
	  "id": "3",
      "name": "test3", 
	  "code": "dlkflkdjlkfj",
      "issues":[
          {
            "id": "31",
            "projectId": "3",
            "name": "bug1",
            "detail": "Everything is very bad"
          },
          {
            "id": "32",
            "projectId": "3",
            "name": "bug2",
            "detail": "Everything doesn't work"
          }
        ]
	}
]);*/
	
  var TemplateView = Backbone.View.extend({
    render: function () {
      var template = templates[this.template];
      this.$el.html(template.render(this.getContext()));
    },
    getContext: function () {
      return this.model ? this.model.toJSON() : {};
    }
  });

  var MainView = TemplateView.extend({
    template: 'main',
    render: function () {
      TemplateView.prototype.render.call(this);
      this.projectListView = new ProjectListView({
		  el: this.$(".main")
	  });
	  this.projectListView.render();
    }
  });

  var MenuView = TemplateView.extend({
    template: 'menu',
  });
	
  var ProjectListView = TemplateView.extend({
    template: 'project-list',
	collection: projectCollection,
	getContext: function () {
      return {
		projects: this.collection.toJSON()
      }
    }
  });

  var IssueListView = TemplateView.extend({
    template: 'issues-list',
    getContext: function () {
	 // var prjID = this.collection.at(0).get("projectId");
      return {
		issues: this.collection.toJSON(),
		//project: projectCollection.get(prjID).get("name")
	  }
    }
  });

	var IssueView = TemplateView.extend({
    template: 'issue-detail',
    getContext: function () {
      return {
		issue: this.model.toJSON()
      }
    }
  });

	
  /*$(function () {
    var mainView = new MainView({
      el: $('#application')
    });
    mainView.render();
  });*/
	
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
		  var mainView = new MainView({
            el: $('#application')
          });
          mainView.render();
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
  var router = new Router();	
  Backbone.history.start();
})();
