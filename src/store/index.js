import { createStore } from 'vuex'

export default createStore({
  state: {
    fingerprint: {
    },
    transitionIsDone: true,
    view: ' ',
    fingerprints: null
  },
  mutations: {
    setFingerprint(state, object) {
      state.fingerprint = object
    },
    setFingerprints(state, array) {
      state.fingerprints = array
    },
    setView(state, string) {
      state.transitionIsDone = false
      state.view = string
      setTimeout(() => {
        state.transitionIsDone = true
      }, 500)
    }
  },
  actions: {
  },
  modules: {
  }
})
