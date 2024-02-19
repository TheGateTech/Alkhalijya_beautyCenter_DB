/*=========================================================================================
  File Name: moduleChannelManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/Channel/pixinvent
==========================================================================================*/


import state from './moduleCategoryManagementState.js'
import mutations from './moduleCategoryManagementMutations.js'
import actions from './moduleCategoryManagementActions.js'
import getters from './moduleCategoryManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

