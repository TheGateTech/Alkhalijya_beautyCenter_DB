<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-service-view">

    <vs-alert color="danger" title="service Not Found" :active.sync="service_not_found">
      <span>service record with id: {{ $route.params.serviceId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-service-list'}" class="text-inherit underline">All services</router-link>
      </span>
    </vs-alert>

    <div id="service-data" v-if="service">

      <vx-card title="service" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">En Title:</td>
                <td>{{service.title.en}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Ar Title:</td>
                <td>{{service.title.ar}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Active:</td>
                <td>

                  <!-- {{service.active == 1? 'Active' : 'in Active'}} -->
                    <vs-switch disabled v-model="service.active"></vs-switch>
                  </td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-service-edit', params: { serviceId: $route.params.serviceId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleServiceManagement from '@/store/service-management/moduleServiceManagement.js'

export default {
  data() {
    return {
      service: null,
      service_not_found: false,
    }
  },
  computed: {

  },
  methods: {
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm Delete`,
        text: `You are about to delete "${this.service.title.en}"`,
        accept: this.deleteRecord,
        acceptText: "Delete"
      })
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      // this.$router.push({name:'app-service-list'});

      /* UnComment below lines for enabling true flow if deleting service */
      this.$store.dispatch("serviceManagement/removeRecord", this.service.id)
        .then(()   => {
          this.showDeleteSuccess()
          this.$router.push({name:'app-service-list'});
        })
        .catch(err => { console.error(err)       })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'service Deleted',
        text: 'The selected service was successfully deleted'
      })
    }
  },
  created() {
    // Register Module serviceManagement Module
    if(!moduleServiceManagement.isRegistered) {
      this.$store.registerModule('serviceManagement', moduleServiceManagement)
      moduleServiceManagement.isRegistered = true
    }

    const serviceId = this.$route.params.serviceId
    this.$store.dispatch("serviceManagement/fetchService", serviceId)
      .then(res => { this.service = res.data })
      .catch(err => {
        if(err.response.status === 404) {
          this.service_not_found = true
          return
        }
        console.error(err) })
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-service-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
