export default {
  SET_SERVICES(state, services) {
    state.services = services.data
    // state.meta = response.meta
  },

  REMOVE_RECORD(state, itemId) {
      const serviceIndex = state.services.data.findIndex((u) => u.id == itemId)
      // console.log(serviceIndex)
      state.services.data.splice(serviceIndex, 1)
    // console.log(state.services);

  },
}
