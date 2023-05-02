<script setup>
  import TodoItem from './TodoItem.vue'
  import {useCounterStore} from '../stores/counter.js'
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue'

  const store = useCounterStore()
  
  const {showTodo, sortList, makeMade, changeTodo, removeTodo, editTodo, addTodo} = store

  const {todos, smthEdited, newTodo, newName} = storeToRefs(store)

  const filteredTodos = computed(() => store.filteredTodos)

</script>

<template>
  <h1>Todo List</h1>
  <main>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add</button>
    </form>
      <span>Todo counter {{ todos.filter(produkt => produkt.done === false).length }}</span>
      <br>
      <button v-if="todos.length !== 0" @click="sortList()">Sort</button>
      <br>
      <span v-if="todos.length !== 0">Show todo only:</span>
      <input v-if="todos.length !== 0" type="checkbox" @click="showTodo()">
      <br>
      <input v-if="smthEdited" v-model="newName" type="text"/>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <TodoItem
            :id = "todo.id"
            :text = "todo.text"
            :done = "todo.done"
            :edit= "todo.edit"
            @deleteTask="removeTodo(todo)"
            @editTask="changeTodo(todo, newName)"
            @ableEdit="editTodo(todo)"
            @checkCheckbox="makeMade(todo)"
        ></TodoItem>
      </li>
    </ul>
  </main>
</template>