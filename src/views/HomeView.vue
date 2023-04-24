<script >
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
        this.todos.push({id:id++, text: this.newTodo, done: false})
        this.newTodo = ''
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
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      
    </li>
  </ul>
  </main>
</template>
