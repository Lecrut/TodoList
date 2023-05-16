<script lang="ts" setup>
import { ref } from 'vue'

export interface Props {
  text?: string
  done?: boolean
  edit?: boolean
}

withDefaults(defineProps<Props>(), {
  text: ''
})

const emit = defineEmits<{
  (e: 'check-checkbox'): void
  (e: 'delete-task'): void
  (e: 'able-edit'): void
  (e: 'editTask', text: string): void
}>()

const editName = ref('')

function emitChange() {
  emit('editTask', editName.value)
  editName.value = ''
}
</script>

<template>
  <v-toolbar>
    <v-checkbox-btn
      color="info"
      :model-value="done"
      @click="emit('check-checkbox')"
    ></v-checkbox-btn>

    <v-list-item-title v-show="!edit">{{ text }}</v-list-item-title>

    <v-text-field v-show="edit" v-model="editName"></v-text-field>

    <v-btn class="ma-2" color="red" @click="emit('delete-task')">
      <v-icon icon="fa:fas fa-trash"></v-icon>
    </v-btn>

    <v-btn v-show="!edit" class="ma-2" color="info" @click="emit('able-edit')">
      <v-icon icon="fa:fas fa-edit"></v-icon>
    </v-btn>

    <v-btn v-show="edit" class="ma-2" color="green-darken-2" @click="emitChange">
      <v-icon icon="fa:fas fa-check"></v-icon>
    </v-btn>
  </v-toolbar>
</template>
