<script setup>
    defineProps({
        id: Number,
        text: String,
        done: Boolean,
        edit: Boolean
    })
    const emit = defineEmits(['deleteTask', 'ableEdit', 'editTask', 'checkCheckbox'])
</script>
<template>
    <input type="checkbox"  @click="emit('checkCheckbox')" :checked="done">
    <span>{{ text }}</span>
    <button @click="emit('deleteTask')">X</button>
    <button v-show="!edit" @click="emit('ableEdit')">Edit</button>
    <button v-show="edit" @click="emit('editTask')">Save</button>
</template>
