<template>
  <div class="flex justify-center items-center top-0 fixed bg-gray-500/[.5] w-full h-full">
    <div class="w-[800px] h-[600px] border-8 rounded-[5px] bg-white border-teal-500">
      <div class="p-8 rounded-[5px] h-full">
        <div class="flex justify-end">
          <button
            class="rounded-[5px] p-2 text-white w-[50px] text-center bg-red-600"
            @click="closeModal"
          >
            X
          </button>
        </div>
        <h1>EDIT</h1>
        <br />
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
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoleType, UserType } from '@/interfaces/interfaces'
import { computed, type ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'
import { type Role } from '@/interfaces/interfaces'
import dayjs from 'dayjs'

const store = useStore()
const selectedRole: ComputedRef<Role> = computed(() => store.state.selectedRole)

const formData = ref<Role>({
  ...selectedRole.value,
  name: selectedRole.value.name,
  type: selectedRole.value.type,
  description: selectedRole.value.description,
  modified_on: dayjs().format('DD/MM/YYYY')
})

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const closeModal = () => {
  emit('closeModal')
}

const handleSubmit = () => {
  try {
    store.dispatch('editRole', formData.value)
    emit('closeModal')
  } catch (error) {
    console.error('Error editing role: ', error)
  }
}

const resetForm = (e: Event) => {
  e.preventDefault()
  formData.value = {
    ...selectedRole.value,
    name: selectedRole.value.name,
    type: selectedRole.value.type,
    description: selectedRole.value.description
  }
  closeModal()
}
</script>
