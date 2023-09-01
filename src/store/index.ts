import { createStore } from 'vuex'
import axios from 'axios'
import type { Role, RolesResponse, Filter } from '@/interfaces/interfaces'
export default createStore({
  state: {
    data: [],
    filter: {} as Filter,
    selectedRole: {} as Role
  },
  getters: {
    getRoles: (state: RolesResponse): Role[] => state.data
  },
  actions: {
    async fetchRoles({ commit }: any) {
      try {
        const response: RolesResponse = await axios.get(' http://localhost:3000/roles')
        commit('SET_ROLES', response.data)
      } catch (error) {
        alert(error)
      }
    },
    async fetchRole({ commit }: any, roleId: number) {
      commit('SET_ROLE', roleId)
    },
    async setFilter({ commit }: any, filter: Filter) {
      commit('SET_FILTER', filter)
    },
    async createRole({ commit }: any, role: Role) {
      commit('CREATE_ROLE', role)
    },

    async editRole({ commit }: any, role: Role) {
      commit('EDIT_ROLE', role)
    },
    async deleteRole({ commit }: any, roleId: number) {
      try {
        commit('DELETE_ROLE', roleId)
      } catch (error) {
        alert(error)
      }
    }
  },
  mutations: {
    SET_ROLES(state: RolesResponse, roles: Role[]) {
      state.data = roles
    },
    SET_ROLE(state: RolesResponse, roleId: number) {
      state.selectedRole = state.data.find((role) => role.id === roleId) as Role
    },
    SET_FILTER(state: RolesResponse, filter: Filter) {
      state.filter = filter
    },
    CREATE_ROLE(state: RolesResponse, newRole: Role) {
      state.data.push(newRole)
    },
    EDIT_ROLE(state: RolesResponse, editedRole: Role) {
      const roleId = state.data.findIndex((role) => role.id === editedRole.id)
      state.data[roleId] = editedRole
    },
    DELETE_ROLE(state: RolesResponse, roleId: number) {
      state.data = state.data.filter((role) => role.id !== roleId)
    }
  }
})
