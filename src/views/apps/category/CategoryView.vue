<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-category-view">

    <vs-alert color="danger" title="category Not Found" :active.sync="category_not_found">
      <span>category record with id: {{ $route.params.categoryId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-category-list'}" class="text-inherit underline">All Categories</router-link>
      </span>
    </vs-alert>

    <div id="category-data" v-if="category">

      <vx-card title="Category" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="this.$store.state.backendUrl + category.logo" class="rounded w-full" />
            </div>
          </div>
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">En Title:</td>
                <td>{{category.title.en}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Ar Title:</td>
                <td>{{category.title.ar}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Active:</td>
                <td>

                  <!-- {{category.active == 1? 'Active' : 'in Active'}} -->
                    <vs-switch disabled v-model="category.active"></vs-switch>
                  </td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-category-edit', params: { categoryId: $route.params.categoryId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleCategoryManagement from '@/store/category-management/moduleCategoryManagement.js'

export default {
  data() {
    return {
      category: null,
      category_not_found: false,
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
        text: `You are about to delete "${this.category.title.en}"`,
        accept: this.deleteRecord,
        acceptText: "Delete"
      })
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      // this.$router.push({name:'app-category-list'});

      /* UnComment below lines for enabling true flow if deleting category */
      this.$store.dispatch("categoryManagement/removeRecord", this.category.id)
        .then(()   => {
          this.showDeleteSuccess()
          this.$router.push({name:'app-category-list'});
        })
        .catch(err => { console.error(err)       })
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Category Deleted',
        text: 'The selected category was successfully deleted'
      })
    }
  },
  created() {
    // Register Module categoryManagement Module
    if(!moduleCategoryManagement.isRegistered) {
      this.$store.registerModule('categoryManagement', moduleCategoryManagement)
      moduleCategoryManagement.isRegistered = true
    }

    const categoryId = this.$route.params.categoryId
    this.$store.dispatch("categoryManagement/fetchCategory", categoryId)
      .then(res => { this.category = res.data })
      .catch(err => {
        if(err.response.status === 404) {
          this.category_not_found = true
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

#page-category-view {
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
