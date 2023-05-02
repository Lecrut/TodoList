import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  let id = 0;
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
  return {showTodo, sortList, makeMade, changeTodo, removeTodo, editTodo, addTodo, filteredTodos, todos, smthEdited, hideCompleted, newTodo, newName, id}
})


