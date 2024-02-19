<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-service-edit">

    <vs-alert color="danger" title="Service Not Found" :active.sync="service_not_found">
      <span>Service record with id: {{ $route.params.serviceId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-service-list'}" class="text-inherit underline">All Services</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="service_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Service" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <service-edit-tab-account class="mt-4" :data="service_data" />
            </div>
          </vs-tab>
          <!-- <vs-tab label="Information" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <service-edit-tab-information class="mt-4" :data="service_data" />
            </div>
          </vs-tab>
          <vs-tab label="Social" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <service-edit-tab-social class="mt-4" :data="service_data" />
            </div>
          </vs-tab> -->
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import ServiceEditTabAccount     from "./ServiceEditTabAccount.vue"
// import ServiceEditTabInformation from "./ServiceEditTabInformation.vue"
// import UserEditTabSocial      from "./UserEditTabSocial.vue"

// Store Module
import moduleServiceManagement from '@/store/service-management/moduleServiceManagement.js'

export default {
  components: {
    ServiceEditTabAccount,
    // ServiceEditTabInformation,
    // ServiceEditTabSocial,
  },
  data() {
    return {
      service_data: null,
      service_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0,
    }
  },
  watch: {
    activeTab() {
      this.fetch_service_data(this.$route.params.serviceId)
    }
  },
  methods: {
    fetch_service_data(serviceId) {
      this.$store.dispatch("serviceManagement/fetchService", serviceId)
        .then(res => { this.service_data = res.data })
        .catch(err => {
          if(err.response.status === 404) {
            this.service_not_found = true
            return
          }
          console.error(err) })
    }
  },
  created() {
    // Register Module serviceManagement Module
    if(!moduleServiceManagement.isRegistered) {
      this.$store.registerModule('serviceManagement', moduleServiceManagement)
      moduleServiceManagement.isRegistered = true
    }
    this.fetch_service_data(this.$route.params.serviceId)
  }
}

</script>
