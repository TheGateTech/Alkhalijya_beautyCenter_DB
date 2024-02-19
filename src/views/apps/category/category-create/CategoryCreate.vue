<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">

    <!-- <vs-alert color="danger" title="Category Not Found" :active.sync="category_not_found">
      <span>Category record with id: {{ $route.params.categoryId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-category-list'}" class="text-inherit underline">All Categories</router-link>
      </span>
    </vs-alert> -->

    <vx-card >

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Category" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <category-create-tab-account class="mt-4"  />
            </div>
          </vs-tab>
          <!-- <vs-tab label="Information" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <category-edit-tab-information class="mt-4" :data="category_data" />
            </div>
          </vs-tab>
          <vs-tab label="Social" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <category-edit-tab-social class="mt-4" :data="category_data" />
            </div>
          </vs-tab> -->
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import CategoryCreateTabAccount     from "./CategoryCreateTabAccount.vue"
// import CategoryCreateTabInformation from "./CategoryCreateTabInformation.vue"
// import UserCreateTabSocial      from "./UserCreateTabSocial.vue"

// Store Module
import moduleCategoryManagement from '@/store/category-management/moduleCategoryManagement.js'

export default {
  components: {
    CategoryCreateTabAccount,
    // CategoryCreateTabInformation,
    // CategoryCreateTabSocial,
  },
    data() {
    return {
      activeTab: 0,
    }
  },

  watch: {
  
  },

  methods: {
    
  },
 
    created() {
    // Register Module DriverManagement Module
    if(!moduleCategoryManagement.isRegistered) {

      this.$store.registerModule('categoryManagement', moduleCategoryManagement)
      moduleCategoryManagement.isRegistered = true
    }
  }
}

</script>
