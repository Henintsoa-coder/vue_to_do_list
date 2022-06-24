<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" name="tache" id="tache" class="new-todo" placeholder="Ajouter une tâche" value="" v-model="newTodo" @keyup.enter="addToDo">
        </header>

        <div class="main">
            <div>
                <input type="checkbox" name="alldone" id="alldone" class="toggle-all" v-model="allDone"> <label for="alldone">Tout marquer comme fait</label>
            </div>
            <ul class="todo-list">
                <li class="todo" v-for="(todo, index) in filteredTodos" :key="index" :class="{completed: todo.completed == true, editing: todo === editing }">
                    <div class="view">
                        <input type="checkbox" name="done" id="done" v-model="todo.completed" class="toggle completed">
                        <label @dblclick="editTodo(todo)">{{todo.name}}</label>
                        <button class="destroy" @click="deleteToDo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing">
                </li>
            </ul>
        </div>
        <footer class="footer" v-show="hasTodos">
            <span class="todo-count"><strong>{{ remaining }}</strong> tâches à faire </span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter==='all'}" @click.prevent="filter = 'all'">Toutes les tâches</a></li>
                <li><a href="#" :class="{selected: filter==='todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter==='done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="completed" @click="deleteCompleted">Supprimer les tâches finies</button>
        </footer>
    </section>
</template>

<script>
/* eslint-disable */ 
import Vue from 'vue'

export default {
    data(){
        return {
            todos: [],
            newTodo: '',
            filter: 'all',
            editing: null,
            oldTodo: ''
        }
    },
    methods: {
        addToDo() {
            this.todos.push({
                name: this.newTodo,
                completed: false
            });

            this.newTodo = '';
        },
        deleteToDo(toDo) {
            this.todos = this.todos.filter(i => i !== toDo);
        },
        deleteCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed )
        },
        editTodo(todo) {
            this.editing = todo;
            this.oldTodo = todo.name;
        },
        doneEdit() {
            this.editing = null;
        },
        cancelEdit() {
            this.editing.name = this.oldTodo;
            this.doneEdit();
        }
    },
    computed: {
        allDone: {
            get(){
                return this.remaining === 0
            },
            set(value){
                this.todos.forEach(todo => {
                    todo.completed = value;
                })
            }
        },
        remaining(){return this.todos.filter(todo => !todo.completed).length;},
        completed(){return this.todos.filter(todo => todo.completed).length;},
        filteredTodos(){
            if (this.filter == "todo") {
                return this.todos.filter(todo => !todo.completed);
            }else if(this.filter == "done") {
                return this.todos.filter(todo => todo.completed);
            }
            return this.todos;
        },
        hasTodos() {
            return this.todos.length > 0;
        }
    },
    directives: {
        focus: function(el, value){
            if (value) {
                Vue.nextTick(_ => {
                    el.focus();
                })
            }
        }
    }
}
</script>

<style scoped src="./todo.css"></style>
