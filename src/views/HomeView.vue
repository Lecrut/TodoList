<script>
  let id = 0;

  export default {
    data() {
      return {
        newTodo: "",
        hideCompleted: false,
        todos: []
      }
    },
    computed : {
      //...
    },
    methods: {
      addTodo() {
        this.todos.push({id:id++, text: this.newTodo, done: false, edit: false})
        this.newTodo = ''
      },
      removeTodo(todo) {
        this.todos = this.todos.filter((t)=> t !==todo)
      },
      editTodo(todo) {
        todo.edit = true
        this.value = todo.text
      },
      changeTodo(todo, value) {
        todo.text = value
        todo.edit = false
        this.value = ''
      }
    }
  }
  
</script>

<template>
  <h1>Lista zadań</h1>
  <main>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Dodaj</button>
    </form>
    <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }" v-show="!todo.edit">{{ todo.text }}</span>
      <input type="text" v-model="todo.text" v-show="todo.edit">
      <button @click="removeTodo(todo)">X</button>
      <button v-show="!todo.edit" @click="editTodo(todo)">Edit</button>
      <button v-show="todo.edit" @click="changeTodo(todo, todo.text)">Save</button>
    </li>
  </ul>
  </main>
</template>
