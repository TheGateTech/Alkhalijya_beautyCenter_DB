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
    
  fetchCategories({ commit }, multiFilterArray) {
    return new Promise((resolve, reject) => {
      let query = "api/categories?page="+multiFilterArray.page
      if(multiFilterArray.name){
        query += "&&name="+multiFilterArray.name
      }
    
      axios.get(query)
        .then((response) => {
          commit('SET_CATEGORIES', response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchCategory(context, categoryId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/categories/${categoryId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  
  addCategory({commit}, category) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/categories`, category)
        .then(
          (response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateCategory({ commit }, category) {
    return new Promise((resolve, reject) => {
      category._method  = 'PUT'
      axios.post(`/api/categories/${category.id}`, category)
        .then((response) => {
          // commit('ADD_Category', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/categories/${categoryId}`, { _method: 'DELETE'})
        .then((response) => {
          commit('REMOVE_RECORD', categoryId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
