import { ref, computed, onMounted  } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import { db } from '@/main'
import { collection, getDocs, where, query, doc, setDoc } from 'firebase/firestore'

export const useCounterStore = defineStore('counter', () => {
  let id = 0;
  const userID = getAuth().currentUser?.uid
  const newName = ref("")
  const newTodo = ref("")
  const hideCompleted = ref(false)
  const smthEdited= ref(false)
  interface todo {
    id : number,
    text: string, 
    done: boolean, 
    edit: boolean
  }
  const todos = ref<todo[]>([])

  const TasksCollectionRef = query(collection(db, 'tasks'), where("IdUsera", "==", userID))

  const onSuccess = (docs) => {
    if (Array.isArray(docs)) {
      todos.value = docs.map((item) => item.data())
    } else {
      console.error('Invalid data format:', docs)
    }
  }

  onMounted(() => {
    getDocs(TasksCollectionRef)
      .then((snapshot) => {
        const docs = snapshot.docs
        onSuccess(docs)
      })
      .catch((error) => {
        console.error('Error retrieving documents:', error)
      })
  })

  const nameRules = [
    newTodo => (newTodo < 1 || newTodo.length > 3) || 'Text must be longer than 3 characters',
  ]

  const filteredTodos = computed (() => {
    return hideCompleted.value
          ? todos.value.filter((t) => !t.done)
          : todos.value
  })
  async function addTodo() {
    if (newTodo.value.length > 3) {
      await setDoc(doc(collection(db, "tasks")), {id:id++, text: newTodo.value.toUpperCase(), done: false, edit: false, IdUsera: userID })
      //todos.value.push({id:id++, text: newTodo.value.toUpperCase(), done: false, edit: false})
      newTodo.value = ''
    }
  }

  function editTodo(todo) {
    if (smthEdited.value=== false) {
      todo.edit = true
      smthEdited.value = true
      newName.value = todo.text
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
    smthEdited.value = false
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
  return {showTodo, sortList, makeMade, changeTodo, removeTodo, editTodo, addTodo, filteredTodos, todos, smthEdited, hideCompleted, newTodo, newName, id, nameRules}
})
