<template>
  <div class="page">
    <RolesFilter />
    <RolesCards :fetchFilteredRoles="fetchFilteredRoles" :toggleModal="toggleModal" />
  </div>
  <div v-if="showModal">
    <RolesModal @closeModal="toggleModal" />
  </div>
</template>

<script lang="ts" setup>
import RolesFilter from '@/components/roles/filter/RolesFilter.vue'
import RolesCards from '@/components/roles/cards/RolesCards.vue'
import RolesModal from '@/components/modal/RolesModal.vue'
import { onMounted, computed, watch, type ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'
import { type Role, RoleStatus, type Filter } from '@/interfaces/interfaces'

const store = useStore()
const roles: ComputedRef<Role[]> = computed(() => store.state.data)
const filter: ComputedRef<Filter> = computed(() => store.state.filter)
const showModal = ref(false)
onMounted(() => {
  roles.value.length < 7 && store.dispatch('fetchRoles')
})

watch(filter, () => {
  fetchFilteredRoles()
})

const toggleModal = () => {
  showModal.value = !showModal.value
}
const fetchFilteredRoles = () => {
  return Object.keys(filter.value).length === 0
    ? roles.value
    : roles.value.filter(
        (role: Role) =>
          role.name.toLowerCase().includes(filter.value.name) &&
          (filter.value.type === RoleStatus.ALL ||
            (filter.value.type === RoleStatus.ACTIVE && role.active) ||
            (filter.value.type === RoleStatus.INACTIVE && !role.active))
      )
}
</script>
