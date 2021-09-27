import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationsError: null,
  isLoggedIn: null
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationsError = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationsError = payload
  }
}

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
  // getters
}
