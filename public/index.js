/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [
              {
                text: "Take out papers", 
                completed: false
              },
              {
                text: "Take out the trask", 
                completed: false
              },
              {
                text: "spend some spending cash", 
                completed: false
              }
              ],
      newTask: {
                text: ""
                }
    };
  },
  created: function() {},
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
    markComplete: function(inputTask) {
      var indexOfTask = this.tasks.indexOf(inputTask);
      this.tasks.splice(indexOfTask, 1);
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