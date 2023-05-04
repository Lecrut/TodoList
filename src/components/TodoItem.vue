<script setup>
    defineProps({
        id: {
            type :Number,
            default: 0
        },
        text: {
            type: String,
            default: ""
        },
        done: {
            type: Boolean,
            default: false
        }, 
        edit:{
            type: Boolean,
            default: false
        } 
    })
    const emit = defineEmits(['delete-task', 'able-edit', 'edit-task', 'check-checkbox'])
</script>
<template>
    <v-toolbar>
        <v-checkbox-btn :model-value="done" @click="emit('check-checkbox')"></v-checkbox-btn>
        <v-list-item-title>{{text}}</v-list-item-title>
        <v-btn class="ma-2" @click="emit('delete-task')">{{$t('deleteBtn')}}</v-btn>
        <v-btn v-show="!edit" class="ma-2" @click="emit('able-edit')">{{$t('editBtn')}}</v-btn>
        <v-btn v-show="edit" class="ma-2" @click="emit('edit-task')">{{$t('saveBtn')}}</v-btn>
    </v-toolbar>
</template>
