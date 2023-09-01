<template>
  <div class="page">
    <div class="flex justify-between">
      <h1>Create New Role</h1>
    </div>

    <div class="p-8 rounded-[5px] h-full">
      <form @submit.prevent="handleSubmit">
        <label>Name: </label>
        <input class="w-full mb-4" type="text" id="name" v-model="formData.name" />

        <label>Role: </label>
        <select class="w-full h-[40px] mb-4" v-model="formData.type">
          <option :value="UserType.ADMIN">{{ RoleType.ADMIN_ROLE }}</option>
          <option :value="UserType.JOB_ADMIN">{{ RoleType.JOB_ADMIN_ROLE }}</option>
          >
        </select>

        <label>Description: </label>
        <textarea class="mb-8" v-model="formData.description"></textarea>

        <div class="flex justify-end">
          <button
            class="bg-white-500 hover:bg-gray-100 border border-teal-500 text-teal-500 font-bold py-2 px-4 rounded-[5px] mr-4 w-[200px]"
            @click="resetForm"
          >
            Cancel
          </button>
          <button
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-[5px] w-[200px]"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { type Role } from '@/interfaces/interfaces'
import dayjs from 'dayjs'
import { RoleType, UserType } from '@/interfaces/interfaces'
import { ref, computed, type ComputedRef } from 'vue'
const router = useRouter()

const store = useStore()
const roles: ComputedRef<Role[]> = computed(() => store.state.data)
const formData = ref<Role>({
  id: roles.value.length + 1,
  name: '',
  type: UserType.ADMIN,
  description: '',
  active: true,
  editable: true,
  created_on: dayjs().format('DD/MM/YYYY'),
  modified_on: dayjs().format('DD/MM/YYYY')
})

const handleSubmit = () => {
  try {
    store.dispatch('createRole', formData.value)
    router.push('/')
  } catch (error) {
    console.error('Error creating role: ', error)
  }
}

const resetForm = (e: Event) => {
  e.preventDefault()
  router.push('/')
}
</script>
