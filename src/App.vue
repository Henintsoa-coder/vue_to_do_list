<template>
  <div id="app">
    <todos v-model="todos"></todos>
  </div>
</template>

<script>
/* eslint-disable */ 
import Todos from './components/Todos'

export default {
  name: 'App',
  components: {Todos},
  data (){
    return {
      todos: [{
        name: "Demo",
        completed: true
      }]
    }
  },
  methods: {
    addToDo (){
      this.todos.push({
        name:"Jean",
        completed: false
      })
    }
  }
}
</script>
