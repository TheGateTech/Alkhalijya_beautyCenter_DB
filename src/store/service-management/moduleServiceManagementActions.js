/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js"

export default {
    
  fetchServices({ commit }, page) {
    return new Promise((resolve, reject) => {
      axios.get(`api/services?page=${page}`)
        .then((response) => {
          commit('SET_SERVICES', response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchService(context, serviceId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/services/${serviceId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  
  addService({commit}, service) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/services`, service)
        .then(
          (response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateService({ commit }, service) {
    return new Promise((resolve, reject) => {
      service._method = 'PUT'
      axios.post(`/api/services/${service.id}`, service)
        .then((response) => {
          // commit('ADD_Service', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord({ commit }, serviceId) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/services/${serviceId}`, { _method: 'DELETE'})
        .then((response) => {
          commit('REMOVE_RECORD', serviceId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
