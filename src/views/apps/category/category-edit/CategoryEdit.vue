<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-category-edit">

    <vs-alert color="danger" title="Category Not Found" :active.sync="category_not_found">
      <span>Category record with id: {{ $route.params.categoryId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-category-list'}" class="text-inherit underline">All CAtegories</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="category_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Category" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <category-edit-tab-account class="mt-4" :data="category_data" />
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
import CategoryEditTabAccount     from "./CategoryEditTabAccount.vue"
// import CategoryEditTabInformation from "./CategoryEditTabInformation.vue"
// import UserEditTabSocial      from "./UserEditTabSocial.vue"

// Store Module
import moduleCategoryManagement from '@/store/category-management/moduleCategoryManagement.js'

export default {
  components: {
    CategoryEditTabAccount,
    // CategoryEditTabInformation,
    // CategoryEditTabSocial,
  },
  data() {
    return {
      category_data: null,
      category_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0,
    }
  },
  watch: {
    activeTab() {
      this.fetch_category_data(this.$route.params.categoryId)
    }
  },
  methods: {
    fetch_category_data(categoryId) {
      this.$store.dispatch("categoryManagement/fetchCategory", categoryId)
        .then(res => { this.category_data = res.data })
        .catch(err => {
          if(err.response.status === 404) {
            this.category_not_found = true
            return
          }
          console.error(err) })
    }
  },
  created() {
    // Register Module categoryManagement Module
    if(!moduleCategoryManagement.isRegistered) {
      this.$store.registerModule('categoryManagement', moduleCategoryManagement)
      moduleCategoryManagement.isRegistered = true
    }
    this.fetch_category_data(this.$route.params.categoryId)
  }
}

</script>
