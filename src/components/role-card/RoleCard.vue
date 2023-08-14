<template>
  <div class="border p-8 rounded-[4px]">
    <div class="w-full flex justify-end">
      <span
        :class="['rounded-[4px] p-2', { 'bg-green-500': role.active, 'bg-red-500': !role.active }]"
      >
        {{ role.active ? 'ACTIVE' : 'INACTIVE' }}
      </span>
    </div>
    <h1>{{ role.name }}</h1>
    <p class="text-2xl font-sans pb-8">{{ role.type }}</p>
    <p>{{ role.description }}</p>

    <div class="flex justify-between py-4">
      <p>Last Update: {{ role.modified_on }}</p>
      <div v-if="role.editable" class="flex justify-between w-[100px]">
        <button class="text-gray-500" @click="editRole">EDIT</button>
        <button class="text-red-500" @click="deleteRole">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Role } from '@/interfaces/interfaces'
const props = defineProps<{
  role: Role
}>()
const emit = defineEmits<{
  (e: 'editRole', id: number): void
  (e: 'deleteRole', id: string): void
}>()

const editRole = () => {
  emit('editRole', props.role.id)
}
const deleteRole = () => {
  emit('deleteRole', props.role.id)
}
</script>
