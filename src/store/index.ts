import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    roles: []
  },
  getters: {
    getRoles: (state) => state.roles
  },
  actions: {
    async fetchRoles({ commit }) {
      try {
        const response: RolesResponse = await axios.get(' http://localhost:3000/roles')
        commit('SET_ROLES', response.data)
      } catch (error) {
        alert(error)
      }
    },
    async deleteRole({ commit }, roleId) {
      try {
        commit('DELETE_ROLE', roleId)
      } catch (error) {
        alert(error)
      }
    }
  },
  mutations: {
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    DELETE_ROLE(state, roleId) {
      state.roles = state.roles.filter((role) => role.id !== roleId)
    }
  }
})
