<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="vx-row">
        <div class="vx-col md:w-1/5 sm:w-1/3 w-full">
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="multiFilterArray.name" @input="this.searchData" placeholder="Search..." />
        </div>
        <!-- <div class="vx-col md:w-1/5 sm:w-1/3 w-full">
          <v-select :options="sports"  placeholder="Choose Sport" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="SportHandle" class="mb-4 md:mb-0" />
        </div> -->
        <div class="vx-col md:w-1/5 sm:w-1/3 w-full">
          <div class="btn-add-new p-2 mb-1 mr-3 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary">
            <span class="feather-icon select-none relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19">
                </line><line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <router-link to="/admin/users/create">
              <span class="ml-2 text-base text-primary">Add New</span>
            </router-link>
          </div>
        </div>
        <div class="vx-col md:w-1/5 sm:w-1/3 w-full">
          <div class="btn-add-new p-2 mb-1 mr-3  rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border ">
            <!-- <vs-button id="button-with-loading" class="ml-auto mt-2 vs-con-loading__container" @click="updateUsers" >
                Update Users
            </vs-button> -->
          </div>
        </div>
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue style="height:600px"
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-150 my-6 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="userData"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        goto
        v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { AgGridVue } from "ag-grid-vue"
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import axios from "@/axios.js"

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererLink from "./cell-renderer/CellRendererLink.vue"
import CellRendererStatus from "./cell-renderer/CellRendererStatus.vue"
import CellRendererVerified from "./cell-renderer/CellRendererVerified.vue"
import CellRendererActions from "./cell-renderer/CellRendererActions.vue"


export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
  },
  data() {
    return {
      currentPagee: 1,
      countries: [],
      sports: [],
      // Filter Options
      statusFilter: { label: 'All', value: 'all' },
      statusOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Deactivated', value: 'deactivated' },
        { label: 'Blocked', value: 'blocked' },
      ],
      saveButtonLoading:false,
      searchQuery: "",
      countryKeyword: "",
      timer: null,
      multiFilterArray: {
        'nationality_id': null,
        'sport_id': null,
        'page':1,
        'name': ''
      },
      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          width: 125,
          filter: true,
          // checkboxSelection: true,
          // headerCheckboxSelectionFilteredOnly: true,
          // headerCheckboxSelection: true,
        },
        {
          headerName: 'Name',
          field: 'displayName',
          filter: true,
          width: 250,
          cellRendererFramework: 'CellRendererLink'
        },

        {
          headerName: 'Birth Date',
          field: 'foodSystem.birth_date',
          filter: true,
          width: 200,
          // cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'height ',
          field: 'foodSystem.height',
          filter: true,
          width: 200,
          // cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'weight',
          field: 'foodSystem.weight',
          filter: true,
          width: 200,
          // cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Actions',
          field: 'transactions',
          width: 200,
          cellRendererFramework: 'CellRendererActions',
        },
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions,
      }
    }
  },
  watch: {
    roleFilter(obj) {
      this.setColumnFilter("role", obj.value)
    },
    statusFilter(obj) {
      this.setColumnFilter("status", obj.value)
    },
    isVerifiedFilter(obj) {
      let val = obj.value === "all" ? "all" : obj.value == "yes" ? "true" : "false"
      this.setColumnFilter("is_verified", val)
    },
    departmentFilter(obj) {
      this.setColumnFilter("department", obj.value)
    },
  },
  computed: {
    userData() {
      return this.$store.state.userManagement.users.data
    },
    allData() {
      return this.$store.state.userManagement.users.meta
    },
    paginationPageSize() {
      if(this.allData) return  Number(this.allData.per_page)
      else return 200
    },
    totalPages() {
      if(this.allData) return  Number(this.allData.last_page)
      else return 0
    },
    currentPage: {
      get() {
        // console.log(val)
          // this.$store.dispatch("userManagement/fetchUsers", this.currentPagee).catch(err => { console.error(err) })
      },
      set(val) {
          this.multiFilterArray.page = val ;
          this.$store.dispatch("userManagement/fetchUsers", this.multiFilterArray).catch(err => { console.error(err) })
      }
    },
    NationalityHandle: {
      get() {
        // return { label: this.capitalize(this.types),  value: this.types  }
      },
      set(obj) {
          this.multiFilterArray.nationality_id = null
        if(obj){
          this.multiFilterArray.nationality_id = obj.value
        }
        this.multiFilter()
      }
    },
    SportHandle: {
      get() {
        // return { label: this.capitalize(this.types),  value: this.types  }
      },
      set(obj) {
        this.multiFilterArray.sport_id = null
        if(obj){
          this.multiFilterArray.sport_id = obj.value
        }
        this.multiFilter()

      }
    },
  },
  methods: {
    searchData() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        if(this.multiFilterArray.name.length > 2 || this.multiFilterArray.name.length == 0) {
          this.multiFilter();
        }
      }, 700);
    },
    multiFilter(){
      this.$store.dispatch("userManagement/fetchUsers", this.multiFilterArray ).catch(err => { console.error(err) })
    },
    
    fetchSports() {
      axios.get("/api/sports?all=all").then((response) => {
        if (response.status == 200) {
          if (response.data.data.length > 0) {
            let sports = [];
            response.data.data.forEach(element => {
              let obj = {
                'label': element.title,
                'value': element.id,
              };
              sports.push(obj);
            });
            this.sports = sports
          }
        }
      })
    },
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if(val !== "all") {
        modelObj = { type: "equals", filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    updateSearchQuery(val) {
      this.multiFilter()
    },
    updateUsers(){
      this.saveButtonLoading = true;
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      })
      axios.post(this.$store.state.backendUrl +'/tipsscore/updateUsers',
      {
        // 'matchIds':ids ,
      },
      {
        headers: {
          // 'x-rapidapi-host': this.$store.state.x_rapidapi_host,
          // 'x-rapidapi-key': this.$store.state.x_rapidapi_key
        }
      })
      .then((response) => {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
        this.saveButtonLoading = false;
        this.showSavedSuccess()
      })
      .catch((error) => {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
          this.saveButtonLoading = false;
      })
    },
    showSavedSuccess() {
      this.$vs.notify({
        color: 'success',
        title: 'Users Stored Successfully',
        text: 'Tips Score Users stored successfully'
      })
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if(this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container")
      header.style.left = "-" + String(Number(header.style.transform.slice(11,-3)) + 9) + "px"
    }
  },
  created() {
    if(!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    // this.$store.dispatch("userManagement/fetchUsers", this.currentPagee).catch(err => { console.error(err) })
    this.fetchSports()
    this.multiFilterArray.page = 1
  }
}

</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
