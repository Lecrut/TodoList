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
  <v-sheet width="70%">
    <h1 style="text-align: center;">Todo List</h1>
  <main>
    <v-sheet width="100%" class="mx-auto">
      <v-form ref="form" @submit.prevent >
        <v-text-field
          v-model="newTodo"
          label="Task"
          :rules="store.nameRules"
          required
        ></v-text-field>
        <v-btn block class="mt-2" @click="addTodo()">Add</v-btn>
        <v-btn v-if="todos.length !== 0" block class="mt-2" @click="sortList()">Sort</v-btn>
        <v-checkbox 
          v-if="todos.length !== 0" 
          value="hideCompleted"
          label="Show todo only" 
          @click="showTodo()"></v-checkbox>
      </v-form>
    </v-sheet>
      <span>Todo counter {{ todos.filter(produkt => produkt.done === false).length }}</span>
      <br>
      <br>
      <v-text-field 
        v-if="smthEdited" 
        v-model="newName" 
        :rules="store.nameRules"
        label="Edit task"
        type="text"/>
    <v-card
      class="mx-auto"
      width="100%"
    >
    </v-card>
    <ul>
      <v-list>
        <v-list-item v-for="todo in filteredTodos" :key="todo.id">
          <TodoItem
              :id = "todo.id"
              :text = "todo.text"
              :done = "todo.done"
              :edit= "todo.edit"
              @delete-task="removeTodo(todo)"
              @edit-task="changeTodo(todo, newName)"
              @able-edit="editTodo(todo)"
              @check-checkbox="makeMade(todo)"
          ></TodoItem>
        </v-list-item>
      </v-list>
    </ul>
  </main>
  </v-sheet>
</template>