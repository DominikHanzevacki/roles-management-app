<template>
  <div class="flex justify-between">
    <h1>User Roles Management</h1>
    <button
      class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-[5px]"
      @click="navigateToCreateRole"
    >
      Create new role
    </button>
  </div>
  <div class="grid grid-cols-2 py-8 gap-96">
    <input v-model="roleName" placeholder="Search roles..." />
    <select v-model="roleStatus">
      <option :value="RoleStatus.ALL">Active and Inactive</option>
      <option :value="RoleStatus.ACTIVE">Active</option>
      <option :value="RoleStatus.INACTIVE">Inactive</option>
      >
    </select>
  </div>
  <div class="flex justify-end">
    <button
      class="bg-white-500 hover:bg-gray-100 border border-teal-500 text-teal-500 font-bold py-2 px-4 rounded-[5px] mr-4 w-[200px]"
      @click="clearFilter"
    >
      Clear
    </button>
    <button
      class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-[5px] w-[200px]"
      @click="filterRoles"
    >
      Filter
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { type Role, type Filter, RoleStatus } from '@/interfaces/interfaces'

const router = useRouter()
const store = useStore()

const roles = computed(() => store.state.data)
const roleName = ref('')
const roleStatus = ref(RoleStatus.ALL)
const filter = ref({} as Filter)

watch([roleName, roleStatus], ([newRoleName, newRoleStatus]) => {
  if (newRoleName || newRoleStatus) {
    filter.value = {
      name: newRoleName,
      type: newRoleStatus
    }
  }
})

const clearFilter = () => {
  roleName.value = ''
  roleStatus.value = RoleStatus.ALL
  filter.value = {
    name: '',
    type: RoleStatus.ALL
  }
  store.dispatch('setFilter', filter.value)
}

const filterRoles = () => {
  store.dispatch('setFilter', filter.value)
}

const navigateToCreateRole = () => {
  router.push('/create-role')
}
</script>
