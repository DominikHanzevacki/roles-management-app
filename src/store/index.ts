import { createStore } from 'vuex'
import axios from 'axios'
import type { Role, RolesResponse } from '@/interfaces/interfaces'
export default createStore({
  state: {
    data: []
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
    DELETE_ROLE(state: RolesResponse, roleId: number) {
      state.data = state.data.filter((role) => role.id !== roleId)
    }
  }
})
