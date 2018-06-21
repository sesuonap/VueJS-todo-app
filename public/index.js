/* global Vue, VueRouter, axios */
var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [],
      newTask: {
                text: ""
                }
    };
  },
  created: function() {
    axios
    .get('/api/tasks')
    .then(function(response) {
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      var tempTask = {
                      text: this.newTask.text,
                      completed: false
                      };

      if (this.newTask.text) {
        this.tasks.push(tempTask);
        this.newTask.text = "";
      }
    },
    toggleComplete: function(inputTask) {
      inputTask.completed = !inputTask.completed;
    },

    numberOfIncompleteTasks: function() {
      var count = 0;

      this.tasks.forEach(function(task) {
        if ( !task.completed ) {
        count++;
        }
      });
      return count;
    },

    deleteCompleted: function() {
      var incompleteTasks = [];
      this.tasks.forEach(function(task) {
        if (!task.completed) {
        incompleteTasks.push(task);
      }
      });
      this.tasks = incompleteTasks;
    }

  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});