<template>
  <div class="grid grid-cols-3 gap-10 py-10">
    <RoleCard
      v-for="role in props.fetchFilteredRoles()"
      :key="role.id"
      :role="role"
      @editRole="editRole(role.id)"
      @deleteRole="deleteRole(role.id)"
    ></RoleCard>
  </div>
</template>

<script lang="ts" setup>
import RoleCard from '@/components/roles/card/RoleCard.vue'
import { useStore } from 'vuex'
import { type Role } from '@/interfaces/interfaces'
const store = useStore()
const props = defineProps<{
  fetchFilteredRoles: () => Role[]
  toggleModal: () => void
}>()

const editRole = (id: number) => {
  store.dispatch('fetchRole', id)
  props.toggleModal()
}

const deleteRole = (id: number) => {
  try {
    store.dispatch('deleteRole', id)
  } catch (error) {
    console.error('Error deleting role: ', error)
  }
}
</script>
