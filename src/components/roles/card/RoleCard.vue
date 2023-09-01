<template>
  <div class="border rounded-[5px]">
    <div class="p-8">
      <div class="w-full flex justify-end">
        <span
          :class="[
            'rounded-[5px] p-2 text-white w-[100px] text-center',
            { 'bg-green-500': role.active, 'bg-red-500': !role.active }
          ]"
        >
          {{ role.active ? 'ACTIVE' : 'INACTIVE' }}
        </span>
      </div>
      <h1>{{ role.name }}</h1>
      <p class="text-2xl pb-8">{{ getUserType(role.type) }}</p>
      <p>{{ role.description }}</p>
    </div>
    <div class="bg-[#F8F8F8] h-[80px] p-8">
      <div v-if="role.editable">
        <div class="flex justify-between">
          <p>Last Update: {{ getDate(role.modified_on) }}</p>
          <div class="flex justify-between w-[100px]">
            <button class="text-gray-500" @click="editRole">EDIT</button>
            <button class="text-red-500" @click="deleteRole">DELETE</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-between">
          <p>Date Created: {{ getDate(role.created_on) }}</p>
          <div>&#128274;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Role, UserType, RoleType } from '@/interfaces/interfaces'
import dayjs from 'dayjs'
const props = defineProps<{
  role: Role
}>()
const emit = defineEmits<{
  (e: 'editRole', id: number): void
  (e: 'deleteRole', id: number): void
}>()

const getUserType = (type: UserType) => {
  switch (type) {
    case UserType.ADMIN:
      return RoleType.ADMIN_ROLE
    case UserType.JOB_ADMIN:
      return RoleType.JOB_ADMIN_ROLE
    default:
      return 'Unknown Role Type'
  }
}

const getDate = (modifiedOn: string) => {
  return dayjs(modifiedOn).format('DD/MM/YYYY')
}

const editRole = () => {
  emit('editRole', props.role.id)
}
const deleteRole = () => {
  emit('deleteRole', props.role.id)
}
</script>
