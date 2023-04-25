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
      filteredTodos() {
        return this.hideCompleted
          ? this.todos.filter((t) => !t.done)
          : this.todos
      }
    },
    methods: {
      addTodo() {
        this.todos.push({id:id++, text: this.newTodo.toUpperCase(), done: false, edit: false})
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
      },
      sortList( ) {
        return this.todos.sort((a, b) => {
          if (a.text < b.text) return -1;
          if (a.text > b.text) return 1;
          return 0;
        })
      },
      showTodo() {
        this.hideCompleted = !this.hideCompleted
      }
    }
  }
</script>
<template>
  <h1>Todo List</h1>
  <main>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add</button>
    </form>
      <span>Todo counter {{ this.todos.filter(produkt => produkt.done === false).length }}</span>
      <br>
      <button v-if="todos.length !== 0" @click="sortList()">Sort</button>
      <br>
      <span v-if="todos.length !== 0">Show todo only:</span>
      <input v-if="todos.length !== 0" type="checkbox" @click="showTodo()">
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span v-show="!todo.edit">{{ todo.text }}</span>
        <input type="text" v-model="todo.text" v-show="todo.edit">
        <button @click="removeTodo(todo)">X</button>
        <button v-show="!todo.edit" @click="editTodo(todo)">Edit</button>
        <button v-show="todo.edit" @click="changeTodo(todo, todo.text)">Save</button>
      </li>
    </ul>
  </main>
</template>