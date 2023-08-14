<template>
  <div class="page">
    <h1>User Roles Management</h1>
    <div class="flex justify-between py-8">
      <div>
        <input class="mr-20" v-model="searchRole" placeholder="Search roles..." />
        <select class="bg-white border-teal-500 text-teal-500 pr-2" v-model="selectedFilter">
          <option value="all">Active and Inactive</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          >
        </select>
      </div>
      <button
        class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-[5px]"
        @click="navigateToCreateRole"
      >
        Create new role
      </button>
    </div>
    <div class="grid grid-cols-3 gap-10 py-10">
      <RoleCard
        v-for="role in filteredRoles"
        :key="role.id"
        :role="role"
        @editRole="editRole"
        @deleteRole="deleteRole"
      ></RoleCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RoleCard from '@/components/role-card/RoleCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const getRoles = computed(() => {
  return store.getters.getRoles
})
onMounted(() => {
  store.dispatch('fetchRoles')
})
const searchRole = ref('')
const selectedFilter = ref('all')
const roles = computed(() => store.state.roles)

const filteredRoles = computed(() => {
  const inputedRole = searchRole.value.toLowerCase()
  const filter = selectedFilter.value

  return roles.value.filter(
    (role) =>
      role.name.toLowerCase().includes(inputedRole) &&
      (filter === 'all' ||
        (filter === 'active' && role.active) ||
        (filter === 'inactive' && !role.active))
  )
})

const navigateToCreateRole = () => {
  router.push('/create-role')
}

const editRole = (id: number) => {}

const deleteRole = (id: number) => {
  try {
    store.dispatch('deleteRole', id)
  } catch (error) {
    console.error('Error deleting role: ', error)
  }
}
</script>
