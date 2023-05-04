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
    <h1 style="text-align: center;">{{$t('todoListHeader')}}</h1>
  <main>
    <v-sheet width="100%" class="mx-auto">
      <v-form ref="form" @submit.prevent >
        <v-text-field
          v-model="newTodo"
          :label="$t('taskAddText')"
          :rules="store.nameRules"
          required
        ></v-text-field>
        <v-btn block class="mt-2" @click="addTodo()">{{$t('addBtn')}}</v-btn>
        <v-btn v-if="todos.length !== 0" block class="mt-2" @click="sortList()">{{$t('sortBtn')}}</v-btn>
        <v-checkbox 
          v-if="todos.length !== 0" 
          value="hideCompleted"
          :label="$t('showTodoCheckbox')"
          @click="showTodo()"></v-checkbox>
      </v-form>
    </v-sheet>
      <br>
      <span>{{$t('todoCntr')}} {{ todos.filter(produkt => produkt.done === false).length }}</span>
      <br>
      <br>
      <v-text-field 
        v-if="smthEdited" 
        v-model="newName" 
        :rules="store.nameRules"
        :label="$t('editTaskLabel')"
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