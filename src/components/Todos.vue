<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" name="tache" id="tache" class="new-todo" placeholder="Ajouter une tâche" value="" v-model="newTodo" @keyup.enter="addTodo">
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
                    <input type="text" class="edit" :value="todo.name" @keyup.enter="updateValue" @blur="updateValue" @keyup.esc="cancelEdit" v-focus="todo === editing">
                </li>
            </ul>
        </div>
        <footer class="footer" v-show="hasTodos">
            <span class="todo-count"><strong>{{ remainingTodosCount }}</strong> tâches à faire </span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter==='all'}" @click.prevent="filter = 'all'">Toutes les tâches</a></li>
                <li><a href="#" :class="{selected: filter==='todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter==='done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="completedTodosCount" @click="deleteCompleted">Supprimer les tâches finies</button>
        </footer>
    </section>
</template>

<script>
/* eslint-disable */ 
import Vue from 'vue'
import Store from './TodosStore'
import Vuex, { mapGetters } from 'vuex'

global.v = Vuex

export default {
    data(){
        return {
            store: Store,
            newTodo: '',
            filter: 'all',
            editing: null,
            oldTodo: '',
            updatedTodo: ''
        }
    },
    methods: {
        ...Vuex.mapActions({
                addTodoStore:'addTodo',
                deleteToDo: 'deleteTodo',
                deleteCompleted: 'deleteCompleted',
                updateTodo: 'updateTodo'
        }),
        addTodo(){
            this.addTodoStore(this.newTodo);
            this.newTodo = ''
        },
        editTodo(todo) {
            this.editing = todo;
            this.oldTodo = todo.name;
        },
        updateValue(e){
            this.updatedTodo = e.target.value;
                      
            const dataObject = {oldTodo: this.oldTodo, updatedTodo: this.updatedTodo}
            
            this.store.commit('UPDATE_TODO', dataObject);

            this.doneEdit();
        },
        updateStatus(todo){
            this.store.commit('UPDATE_TODO_STATUS', todo);
            //this.doneEdit();
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
        ...Vuex.mapGetters([
            'todos',
            'remainingTodosCount',
            'completedTodosCount',
            'remainingTodos',
            'completedTodos',
        ]),
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
        filteredTodos(){
            if (this.filter == "todo") {
                return this.remainingTodos;
            }else if(this.filter == "done") {
                return this.completedTodos;
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
