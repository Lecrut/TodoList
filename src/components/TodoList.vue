<script setup>
  let id = 0;
  import { computed, ref } from 'vue'
  import TodoItem from './TodoItem.vue'
  let newName = ""
  let newTodo = ref("")
  let hideCompleted = ref(false)
  let smthEdited= ref(false)
  let todos = ref([])
  const filteredTodos = computed (() => {
    return hideCompleted.value
          ? todos.value.filter((t) => !t.done)
          : todos.value
  })
  function addTodo() {
    todos.value.push({id:id++, text: newTodo.value.toUpperCase(), done: false, edit: false})
    newTodo.value = ''
  }

  function editTodo(todo) {
    if (smthEdited.value=== false) {
      todo.edit = true
      smthEdited.value = true
      newName = todo.text
    }
  }
  function removeTodo(todo) {
    if ( todo.edit === true) {
      smthEdited.value = false
    }
    todos.value = todos.value.filter((t)=> t !==todo)
  }

  function changeTodo(todo, value) {
    todo.text = value
    todo.edit = false
    smthEdited.value = false;
  }

  function makeMade(todo) {
    todo.done = !todo.done
  }

  function sortList( ) {
    return todos.value.sort((a, b) => {
      if (a.text < b.text) return -1;
      if (a.text > b.text) return 1;
      return 0;
    })
  }

  function showTodo() {
    hideCompleted.value = !hideCompleted.value
  }
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