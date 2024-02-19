export default {
  SET_CATEGORIES(state, categories) {
    state.categories = categories.data
    // state.meta = response.meta
  },

  REMOVE_RECORD(state, itemId) {
      const categoryIndex = state.categories.data.findIndex((u) => u.id == itemId)
      // console.log(categoryIndex)
      state.categories.data.splice(categoryIndex, 1)
    // console.log(state.categories);

  },
}
