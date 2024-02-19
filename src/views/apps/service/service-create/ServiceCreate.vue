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

    <!-- <vs-alert color="danger" title="Service Not Found" :active.sync="service_not_found">
      <span>Service record with id: {{ $route.params.serviceId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-service-list'}" class="text-inherit underline">All Services</router-link>
      </span>
    </vs-alert> -->

    <vx-card >

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Service" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <service-create-tab-account class="mt-4"  />
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
import ServiceCreateTabAccount     from "./ServiceCreateTabAccount.vue"
// import ServiceCreateTabInformation from "./ServiceCreateTabInformation.vue"
// import UserCreateTabSocial      from "./UserCreateTabSocial.vue"

// Store Module
import moduleServiceManagement from '@/store/service-management/moduleServiceManagement.js'

export default {
  components: {
    ServiceCreateTabAccount,
    // ServiceCreateTabInformation,
    // ServiceCreateTabSocial,
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
    if(!moduleServiceManagement.isRegistered) {

      this.$store.registerModule('serviceManagement', moduleServiceManagement)
      moduleServiceManagement.isRegistered = true
    }
  }
}

</script>
