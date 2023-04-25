<script>
  let id = 0;
  let newName = "";
  export default {
    data() {
      return {
        newTodo: ref(""),
        hideCompleted: ref(false),
        smthEdited: ref(false),
        todos: ref([])
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
        this.smthEdited = true
        this.value = todo.text

      },
      changeTodo(todo, value) {
        todo.text = value
        todo.edit = false
        this.smthEdited = false;
        this.value = ''
      },
      makeMade(todo) {
        todo.done = !todo.done
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

<script setup>
    import { ref } from 'vue';
    import TodoItem from './TodoItem.vue'
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