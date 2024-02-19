/*=========================================================================================
  File Name: moduleChannelManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/Channel/pixinvent
==========================================================================================*/


import state from './moduleServiceManagementState.js'
import mutations from './moduleServiceManagementMutations.js'
import actions from './moduleServiceManagementActions.js'
import getters from './moduleServiceManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

