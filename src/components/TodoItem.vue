<script lang="ts" setup>
    export interface Props {
        text?: string
        done?: boolean
        edit?: boolean
    }

    withDefaults(defineProps<Props>(), {
        text: ''
    })

    const emit = defineEmits<{
        (e: "check-checkbox"): void
        (e: "delete-task"): void
        (e: "able-edit"): void
        (e: "edit-task"): void
    }>()
</script>

<template>
    <v-toolbar>
        <v-checkbox-btn color="info" :model-value="done" @click="emit('check-checkbox')"></v-checkbox-btn>
       
        <v-list-item-title>{{text}}</v-list-item-title>
        
        <v-btn class="ma-2" color="red" @click="emit('delete-task')">{{$t('deleteBtn')}}</v-btn>
       
        <v-btn v-show="!edit" class="ma-2" color="info" @click="emit('able-edit')">{{$t('editBtn')}}</v-btn>
       
        <v-btn v-show="edit" class="ma-2" color="info" @click="emit('edit-task')">{{$t('saveBtn')}}</v-btn>
    </v-toolbar>
</template>
