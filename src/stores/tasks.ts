import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'
import {
  collection,
  where,
  query,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  updateDoc
} from 'firebase/firestore'

export const useTasksStore = defineStore('counter', () => {
  let id = 0
  const userID = getAuth().currentUser?.uid
  const newName = ref('')
  const newTodo = ref('')
  const hideCompleted = ref(false)
  interface todo {
    id: number
    text: string
    done: boolean
    edit: boolean
    docId: string
  }
  const todos = ref<todo[]>([])

  const TasksCollectionRef = query(collection(db, 'tasks'), where('IdUsera', '==', userID))

  onSnapshot(TasksCollectionRef, (docsSnap) => {
    todos.value.length = 0
    docsSnap.forEach((doc) => {
      todos.value.push({
        id: doc.data().id,
        text: doc.data().text,
        done: doc.data().done,
        edit: doc.data().edit,
        docId: doc.data().docId
      })
    })
    id = todos.value.length
  })

  const nameRules = [
    (newTodo) => newTodo < 1 || newTodo.length > 3 || 'Text must be longer than 3 characters'
  ]

  const filteredTodos = computed(() => {
    return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
  })

  async function addTodo() {
    if (newTodo.value.length > 3) {
      await setDoc(doc(collection(db, 'tasks')), {
        id: id++,
        text: newTodo.value.toUpperCase(),
        done: false,
        edit: false,
        IdUsera: userID,
        docId: ''
      })
      id--
      const q = query(TasksCollectionRef, where('IdUsera', '==', userID), where('id', '==', id))
      getDocs(q)
        .then((querySnapshot) => {
          const currentDoc = querySnapshot.docs[0]
          const documentRef = doc(db, 'tasks', currentDoc.id)
          updateDoc(documentRef, { docId: documentRef })
        })
        .catch((error) => {
          console.error('Error retrieving documents:', error)
        })
      newTodo.value = ''
    }
  }

  function editTodo(todo) {
    todo.edit = true
    newName.value = todo.text
    updateDoc(todo.docId, { edit: todo.edit })
  }

  async function removeTodo(todo) {
    deleteDoc(todo.docId)
    todos.value = todos.value.filter((t) => t !== todo)
  }

  function changeTodo(todo, value) {
    todo.text = value
    todo.edit = false
    updateDoc(todo.docId, { edit: todo.edit, text: todo.text })
  }

  function makeMade(todo) {
    todo.done = !todo.done
    updateDoc(todo.docId, { done: todo.done })
  }

  function sortList() {
    return todos.value.sort((a, b) => {
      if (a.text < b.text) return -1
      if (a.text > b.text) return 1
      return 0
    })
  }

  function showTodo() {
    hideCompleted.value = !hideCompleted.value
  }

  return {
    showTodo,
    sortList,
    makeMade,
    changeTodo,
    removeTodo,
    editTodo,
    addTodo,
    filteredTodos,
    todos,
    hideCompleted,
    newTodo,
    newName,
    id,
    nameRules
  }
})
