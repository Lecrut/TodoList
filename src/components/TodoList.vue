<script setup>
import TodoItem from './TodoItem.vue'
import { useTasksStore } from '../stores/tasks'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useTasksStore()

const { showTodo, sortList, makeMade, changeTodo, removeTodo, editTodo, addTodo } = store

const { todos, newTodo } = storeToRefs(store)

const filteredTodos = computed(() => store.filteredTodos)
</script>

<template>
  <div class="strona">
    <v-sheet max-width="500" class="mx-auto">
      <h1 style="text-align: center">{{ $t('todoListHeader') }}</h1>

      <main>
        <v-sheet>
          <v-form @submit.prevent>
            <v-text-field
              v-model="newTodo"
              :label="$t('taskAddText')"
              :rules="store.nameRules"
              required
            ></v-text-field>

            <v-btn block class="mt-2" color="info" @click="addTodo()">{{ $t('addBtn') }}</v-btn>

            <v-btn v-if="todos.length !== 0" block class="mt-2" color="info" @click="sortList()">{{
              $t('sortBtn')
            }}</v-btn>

            <v-checkbox
              v-if="todos.length !== 0"
              value="hideCompleted"
              color="info"
              :label="$t('showTodoCheckbox')"
              @click="showTodo()"
            ></v-checkbox>
          </v-form>
        </v-sheet>

        <br />

        <span
          >{{ $t('todoCntr') }} {{ todos.filter((produkt) => produkt.done === false).length }}</span
        >

        <br />

        <ul>
          <v-list>
            <v-list-item v-for="todo in filteredTodos" :key="todo.id">
              <TodoItem
                :text="todo.text"
                :done="todo.done"
                :edit="todo.edit"
                @delete-task="removeTodo(todo)"
                @edit-task="(args) => changeTodo(todo, args)"
                @able-edit="editTodo(todo)"
                @check-checkbox="makeMade(todo)"
              ></TodoItem>
            </v-list-item>
          </v-list>
        </ul>
      </main>
    </v-sheet>
  </div>
</template>
