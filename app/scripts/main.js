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
	
  var IssueCollection = Backbone.Collection.extend({
	  //collection: Issue,
	  initialize: function (projectId) {
		 this.collection = new IssueCollection(projectCollection.findWhere({id: projectId}).get("issues"));
	  }
  });
	
  var ProjectCollection = Backbone.Collection.extend({
	model: Project,
	url: 'http://www.mocky.io/v2/567a37162500001045af0238',
	initialize: function () {
	  this.fetch();
	},
  });
	
  var projectCollection = new ProjectCollection();/*[
	{
	  _id: '1',
	  name: 'test', 
	  code: 'jsfnfkdnfl'
	},
	  
	{
	  _id: '2',
	  name: 'test2',
	  code: 'dklkfmjlkfd'
	},
	  
	{
	  _id: '3',
	  name: 'test3',
	  code: 'dlkflkdjlkfj'
	}
  ]);*/
	
  // alert(project.get('name'));
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
      this.menuView = new MenuView({
		  el: this.$(".menu")
	  });
	  this.menuView.render();
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
//	model: IssueCollection,
    getContext: function () {
	  var prjID = this.collection.at(1).get("projectId");
      return {
		issues: this.collection.toJSON(),
		projectName: projectCollection.get(prjID).get("name")
	  }
    }
  });

	var IssueView = TemplateView.extend({
    template: 'issue-detail',
//	model: IssueCollection,
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
	  'projects': 'projects',
	  'projects/:project': 'issues',
	  'projects/:project/:issue': 'issueDetail'
	}, 
	 
	start: function(){
	  var mainView = new MainView({
        el: $('#application')
      });
      mainView.render();
	},
	
	projects: function(){
	  MainView.projectListView = new ProjectListView({
        el: $('.main')
      });
      MainView.projectListView.render();  
	},
	  
	issues: function (project){
	  MainView.issuesListView = new IssueListView({
	    el: $('.main'),
	    collection: new Backbone.Collection(projectCollection.findWhere({name: project}).get("issues"))
	  });
      MainView.issuesListView.render();
	},
	
	issueDetail: function(project, issue){
	  MainView.issueView = new IssueView({
	    el: $('.main'),
	    model: new Backbone.Collection(projectCollection.findWhere({name: project}).get("issues")).findWhere({name: issue})
	  });
      MainView.issueView.render();
    }
  });
  var router = new Router();	
  Backbone.history.start();
})();
