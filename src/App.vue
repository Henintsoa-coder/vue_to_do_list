<template>
  <div id="app">
    <carousel>
      <carousel-slide>
          <div style="position:absolute; left:0; right:0; top:50%; text-align:center; color:#FFF; font-size: 16px;">
            Salut les gens !!
          </div>
        <img src="https://picsum.photos/seed/picsum/1366/600" alt="" width="100%">
      </carousel-slide>
      <carousel-slide>
          <div style="position:absolute; left:0; right:0; top:50%; text-align:center; color:#FFF; font-size: 16px;">
            Au revoir les gens !!
          </div>
        <img src="https://picsum.photos/id/237/1366/600" alt="" width="100%">
      </carousel-slide>
    </carousel>
    <todos v-model="todos"></todos>
  </div>
</template>

<script>
/* eslint-disable */ 
import Todos from './components/Todos'
import Carousel from './components/carousel/Carousel.vue'
import CarouselSlide from './components/carousel/CarouselSlide.vue'

export default {
  name: 'App',
  components: {Todos, Carousel, CarouselSlide},
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
